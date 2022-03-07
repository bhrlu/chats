import { boot } from "quasar/wrappers";
import axios from "axios";

const api = axios.create({ baseURL: "https://imdb-api.com/en/API/Search" });
const key = 'k_ht9k8p8w'

export default boot(({ app }) => {
  app.config.globalProperties.$axios = axios;
  app.config.globalProperties.$api = api;
  app.config.globalProperties.$key = key;
});

export { axios, api, key };
