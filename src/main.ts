import { createApp } from "vue";
import App from "./App.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { createPinia } from "pinia";

const pinia = createPinia();

library.add(fas);

createApp(App).use(pinia).component("fa", FontAwesomeIcon).mount("#app");
