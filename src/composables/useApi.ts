import { API } from "@/api";

export function useApi() {
  const $API = new API('base_url_from_env');
  return $API;
}
