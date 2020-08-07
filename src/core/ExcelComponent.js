import { DomListener } from "@core/DomListener";

export class ExcelComponent extends DomListener {
  // return html template
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || "";
    this.emitter = options.emitter;
    this.subscribe = options.subscribe || [];
    this.store = options.store;

    this.prepare();
    this.unsubs = [];
  }

  prepare() {}

  storeChanged() {}

  isWatching(key) {
    return this.subscribe.includes(key);
  }

  toHTML() {
    return "";
  }

  $emit(event, ...args) {
    this.emitter.emit(event, ...args);
  }

  $on(event, fn) {
    const sub = this.emitter.subscribe(event, fn);
    this.unsubs.push(sub);
  }

  $dispatch(action) {
    this.store.dispatch(action);
  }


  init() {
    this.initDOMListeners();
  }

  destroy() {
    this.removeDOMListeners();
    this.unsubs.forEach(unsub => unsub());
  }
}
