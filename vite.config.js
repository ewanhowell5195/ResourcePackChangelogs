import vue from "@vitejs/plugin-vue"
import { defineConfig } from "vite"
import path from "node:path"
import fs from "node:fs"

const getFiles = async function*(dir) {
  const dirents = await fs.promises.readdir(dir, { withFileTypes: true })
  for (const dirent of dirents) {
    const res = path.resolve(dir, dirent.name)
    if (dirent.isDirectory()) {
      yield* getFiles(res)
    } else {
      yield res
    }
  }
}

export default defineConfig({
  plugins: [
    vue(),
    {
      name: "watch-public",
      apply: "serve",
      configureServer(server) {
        fs.watch(path.resolve(__dirname, "public"), { recursive: true }, () => {
          server.ws.send({
            type: "full-reload",
            path: "/"
          })
        })
      }
    },
    {
      name: "build-finished-hook",
      async closeBundle() {
        console.log("Build finished. Running custom post-build function...")
        await buildOpenGraph()
        await buildSitemap()
        buildRobots()
      }
    }
  ],
  resolve: {
    alias: {
      "@": "/src"
    }
  }
})

function loadVueFile(filePath) {
  const match = fs.readFileSync(filePath, "utf-8").match(/(?<=<script>\s*)export default\s*({[\s\S]*?})(?=\s*<\/script>)/)
  if (!match) {
    return {}
  }
  try {
    return new Function(`return ${match[1]}`)()
  } catch (error) {
    console.error(`Error parsing export default in ${filePath}:`, error)
    return null
  }
}

const defaults = {
  title: "Resource Pack Changelogs",
  colour: "#7CBD6B",
  description: "View the changelogs relevant to Minecraft Resource Packs.",
  image: "logo/logo.webp"
}

async function buildOpenGraph() {
  console.log("Building open graph data…")

  const main = fs.readFileSync("./dist/index.html","utf-8")
  const files = main.match(/<head>([\s\S]*?)<\/head>/)[1].trim().split("\n").slice(-2).join("\n")

  for await (const f of getFiles("./src/components/pages")) {
    const file = path.relative("./src/components/pages", f)
    if (file === "index.vue") {
      continue
    }
    const data = loadVueFile(f)

    let pages = []
    switch (file.replaceAll("\\", "/")) {
      case "changelogs/changelog.vue":
        const changelogs = JSON.parse(fs.readFileSync("src/assets/json/changelogs.json"))
        for (const changelog of changelogs) {
          console.log(`Processing: changelogs/${changelog.from}_${changelog.to}`)
          pages.push([`changelogs/${changelog.from}_${changelog.to}`, {
            title: `${changelog.from} ➜ ${changelog.to}`,
            description: `View all resource pack changes between ${changelog.from} and ${changelog.to}`
          }])
        }
        break
      default:
        console.log(`Processing: ${file}`)
        pages.push([file, data])
        break
    }

    for (const [file, data] of pages) {
      let id = path.basename(f, ".vue")
      if (id === "index") {
        id = path.basename(path.dirname(f))
      }

      const title = (data.title ?? id.replace(/([a-z0-9])([A-Z])/g, "$1 $2").replace(/^./, (str) => str.toUpperCase())) + " | " + defaults.title

      const html = `<!doctype html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <title>${title}</title>
      <link rel="icon" type="image/webp" sizes="16x16" href="/assets/images/logo/favicon_16.webp">
      <link rel="icon" type="image/webp" sizes="32x32" href="/assets/images/logo/favicon_32.webp">
      <meta name="viewport" content="width=device-width">
      <meta name="theme-color" content="${data.colour ?? defaults.colour}">
      <meta name="description" content="${data.description ?? defaults.description}">
      <meta property="og:type" content="website">
      <meta property="og:title" content="${title}">
      <meta property="og:description" content="${data.description ?? defaults.description}">
      <meta property="og:image" content="https://changelogs.ewanhowell.com/assets/images/${data.image ?? defaults.image}">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/brands.min.css" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:FILL@1" />
  ${files}
    </head>
    <body>
      <div id="app"></div>
    </body>
  </html>`
      
      const fileName = path.basename(file, ".vue")
      const outDir = path.join("dist", path.dirname(file))
      let outputPath
      if (fileName === "index") {
        outputPath = path.join(outDir, "index.html")
      } else {
        outputPath = path.join(outDir, fileName, "index.html")
      }
      fs.mkdirSync(path.dirname(outputPath), { recursive: true })
      fs.writeFileSync(outputPath, html)
    }
  }

  console.log("Built open graph data")
}

async function buildSitemap() {
  console.log("Building sitemap…")

  const urls = ["https://changelogs.ewanhowell.com/"]

  for await (const file of getFiles("dist")) {
    if (!file.endsWith("index.html")) continue

    const rel = path.relative("dist", file).replace(/\\/g, "/")

    if (rel === "404/index.html") continue
    if (rel === "index.html") continue

    let url = "/" + rel.replace(/index\.html$/, "")
    urls.push("https://changelogs.ewanhowell.com" + url)
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map(u => `<url><loc>${u}</loc></url>`).join("")}</urlset>`

  fs.writeFileSync("dist/sitemap.xml", sitemap)
  console.log("Built sitemap.xml with", urls.length, "urls")
}

function buildRobots() {
  console.log("Building robots.txt…")

  const robots = `User-agent: *
Allow: /

Sitemap: https://changelogs.ewanhowell.com/sitemap.xml`

  fs.writeFileSync("dist/robots.txt", robots)
  console.log("Built robots.txt")
}