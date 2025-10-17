<script setup>
  import changelogs from "@/assets/json/changelogs.json"
  import NotFound from "../../sections/404.vue"
  import { useRoute } from "vue-router"
  import { onMounted, ref, watch } from "vue"
  import MarkdownIt from "markdown-it"

  const route = useRoute()
  const renderedMarkdown = ref("")
  const changelog = ref(null)
  const prev = ref(null)
  const next = ref(null)

  const md = new MarkdownIt()
  md.core.ruler.after("block", "shift-headings", state => {
    for (const token of state.tokens) {
      if ((token.type === "heading_open" || token.type === "heading_close") && token.tag[0] === "h") {
        const level = Number(token.tag[1])
        token.tag = "h" + Math.min(level + 1, 6)
      }
    }
  })

  async function updateContent() {
    renderedMarkdown.value = ""
    prev.value = null
    next.value = null
    changelog.value = null

    const slug = route.params.slug

    if (slug === "latest") {
      changelog.value = changelogs[0]
    } else {
      const [from, to] = slug.split("_")
      changelog.value = changelogs.find(c => c.from === from && c.to === to)
    }

    if (!changelog.value) return

    const index = changelogs.findIndex(c => c.from === changelog.value.from && c.to === changelog.value.to)

    for (let i = index - 1; i >= 0; i--) {
      if (changelogs[i].type === changelog.value.type) {
        next.value = changelogs[i]
        break
      }
    }

    for (let i = index + 1; i < changelogs.length; i++) {
      if (changelogs[i].type === changelog.value.type && changelogs[i] !== changelog.value) {
        prev.value = changelogs[i]
        break
      }
    }

    let content = await fetch(`/assets/changelogs/${changelog.value.from}_${changelog.value.to}.md`).then(e => e.text())
    if (content.startsWith("<!doctype html>")) {
      content = "Changelog missing"
    }

    renderedMarkdown.value = md.render(content)
  }

  onMounted(updateContent)
  watch(() => route.params.slug, updateContent)
</script>

<template>
  <section v-if="changelog" class="container">
    <h1 class="changelog-version">
      <span>{{ changelog.from }}</span>
      <span class="icon">arrow_forward</span>
      <span>{{ changelog.to }}</span>
    </h1>
    <div class="links">
      <a class="button" :href="changelog.changelog ?? `https://www.minecraft.net/en-us/article/minecraft-snapshot-${changelog.to}`" target="_blank">Official changelog</a>
      <a class="button" :href="`https://cccode.pages.dev/version-diff/?${changelog.from},${changelog.to}`" target="_blank">Asset comparison</a>
    </div>
    <div class="pack-format">Pack format: {{ changelog.format >= 65 ? changelog.format.toFixed(1) : changelog.format }}</div>
    <div class="markdown" v-html="renderedMarkdown" />
    <div class="links">
      <router-link v-if="prev" class="button secondary" :to="`/changelogs/${prev.from}_${prev.to}`">
        <span class="icon">arrow_back</span>
        Previous changelog
      </router-link>
      <router-link v-if="next" class="button secondary" :to="`/changelogs/${next.from}_${next.to}`">
        Next changelog
        <span class="icon">arrow_forward</span>
      </router-link>
    </div>
  </section>
  <NotFound v-else />
</template>

<style scoped>
  .changelog-version {
    display: flex;
    gap: 16px;
    align-items: center;
    flex-wrap: wrap;
  }

  .pack-format {
    opacity: 0.5;
  }

  .links {
    display: flex;
    gap: 32px;
    min-width: 100%;

    a {
      min-width: calc(50% - 16px);
    }
  }

  .markdown {
    &:deep(h2):not(:first-child),
    &:deep(h3):not(:first-child),
    &:deep(h4):not(:first-child) {
      margin: 16px 0;
    }

    &:deep(code),
    &:deep(pre) {
      font-family: monospace;
      background-color: #0006;
      padding: 0 3px;
    }

    &:deep(pre) {
      padding: 8px;
      white-space: pre-wrap;
      line-height: 1.25;

      code {
        line-height: 1.25;
        background-color: initial;
      }
    }

    &:deep p {
      margin: 1em 0;
    }
  }

  @media (max-width: 768px) {
    .markdown {
      &:deep(h2):not(:first-child),
      &:deep(h3):not(:first-child),
      &:deep(h4):not(:first-child) {
        margin: 14px 0;
      }
    }
  }
</style>