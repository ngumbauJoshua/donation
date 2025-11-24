import { isIonic } from "@/utils/ionic";

export type ToastType = 'success' | 'error' | 'warning' | 'info' | 'default';

export type SonnerType = 'success' | 'error' | 'warning' | 'info' | 'loading' | 'default';
export type IonicColor = 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'danger' | 'light' | 'medium' | 'dark';

export interface ToastOptions {
  duration?: number;
  position?: 'top' | 'bottom' | 'middle';
  dismissible?: boolean;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export interface IonicToastOptions extends ToastOptions {
  buttons?: Array<{
    text: string;
    role?: 'cancel' | 'destructive';
    handler?: () => void;
  }>;
  cssClass?: string;
  showCloseButton?: boolean;
}

export interface SonnerToastOptions extends ToastOptions {
  description?: string;
  closeButton?: boolean;
  richColors?: boolean;
  style?: React.CSSProperties;
  className?: string;
  descriptionClassName?: string;
}

export interface ToastRequestDetail {
  message: string;
  type: IonicColor;
  duration: number;
  position: 'top' | 'bottom' | 'middle';
  options?: IonicToastOptions;
}

interface TypeMapping {
  ionic: Record<ToastType, IonicColor>;
  sonner: Record<ToastType, SonnerType>;
}

export class ToastService {
  private static readonly TYPE_MAPPING: TypeMapping = {
    ionic: {
      'success': 'success',
      'error': 'danger',
      'warning': 'warning',
      'info': 'primary',
      'default': 'medium'
    },
    sonner: {
      'success': 'success',
      'error': 'error',
      'warning': 'warning',
      'info': 'info',
      'default': 'default'
    }
  };

  static isIonic = isIonic;

  private static mapTypeForPlatform(type: ToastType): SonnerType | IonicColor {
    if (this.isIonic()) {
      return this.TYPE_MAPPING.ionic[type];
    } else {
      return this.TYPE_MAPPING.sonner[type];
    }
  }

  static show(
    message: string,
    type: ToastType = 'info',
    options: ToastOptions = {}
  ): void {
    const platformType = this.mapTypeForPlatform(type);

    if (this.isIonic()) {
      this.showIonicToast(message, platformType as IonicColor, options);
    } else {
      this.showSonnerToast(message, platformType as SonnerType, options);
    }
  }

  private static showIonicToast(
    message: string,
    type: IonicColor,
    options: ToastOptions
  ): void {
    const detail: ToastRequestDetail = {
      message,
      type,
      duration: options.duration || 2000,
      position: options.position || 'top',
      options: options as IonicToastOptions
    };

    const event = new CustomEvent<ToastRequestDetail>('toast-request', {
      detail,
      bubbles: true,
      composed: true
    });

    document.dispatchEvent(event);
  }

  private static showSonnerToast(
    message: string,
    type: SonnerType,
    options: ToastOptions
  ): void {
    const toast = (window as any).toast;
    if (!toast) {
      console.warn('Sonner toast not initialized');
      return;
    }

    const sonnerOptions: SonnerToastOptions = {
      duration: options.duration,
      ...options
    };

    switch (type) {
      case 'success':
        toast.success(message, sonnerOptions);
        break;
      case 'error':
        toast.error(message, sonnerOptions);
        break;
      case 'warning':
        toast.warning(message, sonnerOptions);
        break;
      case 'info':
        toast.info(message, sonnerOptions);
        break;
      case 'loading':
        toast.loading(message, sonnerOptions);
        break;
      default:
        toast(message, sonnerOptions);
    }
  }

  static success(message: string, options?: ToastOptions): void {
    this.show(message, 'success', options);
  }

  static error(message: string, options?: ToastOptions): void {
    this.show(message, 'error', options);
  }

  static warning(message: string, options?: ToastOptions): void {
    this.show(message, 'warning', options);
  }

  static info(message: string, options?: ToastOptions): void {
    this.show(message, 'info', options);
  }

  static loading(message: string, options?: SonnerToastOptions): void {
    if (this.isIonic()) {
      // Fallback to info toast on Ionic
      this.info(`⏳ ${message}`, options);
    } else {
      this.showSonnerToast(message, 'loading', options || {});
    }
  }

  static async promise<T>(
    promise: Promise<T>,
    messages: {
      loading: string;
      success: string | ((data: T) => string);
      error: string | ((error: any) => string);
    },
    options?: ToastOptions
  ): Promise<T> {
    if (!this.isIonic()) {
      const toast = (window as any).toast;
      if (toast?.promise) {
        return toast.promise(promise, messages, options);
      }
    }

    // Fallback implementation
    this.loading(messages.loading, options);

    try {
      const result = await promise;
      const successMsg = typeof messages.success === 'function'
        ? messages.success(result)
        : messages.success;
      this.success(successMsg, options);
      return result;
    } catch (error) {
      const errorMsg = typeof messages.error === 'function'
        ? messages.error(error)
        : messages.error;
      this.error(errorMsg, options);
      throw error;
    }
  }
}
