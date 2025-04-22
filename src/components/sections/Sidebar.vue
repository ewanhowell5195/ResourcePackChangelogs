<script setup>
  defineProps({
    modelValue: Boolean
  })

  const emit = defineEmits(["update:modelValue"])

  function closeSidebar() {
    emit("update:modelValue", false)
  }
</script>

<template>
  <div id="sidebar" :class="{ open: modelValue }">
    <router-link to="/" @click="closeSidebar">Home</router-link>
    <router-link to="/services/hairdressing" @click="closeSidebar">Hairdressing</router-link>
    <router-link to="/services/bridalhair" @click="closeSidebar">Bridal Hair</router-link>
    <router-link to="/about" @click="closeSidebar">About</router-link>
    <router-link to="/contact" @click="closeSidebar">Contact</router-link>
  </div>
  <div id="sidebar-content-overlay" :class="{ visible: modelValue }" @click="closeSidebar"></div>
</template>

<style scoped>
  #sidebar-content-overlay {
    position: fixed;
    inset: 0;
    background-color: #0008;
    z-index: 2;
    opacity: 0;
    pointer-events: none;
    transition: opacity .25s ease;
    backdrop-filter: blur(4px);

    &.visible {
      pointer-events: initial;
      opacity: 1;
    }
  }

  #sidebar {
    position: fixed;
    left: 0;
    top: var(--header-height);
    bottom: 0;
    background-color: var(--color-primary);
    width: 256px;
    z-index: 3;
    transform: translateX(-100%);
    transition: transform .25s ease, background-color .25s ease;
    display: flex;
    flex-direction: column;
    padding: 0 32px 32px;
    gap: 8px;
    align-items: flex-start;

    &.open {
      transform: initial;
    }

    * {
      color: #fff;
      transition: color .25s ease, background-color .25s ease;
    }
  }

  a {
    font-size: 24px;
    text-decoration: none;
    position: relative;

    &::before {
      content: "";
      position: absolute;
      bottom: 2px;
      height: 2px;
      background-color: currentColor;
      left: 50%;
      transform: translateX(-50%);
      width: 0;
      transition: width .15s ease;
    }

    &:hover::before {
      width: 100%;
    }
  }

  @media (max-width: 768px) {
    #sidebar {
      padding: 10px 20px 20px;
    }

    a {
      font-size: 18px;

      &::before {
        bottom: 1px;
      }
    } 
  }
</style>