/**
 * WidgetCommService - A library for secure cross-origin and same-page communication using TypeScript.
 * Handles communication between window contexts (e.g., parent <-> iframe)
 * and within the same page using CustomEvents.
 *
 * @version 1.0.0-ts
 * @license MIT
 */

// --- Type Definitions ---

/** Configuration options for the WidgetCommService constructor. */
interface WidgetCommConfig {
  /**
   * An array of origins (e.g., 'https://example.com') that are allowed
   * to send messages TO this window via postMessage.
   * Crucial for security when receiving messages.
   * @default []
   */
  allowedOrigins?: string[];
  /**
   * Enable verbose logging to the console for debugging.
   * @default false
   */
  debug?: boolean;
}

/** Options for the `emit` method when targeting another window. */
interface EmitOptions {
  /**
   * The target window (e.g., iframe.contentWindow, window.parent)
   * to send the message to using postMessage. If null or omitted,
   * emits locally using CustomEvent.
   */
  targetWindow?: Window | null;
  /**
   * The specific origin of the targetWindow.
   * **Required and crucial for security** when using targetWindow (postMessage).
   * Use '*' only if security implications are fully understood (generally discouraged).
   */
  targetOrigin?: string | null;
}

/** Metadata passed to listener callbacks. */
interface EventMetadata {
  /** The origin of the event ('local' for CustomEvents, or the specific origin string for postMessage). */
  origin: string | 'local';
}

/** Type definition for the listener callback function. */
type ListenerCallback<T = any> = (payload: T, metadata: EventMetadata) => void;

/** Internal structure for messages sent via postMessage. */
interface MessageData<T = any> {
  eventName: string;
  payload: T;
}

/** Internal map to store listeners. */
interface ListenersMap {
  [eventName: string]: ListenerCallback<any>[];
}

// --- Singleton Management ---
let instance: WidgetCommService | null = null;
let globalConfig: Required<WidgetCommConfig> = { // Store config used by singleton
    allowedOrigins: [],
    debug: false,
};

// --- Class Implementation ---

class WidgetCommService {
  private readonly allowedOrigins: Set<string>;
  private readonly debug: boolean;
  private listeners: ListenersMap;
  private isDestroyed: boolean;

  /**
   * Creates an instance of WidgetCommService.
   * @param {WidgetCommConfig} config - Configuration options.
   */
  constructor({ allowedOrigins = [], debug = false }: WidgetCommConfig = {}) {
    // Ensure origins are valid strings before adding
    this.allowedOrigins = new Set(
        allowedOrigins.filter(origin => typeof origin === 'string' && origin.length > 0)
    );
    this.debug = debug;
    this.listeners = {};
    this.isDestroyed = false;

    // Bind methods to ensure 'this' context is correct
    this._handleMessage = this._handleMessage.bind(this);
    this._handleLocalEvent = this._handleLocalEvent.bind(this);

    this._setupMessageListener();

    if (this.debug) {
      console.log('[WidgetCommService] Initialized. Allowed origins for receiving:', [...this.allowedOrigins]);
    }
  }

    /**
     * Gets the singleton instance of WidgetCommService. Initializes it on first call.
     * Subsequent calls can update the configuration (add allowed origins, enable debug).
     * @param {WidgetCommConfig} [config={}] - Configuration options. Only applied on first init or if updating.
     * @returns {WidgetCommService} The singleton instance.
     */
    public static getInstance(config: WidgetCommConfig = {}): WidgetCommService {
      if (instance === null) {
          // First time initialization: merge provided config with defaults
          globalConfig = {
              allowedOrigins: [...new Set([...globalConfig.allowedOrigins, ...(config.allowedOrigins || [])])],
              debug: globalConfig.debug || config.debug || false,
          };
          instance = new WidgetCommService(globalConfig);
      } else {
          // Instance exists, potentially update config
          let configChanged = false;
          if (config.debug && !instance.debug) {
              (instance as any).debug = true; // Update instance property (use any for readonly bypass if needed)
               globalConfig.debug = true;
               configChanged = true;
               if(instance.debug) console.log('[WidgetCommService Singleton] Debug mode enabled.');
          }
          if (config.allowedOrigins) {
              const currentSize = instance.allowedOrigins.size;
              config.allowedOrigins.forEach(origin => {
                  if (typeof origin === 'string' && origin.length > 0) {
                      instance!.allowedOrigins.add(origin);
                  }
              });
              if (instance.allowedOrigins.size > currentSize) {
                  globalConfig.allowedOrigins = [...instance.allowedOrigins]; // Update global store
                  configChanged = true;
                  if(instance.debug) console.log('[WidgetCommService Singleton] Updated allowed origins:', globalConfig.allowedOrigins);
              }
          }
           if (configChanged && instance.debug) {
               console.log('[WidgetCommService Singleton] Configuration updated.');
           }
      }
      return instance;
    }
    /**
       * Allows adding allowed origins after initialization.
       * @param {string[]} origins - Origins to add.
       */
    public addAllowedOrigins(origins: string[]): void {
      if (this.isDestroyed) return;

      const currentSize = this.allowedOrigins.size;
      origins.forEach(origin => {
          if (typeof origin === 'string' && origin.length > 0) {
              this.allowedOrigins.add(origin);
          }
      });

      if (this.allowedOrigins.size > currentSize) {
          globalConfig.allowedOrigins = [...this.allowedOrigins]; // Sync global store
          if(this.debug) console.log('[WidgetCommService Singleton] Added allowed origins:', [...this.allowedOrigins]);
      }
    }

  /**
   * Sets up the global 'message' event listener for postMessage communication.
   * @private
   */
  private _setupMessageListener(): void {
    window.addEventListener('message', this._handleMessage);
  }

  /**
   * Handles incoming 'message' events (postMessage).
   * Validates origin and message format before dispatching to listeners.
   * @param {MessageEvent} event - The incoming message event.
   * @private
   */
  private _handleMessage(event: MessageEvent): void {
    if (this.isDestroyed) return;

    const origin = event.origin;

    // Security: Always verify the origin
    if (!this.allowedOrigins.has(origin)) {
      // Avoid logging noise from browser extensions or file:// protocols
      if (this.debug && origin && origin !== 'null' && origin !== 'undefined') {
         console.warn(`[WidgetCommService] Ignored message from disallowed origin: ${origin}. Allowed:`, [...this.allowedOrigins]);
      }
      return;
    }

    // Type guard for message data structure
    const isMessageData = (data: unknown): data is MessageData => {
        return typeof data === 'object' && data !== null && typeof (data as MessageData).eventName === 'string';
    };

    if (!isMessageData(event.data)) {
       if (this.debug) {
         console.warn(`[WidgetCommService] Ignored message with invalid format from ${origin}:`, event.data);
       }
       return;
    }

    const { eventName, payload } = event.data;
    const metadata: EventMetadata = { origin: origin };

    if (this.debug) {
      console.log(`[WidgetCommService] Received message from ${origin}:`, { eventName, payload, metadata });
    }

    // Dispatch to relevant listeners
    this.listeners[eventName]?.forEach(callback => {
      try {
        callback(payload, metadata);
      } catch (error) {
        console.error(`[WidgetCommService] Error in listener for event "${eventName}" from origin ${origin}:`, error);
      }
    });
  }

 /**
  * Handles incoming local CustomEvents.
  * @param {CustomEvent} event - The incoming custom event.
  * @private
  */
  private _handleLocalEvent(event: Event): void { // Use base Event and cast later
    if (this.isDestroyed) return;

    // Ensure it's a CustomEvent and has details
    if (!(event instanceof CustomEvent)) {
        if (this.debug) console.warn('[WidgetCommService] Received non-CustomEvent on local listener:', event);
        return;
    }

    const eventName = event.type; // The event name is the type of the CustomEvent
    const payload = event.detail; // detail can be any type
    const metadata: EventMetadata = { origin: 'local' }; // Indicate it's a local event

    if (this.debug) {
        console.log(`[WidgetCommService] Received local event:`, { eventName, payload, metadata });
    }

    // Dispatch to relevant listeners (listeners added via 'on' will match event.type)
    this.listeners[eventName]?.forEach(callback => {
        try {
            callback(payload, metadata);
        } catch (error) {
            console.error(`[WidgetCommService] Error in local listener for event "${eventName}":`, error);
        }
    });
  }


  /**
   * Registers a listener for a specific event name.
   * Listens for both local CustomEvents and cross-origin postMessages matching the event name.
   *
   * @template T The expected type of the payload for this event. Defaults to `any`.
   * @param {string} eventName - The name of the event to listen for.
   * @param {ListenerCallback<T>} callback - The function to execute when the event is received.
   *   It receives the payload (typed as T) and metadata.
   * @returns {() => void} A function to unsubscribe the listener.
   */
  public on<T = any>(eventName: string, callback: ListenerCallback<T>): () => void {
    if (this.isDestroyed) {
        console.warn('[WidgetCommService] Instance is destroyed. Cannot add listener.');
        return () => {}; // Return no-op unsubscribe
    }
    if (typeof eventName !== 'string' || !eventName) {
        console.error('[WidgetCommService] Invalid eventName provided to on(). Must be a non-empty string.');
        return () => {};
    }
    if (typeof callback !== 'function') {
        console.error(`[WidgetCommService] Invalid callback provided for event "${eventName}". Must be a function.`);
        return () => {};
    }

    // Initialize listener array if it doesn't exist
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [];
      // Add specific listener for local CustomEvents only when the first listener for this eventName is added
      // Use `as EventListener` to satisfy addEventListener's type requirement
      window.addEventListener(eventName, this._handleLocalEvent as EventListener);
    }

    // Add the callback to the list
    this.listeners[eventName].push(callback);

    if (this.debug) {
      console.log(`[WidgetCommService] Listener added for event: "${eventName}"`);
    }

    // Return an unsubscribe function
    const unsubscribe = (): void => {
      if (this.isDestroyed || !this.listeners[eventName]) return;

      this.listeners[eventName] = this.listeners[eventName].filter(cb => cb !== callback);

      if (this.debug) {
        console.log(`[WidgetCommService] Listener removed for event: "${eventName}"`);
      }

      // If no listeners remain for this event, remove the specific CustomEvent listener
      if (this.listeners[eventName].length === 0) {
        delete this.listeners[eventName];
        window.removeEventListener(eventName, this._handleLocalEvent as EventListener);
        if (this.debug) {
            console.log(`[WidgetCommService] Removed CustomEvent listener for: "${eventName}" as no callbacks remain.`);
        }
      }
    };
    return unsubscribe;
  }

  /**
   * Emits an event, either locally using CustomEvent or to another window using postMessage.
   *
   * @template T The type of the payload being sent. Defaults to `any`.
   * @param {string} eventName - The name of the event to emit.
   * @param {T} [payload=null] - The data payload to send with the event. Must be serializable for postMessage.
   * @param {EmitOptions} [options={}] - Options for targeting the emission.
   * @returns {boolean} True if the event was dispatched successfully, false otherwise.
   */
  public emit<T = any>(eventName: string, payload: T = null as T, options: EmitOptions = {}): boolean {
    if (this.isDestroyed) {
        console.warn('[WidgetCommService] Instance is destroyed. Cannot emit event.');
        return false;
    }
     if (typeof eventName !== 'string' || !eventName) {
        console.error('[WidgetCommService] Invalid eventName provided to emit(). Must be a non-empty string.');
        return false;
    }

    const { targetWindow, targetOrigin } = options;

    if (targetWindow) {
      // --- Cross-Origin/Window Communication (postMessage) ---
      // Type guard for window object with postMessage
      if (typeof targetWindow !== 'object' || targetWindow === null || typeof targetWindow.postMessage !== 'function') {
        console.error(`[WidgetCommService] Invalid targetWindow provided for event "${eventName}". It does not appear to be a valid Window object or lacks postMessage.`);
        return false;
      }
      if (typeof targetOrigin !== 'string' || !targetOrigin) {
        console.error(`[WidgetCommService] targetOrigin (string) is required when specifying targetWindow for event "${eventName}".`);
        return false;
      }
      if (targetOrigin === '*') {
          console.warn(`[WidgetCommService] Emitting event "${eventName}" with targetOrigin '*'. This is insecure and should be avoided in production unless absolutely necessary.`);
      }

      const message: MessageData<T> = { eventName, payload };
      try {
        // Ensure targetWindow is treated as Window for postMessage call
        (targetWindow as Window).postMessage(message, targetOrigin);
        if (this.debug) {
          console.log(`[WidgetCommService] Emitted message to ${targetOrigin}:`, message);
        }
        return true;
      } catch (error: any) { // Catch specific errors if needed
        console.error(`[WidgetCommService] Error sending postMessage for event "${eventName}" to origin ${targetOrigin}:`, error);
        // Check for DataCloneError specifically
        if (error.name === 'DataCloneError') {
             console.error(`[WidgetCommService] The payload for event "${eventName}" could not be cloned. Ensure it is serializable (no functions, Symbols, DOM nodes, etc.). Payload:`, payload);
        }
        return false;
      }
    } else {
      // --- Same-Page Communication (CustomEvent) ---
      try {
        // `payload` goes into the `detail` property of CustomEvent
        const event = new CustomEvent<T>(eventName, { detail: payload });
        window.dispatchEvent(event);
        if (this.debug) {
          console.log(`[WidgetCommService] Emitted local event:`, { eventName, payload });
        }
        return true;
      } catch (error) {
         console.error(`[WidgetCommService] Error dispatching local CustomEvent "${eventName}":`, error);
         return false;
      }
    }
  }

  /**
     * NOTE: Destroying the singleton might break other widgets relying on it.
     * Use with caution, perhaps only in specific teardown scenarios.
     * Consider if a 'reset' or removing specific listeners is more appropriate.
     */
    public destroy(): void {
        if (this.isDestroyed) return;
        console.warn('[WidgetCommService Singleton] Destroying the shared instance. Other widgets may break.');
        this.isDestroyed = true;
        window.removeEventListener('message', this._handleMessage);
        Object.keys(this.listeners).forEach(eventName => {
            window.removeEventListener(eventName, this._handleLocalEvent as EventListener);
        });
        this.listeners = {};
        this.allowedOrigins.clear();
        instance = null; // Allow re-initialization if needed after destruction
        globalConfig = { allowedOrigins: [], debug: false }; // Reset global config
        if (this.debug) {
            console.log('[WidgetCommService Singleton] Instance destroyed and listeners cleaned up.');
        }
    }
}

export { WidgetCommService };
export type { WidgetCommConfig, ListenerCallback, EmitOptions, EventMetadata };
