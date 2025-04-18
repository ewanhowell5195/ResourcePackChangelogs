<script setup>
  import { defineProps } from 'vue'

  defineProps({
    image: {
      type: String,
      required: true
    }
  })
</script>

<template>
  <section :style="{ backgroundImage: `url(${image})` }">
    <div class="banner-content container">
      <slot></slot>
    </div>
  </section>
</template>

<style scoped>
  section {
    background-size: cover;
    background-position: center;
    position: relative;
    height: 512px;

    &::before {
      content: "";
      position: absolute;
      inset: 0;
      background-color: #0004;
      backdrop-filter: blur(8px);
    }
  }

  .banner-content {
    align-items: center;
    justify-content: center;
    color: #fff;
    height: 100%;
    margin: 0 auto;
    padding: 40px;
    position: relative;
    text-align: center;
    text-shadow: 0 2px 2px #0008;
  }

  :deep(:is(button, .button) + :is(button, .button)) {
    margin-top: -12px;
  }

  :deep(.banner-title) {
    font-family: var(--font-heading) !important;
    font-size: 92px;
      line-height: 1;
  }

  :deep(p) {
    font-size: 20px;
  }

  @media (max-width: 768px) {
    :deep(.banner-title) {
      font-family: var(--font-heading) !important;
      font-size: 64px;
    }

    :deep(p) {
      font-size: 18px;
    }
  }
</style>