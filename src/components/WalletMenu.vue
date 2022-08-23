<template>
  <div class="wallet-wrap">
    <p>Wallets</p>
    <div>
      <template v-for="item in walletList" :key="item.id">
        <div class="wallet-wrap__item">
          <SingleCrypto :cryptoInfo="item.fiat" :total="item.total" :hoverable="true" @click="router.push('/')"/>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import SingleCrypto from "@/components/SingleCrypto.vue"

import { useRouter } from "vue-router";
import { useWalletStore } from "@/stores/wallet";
import type { IWalletItem } from "@/api/@types/Wallet.type";
import {ref} from "vue";


const router = useRouter();
const walletStore = useWalletStore();

const walletList = ref<IWalletItem[]>(walletStore.walletList)

</script>

<style scoped>
.wallet-wrap {
  background-color: #FFFFFF;
  width: 100%;
  padding: 32px;
}
.wallet-wrap p {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 32px;
}
.wallet-wrap__item {
  margin-bottom: 25px;
}
</style>