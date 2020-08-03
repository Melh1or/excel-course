export class DomListener {
  constructor($root) {
    if (!$root) {
      return new Error("No Root Provided from DomListener");
    }
    this.$root = $root;
  }
}
