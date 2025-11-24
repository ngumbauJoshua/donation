/* eslint-disable */
import { type RenderableProps, createElement, render } from "preact";

// Ignore a lot of warnings from TS because this file is a copy-paste from Preact JS Code

function ContextProvider(props: RenderableProps<{ context: any }>) {
  // @ts-ignore
  this.getChildContext = () => props.context;
  return props.children;
}

/**
 * Portal component
 * @param {object | null | undefined} props
 *
 * TODO: use createRoot() instead of fake root
 */
// @ts-ignore
function Portal(props) {
  // @ts-ignore
  const _this = this;
  let container = props._container;

  _this.componentWillUnmount = function () {
    render(null, _this._temp);
    _this._temp = null;
    _this._container = null;
  };

  // When we change container we should clear our old container and
  // indicate a new mount.
  if (_this._container && _this._container !== container) {
    _this.componentWillUnmount();
  }

  // When props.vnode is undefined/false/null we are dealing with some kind of
  // conditional vnode. This should not trigger a render.
  if (props._vnode) {
    if (!_this._temp) {
      _this._container = container;

      // Create a fake DOM parent node that manages a subset of `container`'s children:
      _this._temp = {
        nodeType: 1,
        parentNode: container,
        childNodes: [],
        // @ts-ignore
        appendChild(child) {
          this.childNodes.push(child);
          _this._container.appendChild(child);
        },
        // @ts-ignore
        insertBefore(child, before) {
          this.childNodes.push(child);
          _this._container.appendChild(child);
        },
        // @ts-ignore
        removeChild(child) {
          this.childNodes.splice(this.childNodes.indexOf(child) >>> 1, 1);
          _this._container.removeChild(child);
        },
      };
    }

    // Render our wrapping element into temp.
    render(
      // @ts-ignore
      createElement(ContextProvider, { context: _this.context }, props._vnode),
      _this._temp
    );
  }
  // When we come from a conditional render, on a mounted
  // portal we should clear the DOM.
  else if (_this._temp) {
    _this.componentWillUnmount();
  }
}

/**
 * Create a `Portal` to continue rendering the vnode tree at a different DOM node
 */
// @ts-ignore
export function createPortal(vnode, container) {
  // @ts-ignore
  const el = createElement(Portal, { _vnode: vnode, _container: container });
  // @ts-ignore
  el.containerInfo = container;
  return el;
}
