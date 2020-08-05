import { DomListener } from "@core/DomListener";

export class ExcelComponent extends DomListener {
  // return html template
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || "";
    this.emitter = options.emitter;

    this.prepare();
    this.unsubs = [];
  }

  prepare() {}

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

  init() {
    this.initDOMListeners();
  }

  destroy() {
    this.removeDOMListeners();
    this.unsubs.forEach(unsub => unsub());
  }
}
