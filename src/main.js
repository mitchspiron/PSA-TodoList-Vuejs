import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "@popperjs/core";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "jquery/src/jquery.js";
import "bootstrap/dist/js/bootstrap.min.js";
import VueWriter from "vue-writer";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import VueParticles from "vue-particles";

createApp(App)
  .use(router)
  .use(VueWriter)
  .use(Toast)
  .use(VueParticles)
  .mount("#app");
