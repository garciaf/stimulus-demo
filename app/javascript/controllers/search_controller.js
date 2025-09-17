import { Controller } from "@hotwired/stimulus"
import debounce from "debounce";

// Connects to data-controller="search"
export default class extends Controller {
  static targets = [ "input" ]

  connect() {
    this.submit = debounce(this.submit.bind(this), 500);
  }

  clear(event) {
    event.preventDefault()
    this.inputTarget.value = ""
    this.submit()
  }

  submit(_event) {
    this.element.requestSubmit()
  }
}
