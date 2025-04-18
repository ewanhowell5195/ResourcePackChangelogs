<template>
  <footer>
    <div class="container">
      <div id="footer-upper">
        <router-link to="/" id="footer-logo">
          <img src="/assets/images/logo/logo_light.webp" alt="Logo" width="128" height="128">
        </router-link>
        <div class="footer-links">
          <div>Pages</div>
          <router-link to="/">Home</router-link>
          <router-link to="/changelogs/latest">Latest</router-link>
          <router-link to="/changelogs">Changelogs</router-link>
        </div>
      </div>
      <hr>
      <div id="footer-socials">
        <a href="https://ewanhowell.com/" target="_blank">
          <img src="/assets/images/logo/ewan.webp">
        </a>
        <a href="https://resourcepacks.ewanhowell.com/" class="fa fa-discord" target="_blank"></a>
      </div>
    </div>
  </footer>
</template>

<style scoped>
  * {
    color: #fff;
  }

  footer {
    background-color: var(--color-primary);
  }

  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 32px;
    margin: 40px auto 32px;
  }

  #footer-upper {
    display: flex;
    justify-content: space-around;
    gap: 32px;
    width: 100%;
    flex-wrap: wrap;
  }

  .footer-links {
    display: flex;
    flex-direction: column;
    gap: 4px;

    div {
      font-size: 24px;
      font-weight: 700;
      margin-bottom: 4px;
    }
  }

  hr {
    opacity: 0.5;
    width: 100%;
  }

  #footer-socials {
    display: flex;
    gap: 8px;

    a {
      font-size: 20px;
      border: 1px solid #fff;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    img {
      width: 24px;
      height: 24px;
    }
  }

  @media (max-width: 600px) {
    #footer-logo {
      width: 100%;
      display: flex;
      justify-content: center;
    }
  }
</style>