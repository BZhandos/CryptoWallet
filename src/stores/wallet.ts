import { defineStore } from 'pinia'
import type { IWalletItem } from "@/api/@types/Wallet.type";
import { useApi } from "@/composables/useApi";

const $API = useApi();

export const useWalletStore = defineStore({
  id: 'wallet',
  state: () => ({
    walletList: [] as IWalletItem[]
  }),
  actions: {
    async getWallet() {
      this.walletList = await $API.Wallet.getWalletList() as IWalletItem[]
    }
  }
})
