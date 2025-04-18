<script setup>
  import { ref, onMounted, onUnmounted } from "vue"

  const isScrolled = ref(false)

  function handleScroll() {
    isScrolled.value = window.scrollY > 0
  }

  onMounted(() => {
    window.addEventListener("scroll", handleScroll)
  })

  onUnmounted(() => {
    window.removeEventListener("scroll", handleScroll)
  })
</script>

<template>
  <header :class="{ scrolled: isScrolled }">
    <div class="header container">
      <router-link to="/" id="header-logo-link">
        <img src="/assets/images/logo/logo.webp" width="64" height="64">
        <img src="/assets/images/logo/logo_light.webp" width="64" height="64">
        <span>Resource Pack Changelogs</span>
      </router-link>
      <nav>
        <router-link to="/">Home</router-link>
        <router-link to="/changelogs/latest">Latest</router-link>
        <router-link to="/changelogs">Changelogs</router-link>
      </nav>
    </div>
  </header>
</template>

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
  }

  .header {
    margin: 24px auto;
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
      margin-left: -80px;
      opacity: 0;
    }

    & span {
      font-family: var(--font-heading) !important;
      font-size: 32px;
    }
  }

  header.scrolled {
    background-color: var(--color-primary);

    * {
      color: #fff;
    }

    & a::before {
      background-color: #fff;
    }

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
        background-color: #000;
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

  @media (max-width: 768px) {
    .container {
      justify-content: center;
    }

    nav {
      display: none;
    }
  }
</style>