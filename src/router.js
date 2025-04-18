import { createRouter, createWebHistory } from "vue-router"

const pages = import.meta.glob("./components/pages/**/*.vue")

const routes = {}
for (const page of Object.keys(pages)) {
  let name = page.match(/\.\/components\/pages\/(.+)\.vue$/)[1]
  if (name.endsWith("/index") || name === "index") {
    name = name.slice(0, -6)
  }
  
  const route = {
    name: name || "index",
    component: pages[page]
  }

  if (name === "changelogs/changelog") {
    route.path = "/changelogs/:slug"
  } else {
    route.path = `/${name.toLowerCase()}`
  }

  routes[route.name] = route
}

routes[404] = {
  path: "/:pathMatch(.*)*",
  name: "404",
  title: "Page Not Found",
  component: routes[404].component
}

const router = createRouter({
  history: createWebHistory(),
  routes: Object.values(routes)
})

router.beforeEach(async (to, from, next) => {
  const components = to.matched[to.matched.length - 1].components
  
  if (typeof components.default === "function") {
    components.default = (await components.default()).default
  }

  const title = components.default.title ?? to.name.split("/").at(-1).replace(/([a-z0-9])([A-Z])/g, "$1 $2").replace(/^./, (str) => str.toUpperCase())
  document.title = title !== "Index" ? `${title} | Resource Pack Changelogs` : "Resource Pack Changelogs"
  next()
})

export default router