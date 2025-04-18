<script setup>
  import Banner from "../sections/Banner.vue"
  import LatestChangelogs from "../sections/LatestChangelogs.vue"
</script>

<template>
  <Banner image="/assets/images/home/banner.webp">
    <div class="banner-title">Resource Pack Changelogs</div>
    <p>See the changelogs relevant to Minecraft Resource Packs.</p>
    <router-link class="white button" to="/changelogs/latest" style="min-width: 256px;">Latest Changelog</router-link>
    <router-link class="button" to="/changelogs" style="min-width: 256px;">All Changelogs</router-link>
  </Banner>
  <LatestChangelogs />
</template>