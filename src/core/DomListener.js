import { capitalize } from "@core/utils";

export class DomListener {
  constructor($root, listeners = []) {
    if (!$root) {
      return new Error("No Root Provided from DomListener");
    }
    this.$root = $root;
    this.listeners = listeners;
  }

  initDOMListeners() {
    this.listeners.forEach(listener => {
      const method = getMethodName(listener);
      if (!this[method]) {
        const name = this.name || "";

        throw new Error(
            `Method ${method} is not implemented in this ${name} Component`
        );
      }

      this[method] = this[method].bind(this);
      // addEventListener
      this.$root.on(listener, this[method]);
    });
  }

  removeDOMListeners() {
    this.listeners.forEach(listener => {
      const method = getMethodName(listener);
      // removeEventListener
      this.$root.off(listener, this[method]);
    });
  }
}

function getMethodName(eventName) {
  return "on" + capitalize(eventName);
}
