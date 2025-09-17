import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["text"];
  static values = {
    speed: { type: Number, default: 100 } // delay in ms per word
  }

  connect() {
    this.words = this.textTarget.textContent.trim().split(" ")
    this.textTarget.textContent = ""
    this.index = 0
    this.startTime = null
    this.animate = this.animate.bind(this)
  }

  reset() {
    this.textTarget.textContent = ""
    this.index = 0
    this.startTime = null
  }

  type() {
    requestAnimationFrame(this.animate)
  }

  animate(timestamp) {
    if (!this.startTime) this.startTime = timestamp

    const elapsed = timestamp - this.startTime

    // Only type when enough time has passed
    if (elapsed >= this.speedValue && this.index < this.words.length) {
      this.textTarget.textContent += (this.index > 0 ? " " : "") + this.words[this.index]
      this.index++
      this.startTime = timestamp // reset "last typed" timestamp
    }

    // Continue looping until done
    if (this.index < this.words.length) {
      requestAnimationFrame(this.animate)
    }
  }
}
