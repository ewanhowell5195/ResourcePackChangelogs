<script setup>
  const props = defineProps({
    modelValue: Boolean
  })

  const emit = defineEmits(["update:modelValue"])

  function toggle() {
    emit("update:modelValue", !props.modelValue)
  }
</script>

<template>
  <div class="hamburger-menu" :class="{ active: modelValue }" @click="toggle">
    <div class="hamburger-line"></div>
  </div>
</template>

<style scoped>
  .hamburger-menu {
    min-width: initial;
    cursor: pointer;
    display: flex;
    align-items: center;
    height: 35px;

    &.active .hamburger-line {
      transition-delay: 0.12s;
      transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
      transform: rotate(45deg);

      &:before {
        top: 0;
        transition: top 75ms ease, opacity 75ms ease 0.12s;
        opacity: 0;
      }

      &:after {
        bottom: 0;
        transition: bottom 75ms ease, transform 75ms cubic-bezier(0.215, 0.61, 0.355, 1) 0.12s;
        transform: rotate(-90deg);
      }
    }
  }

  .hamburger-line {
    position: relative;
    display: block;
    transition-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
    transition-duration: 75ms;

    &:before {
      position: absolute;
      top: -10px;
    }

    &:after {
      position: absolute;
      bottom: -10px;
    }
  }

  .hamburger-line,
  .hamburger-line:before,
  .hamburger-line:after {
    left: 0;
    content: "";
    width: 35px;
    height: 5px;
    border-radius: 3px;
    background-color: currentColor;
    transition: top 75ms ease 0.12s, bottom 75ms ease 0.12s, opacity 75ms ease, transform 75ms cubic-bezier(0.55, 0.055, 0.675, 0.19);
  }

  @media (max-width: 768px) {
    .hamburger-line {
      &:before {
        top: -8px;
      }

      &:after {
        bottom: -8px;
      }
    }

    .hamburger-line,
    .hamburger-line:before,
    .hamburger-line:after {
      height: 3px;
      width: 24px;
    }
  }
</style>
