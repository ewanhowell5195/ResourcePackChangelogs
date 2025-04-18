<template>
  <div class="popup" :class="{ 'popup-visible': visible }" @click="closePopup">
    <div class="popup-container">
      <img class="popup-image" :src="image.dataset?.popupSrc ?? image.getAttribute?.('src')" ref="popupImage" />
    </div>
    <div id="popup-image-prev" ref="prev" class="icon" @click="prevImage">navigate_before</div>
    <div id="popup-image-next" ref="next" class="icon" @click="nextImage">navigate_next</div>
    <div id="popup-image-close" class="icon" @click="closePopup">close</div>
    <a id="popup-image-open" class="icon" :href="image.dataset?.popupSrc ?? image.getAttribute?.('src')" target="_blank">open_in_new</a>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        visible: false,
        image: "",
        images: []
      }
    },
    mounted() {
      document.addEventListener("click", this.click)
    },
    unmounted() {
      document.removeEventListener("click", this.click)
    },
    methods: {
      click(e) {
        let element = e.target
        while (element && !element.hasAttribute("popupable")) {
          if (["BUTTON", "A"].includes(element.tagName)) return
          element = element.parentElement
        }
        if (!element) return
        const value = element.getAttribute("popupable")
        this.images = Array.from(document.querySelectorAll(`[popupable="${value}"]`))
        this.loadImage(element)
        this.visible = true
      },
      loadImage(img) {
        this.image = img
        const index = this.images.indexOf(img)
        if (index) {
          this.$refs.prev.hidden = false
        } else {
          this.$refs.prev.hidden = true
        }
        if (index === this.images.length - 1) {
          this.$refs.next.hidden = true
        } else {
          this.$refs.next.hidden = false
        }
      },
      closePopup(e) {
        if (e.target === e.currentTarget) {
          this.visible = false
        }
      },
      nextImage() {
        this.loadImage(this.images[this.images.indexOf(this.image) + 1])
      },
      prevImage() {
        this.loadImage(this.images[this.images.indexOf(this.image) - 1])
      }
    }
  }
</script>

<style>
  [popupable] {
    cursor: pointer;
    transition: box-shadow .15s ease;

    &:hover {
      box-shadow: var(--box-shadow);
    }
  }
</style>

<style scoped>
  .popup {
    position: fixed;
    inset: 0;
    background-color: #000000C0;
    z-index: 99;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    transition: opacity .2s;
    pointer-events: none;
  }

  .popup-container {
    position: relative;
    user-select: none;
    box-shadow: 0 8px 16px #000;
    max-width: calc(100vw - 80px);
    max-height: calc(100dvh - 80px);
    overflow: hidden;
    scale: .85;
    transition: scale .15s ease;
  }

  .popup-visible {
    opacity: 1;
    pointer-events: initial;

    .popup-container {
      scale: 1;
    }
  }

  .popup-image {
    max-width: calc(100vw - 92px * 2);
    max-height: calc(100dvh - 92px * 2);
    display: block;
    background-image: var(--transparency);
    image-rendering: pixelated;
    object-fit: contain;
  }

  .icon {
    color: #fff;
    position: absolute;
    cursor: pointer;
    width: 60px;
    height: 60px;
    font-size: 40px;
    background-color: #0006;
    transition: background-color .15s ease, box-shadow .15s ease;
    user-select: none;

    &:hover {
      background: #000B;
      box-shadow: var(--box-shadow);
    }
  }

  #popup-image-close, #popup-image-open {
    top: 16px;
    right: 16px;
  }

  #popup-image-open {
    right: 92px;
    font-size: 32px;
  }

  #popup-image-prev {
    left: 16px;
    font-size: 48px;
  }

  #popup-image-next {
    right: 16px;
    font-size: 48px;
  }

  @media (max-width: 768px) {
    .popup-image {
      max-width: calc(100vw - 56px * 2);
      max-height: calc(100dvh - 56px * 2);
    }

    .icon {
      width: 40px;
      height: 40px;
      font-size: 24px;
    }

    #popup-image-close, #popup-image-open {
      top: 8px;
      right: 8px;
    }

    #popup-image-open {
      right: 56px;
      font-size: 22px;
    }

    #popup-image-prev {
      left: 8px;
      font-size: 32px;
    }

    #popup-image-next {
      right: 8px;
      font-size: 32px;
    }
  }
</style>