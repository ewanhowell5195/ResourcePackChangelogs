import { createApp, reactive } from "vue"
import settings from "./settings.json"
import App from "./App.vue"
import router from "./router"
import "./styles.css"

const app = createApp(App)

app.config.globalProperties.$settings = settings
window.$settings = settings

app.use(router)
app.mount("#app")