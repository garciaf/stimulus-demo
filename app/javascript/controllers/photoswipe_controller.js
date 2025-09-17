// controllers/photoswipe_controller.js
import { Controller } from "@hotwired/stimulus"
import PhotoSwipeLightbox from "photoswipe/lightbox"

export default class extends Controller {
  static values = {
    size: { type: String, default: "1280x720" }
  }

  connect() {
    this.lightbox = new PhotoSwipeLightbox({
      gallery: this.element,
      children: "a", // anchor tags with images inside
      pswpModule: () => import("photoswipe")
    })
    this.lightbox.addFilter('domItemData', (itemData, element, linkEl) => {
      if (linkEl) {
        itemData.src = linkEl.href;
        itemData.w = linkEl.dataset.width;
        itemData.h = linkEl.dataset.height;
        itemData.msrc = linkEl.dataset.thumbSrc;
        itemData.thumbCropped = true;
      }

      return itemData;
    });
    this.lightbox.init()
  }

  disconnect() {
    if (this.lightbox) {
      this.lightbox.destroy()
      this.lightbox = null
    }
  }
}
