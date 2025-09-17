import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static values = { seconds: Number }
  static targets = ["display"]

  connect() {
    this.remaining = this.secondsValue || 10;
    this.remainingMs = this.remaining * 1000;
    this.timer = null;
    this.#updateDisplay();
  }

  start() {
    this.dispatch("start");
    if (this.timer) return;
    this.startTime = performance.now();
    this.endTime = this.startTime + this.remainingMs;
    this.remaining = Math.ceil((this.endTime - this.startTime) / 1000);

    const tick = (now) => {
      const timeLeft = Math.max(0, Math.ceil((this.endTime - now)));
      this.remainingMs = this.endTime - now;
      if (timeLeft !== this.remainingMs) {
        this.remainingMs = timeLeft;
        this.#updateDisplay();
      }
      if (timeLeft > 0) {
        this.timer = requestAnimationFrame(tick);
      } else {
        this.timer = null;
        this.dispatch("finished");
      }
    };

    this.timer = requestAnimationFrame(tick);
  }

  reset() {
    this.dispatch("reset");
    this.remaining = this.secondsValue || 10;
    this.remainingMs = this.remaining * 1000;
    this.#updateDisplay();
    this.stop();
  }

  stop() {
    if (this.timer) {
      cancelAnimationFrame(this.timer);
      this.timer = null;
    }
  }

  disconnect() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  #updateDisplay() {
    if (this.hasDisplayTarget) {
      const minutes = Math.floor(this.remainingMs / 60000);
      const seconds = Math.floor((this.remainingMs % 60000) / 1000);
      const milliseconds = Math.floor((this.remainingMs % 1000) / 10);
      this.displayTarget.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(milliseconds).padStart(2, '0')}`;
    }
  }

}
