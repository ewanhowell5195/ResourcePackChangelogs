<script setup>
  import changelogs from "@/assets/json/changelogs.json"

  const displayed = [
    changelogs.find(r => r.type === "major"),
    changelogs.find(r => r.type === "minor")
  ]
</script>

<template>
  <section class="container">
    <h1>Latest Changelogs</h1>
    <div class="changelogs">
      <div v-for="(changelog, index) in displayed" :key="index" class="changelog">
        <div class="changelog-heading">{{ changelog.type }} update</div>
        <div class="changelog-version">
          <span>{{ changelog.from }}</span>
          <span class="icon">arrow_forward</span>
          <span>{{ changelog.to }}</span>
        </div>
        <router-link :class="['button', index === 0 ? 'white' : '']" :to="`/changelogs/${changelog.from}_${changelog.to}`">View changelog</router-link>
        <a :class="['button', 'secondary', index === 0 ? 'white' : '']" :href="changelog.changelog ?? `https://www.minecraft.net/en-us/article/minecraft-snapshot-${changelog.to}`" target="_blank">Official changelog</a>
        <a :class="['button', 'secondary', index === 0 ? 'white' : '']" :href="changelog.changelog ?? `https://cccode.pages.dev/version-diff/?${changelog.from},${changelog.to}`" target="_blank">Asset comparison</a>
      </div>
    </div>
  </section>
</template>

<style scoped>
  .changelogs {
    display: flex;
    gap: 32px;
    flex-wrap: wrap;
  }

  .changelog {
    background-color: var(--color-primary);
    border-radius: 12px;
    flex: 1;
    padding: 32px;
    display: flex;
    gap: 8px;
    flex-direction: column;
  }

  .changelog-heading {
    text-transform: uppercase;
    font-weight: 700;
    letter-spacing: 2px;
  }

  .changelog-version {
    display: flex;
    gap: 10px;
    align-items: center;
    margin-bottom: 16px;
    flex-wrap: wrap;

    & span {
      font-size: 48px;
      font-weight: 700;
      line-height: 1;
    }
  }

  .button {
    min-width: 100%;
  }

  .changelog:last-child {
    background-color: initial;
    border: 2px solid var(--color-primary);
  }
</style>