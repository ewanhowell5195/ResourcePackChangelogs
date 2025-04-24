<script setup>
  import changelogs from "@/assets/json/changelogs.json"
</script>

<template>
  <section class="container">
    <h1>Changelogs</h1>
    <div class="changelogs-container">
      <div v-for="type in ['major', 'minor']" :key="type" class="changelogs" :class="type">
        <div class="changelog-heading">{{ type }} updates</div>
        <div v-for="(changelog, index) in changelogs.filter(c => c.type === type)" :key="`${changelog.from}-${changelog.to}`" class="changelog">
          <div class="changelog-version">
            <span>{{ changelog.from }}</span>
            <span class="icon">arrow_forward</span>
            <span>{{ changelog.to }}</span>
          </div>
          <router-link :class="['button', type === 'major' ? 'white' : '']" :to="`/changelogs/${changelog.from}_${changelog.to}`">View changelog</router-link>
          <template v-if="index === 0">
            <a :class="['button', 'secondary', type === 'major' ? 'white' : '']" :href="changelog.changelog ?? `https://www.minecraft.net/en-us/article/minecraft-snapshot-${changelog.to}`" target="_blank">Official changelog</a>
            <a :class="['button', 'secondary', type === 'major' ? 'white' : '']" :href="changelog.changelog ?? `https://cccode.pages.dev/version-diff/?${changelog.from},${changelog.to}`" target="_blank">Asset comparison</a>
          </template>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
  .changelogs-container {
    display: flex;
    gap: 32px;
    align-items: flex-start;
  }

  .changelogs {
    display: flex;
    gap: 32px;
    flex-direction: column;
    width: calc(50% - 32px / 2);
  }

  .changelog {
    background-color: var(--color-primary);
    border-radius: 12px;
    flex: 1;
    padding: 32px;
    display: flex;
    gap: 8px;
    flex-direction: column;

    &:not(:nth-child(2)) {
      padding: 24px 32px;

      .changelog-version {
        margin-bottom: 10px;

        & span {
          font-size: 32px;
        }
      }
    }
  }

  .changelog-heading {
    text-transform: uppercase;
    font-weight: 700;
    letter-spacing: 2px;
    font-size: 32px;
    margin-bottom: -16px;
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

  .changelogs.minor .changelog {
    background-color: initial;
    border: 2px solid var(--color-primary);
  }

  @media (max-width: 768px) {
    .changelogs-container {
      flex-direction: column;
    }

    .changelogs {
      width: 100%;
      gap: 16px;
    }

    .changelog {
      padding: 16px !important;

      &:not(:nth-child(2)) .changelog-version {
        margin-bottom: 6px;

        & span {
          font-size: 24px;
        }
      }
    }

    .changelog-heading {
      font-size: 24px;
      margin-bottom: 0;
    }

    .changelog-version {
      gap: 6px;
      margin-bottom: 8px;

      & span {
        font-size: 32px;
      }
    }
  }
</style>