import { createRouter, createWebHistory } from 'vue-router'
import { WalletRoutes } from "./routes";

export const routes = [
    ...WalletRoutes,
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
