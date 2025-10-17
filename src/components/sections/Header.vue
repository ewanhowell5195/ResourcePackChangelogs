<script setup>
  import HamburgerButton from "../snippets/HamburgerButton.vue"
  import { ref, onMounted, onUnmounted, watch } from "vue"
  import Sidebar from "../sections/Sidebar.vue"

  const isScrolled = ref(false)
  const sidebarOpen = ref(false)

  function handleScroll() {
    isScrolled.value = window.scrollY > 0 || sidebarOpen.value
  }

  function handleResize() {
    if (window.innerWidth > 800) {
      sidebarOpen.value = false
    }
  }

  onMounted(() => {
    window.addEventListener("scroll", handleScroll)
    window.addEventListener("resize", handleResize)
  })

  onUnmounted(() => {
    window.removeEventListener("scroll", handleScroll)
    window.removeEventListener("resize", handleResize)
  })

  watch(sidebarOpen, handleScroll)
</script>

<template>
  <header :class="{ scrolled: isScrolled }">
    <div class="header container">
      <HamburgerButton v-model="sidebarOpen" />
      <router-link to="/" id="header-logo-link" @click="sidebarOpen = false">
        <img src="/assets/images/logo/logo.webp" width="58" height="58">
        <img src="/assets/images/logo/logo_light.webp" width="58" height="58">
        <span>Resource Pack Changelogs</span>
      </router-link>
      <nav>
        <router-link to="/">Home</router-link>
        <router-link to="/changelogs/latest">Latest</router-link>
        <router-link to="/changelogs">Changelogs</router-link>
      </nav>
    </div>
  </header>
  <Sidebar v-model="sidebarOpen" />
</template>

<style>
  :root {
    --header-height: 74px;
    scroll-padding-top: var(--header-height);
  }

  @media (max-width: 768px) {
    :root {
      --header-height: 64px;
    }
  }

  @media (max-width: 480px) {
    :root {
      --header-height: 59px;
    }
  }
</style>

<style scoped>
  header {
    background-color: var(--color-background);
    position: sticky;
    top: 0;
    z-index: 50;
    transition: background-color .25s ease;

    * {
      color: #fff;
      transition: color .25s ease, background-color .25s ease;
    }

    &:not(.scrolled) + :deep(#sidebar) {
      background-color: var(--color-background);
    }
  }

  .header {
    margin: 8px auto;
    flex-direction: row;
    align-items: center;
    gap: 32px;
    justify-content: space-between;
  }

  #header-logo-link {
    display: flex;
    align-items: center;
    text-decoration: none;
    gap: 16px;

    & img {
      transition: opacity .25s ease;
    }

    & img:nth-child(2) {
      margin-left: calc(-58px - 16px);
      opacity: 0;
    }

    & span {
      font-family: var(--font-heading) !important;
      font-size: 28px;
      text-align: center;
    }
  }

  header.scrolled {
    background-color: var(--color-primary);

    #header-logo-link img {
      opacity: 0;
    }

    #header-logo-link img:nth-child(2) {
      opacity: 1;
    }
  }

  nav {
    display: flex;
    gap: 16px;

    & a {
      font-size: 20px;
      text-decoration: none;
      position: relative;

      &::before {
        content: "";
        position: absolute;
        bottom: 2px;
        height: 2px;
        background-color: #fff;
        left: 50%;
        transform: translateX(-50%);
        width: 0;
        transition: width .15s ease;;
      }

      &:hover::before {
        width: 100%;
      }
    }
  }

  .hamburger-menu {
    display: none;
  }

  @media (max-width: 800px) {
    nav {
      display: none;
    }

    .hamburger-menu {
      display: flex;
    }

    #header-logo-link {
      flex: 1;
      justify-content: center;
      margin-right: calc(32px + 35px);
    }
  }

  @media (max-width: 768px) {
    .header {
      gap: 16px;
      padding: 0 16px;
      margin: 12px 0;
    }

    #header-logo-link {
      margin-right: calc(16px + 35px);
      gap: 12px;

      & img {
        width: 40px;
        height: 40px;

        &:nth-child(2) {
          margin-left: calc(-40px - 12px);
        }
      }

      & span {
        font-size: 24px;
      }
    }
  }

  @media (max-width: 480px) {
    #header-logo-link {
      gap: 6px;

      & img {
        width: 32px;
        height: 32px;

        &:nth-child(2) {
          margin-left: calc(-32px - 6px);
        }
      }

      & span {
        font-size: 18px;
        line-height: 1;
      }
    }
  }

  @media (max-width: 384px) {
    #header-logo-link span {
      max-width: 128px;
    }
  }
</style>