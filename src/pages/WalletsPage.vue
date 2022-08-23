<template>
  <div class="wallet-wrap">
    <div class="wallet-wrap__header">
      <h1>Wallets</h1>
      <div class="search-label">
        <input class="search-label__input" placeholder="Search" v-model="search" @input="searchHandler" />
        <div class="search-label__icon">
          <IconSearch />
        </div>
      </div>
    </div>
    <div>
      <table id="customers">
        <tr>
          <th>Fiat/Crypto</th>
          <th>Available</th>
          <th>Total</th>
          <th>Value (AUD)</th>
          <th></th>
        </tr>
        <template v-if="search && filteredWalletList.length">
            <tr v-for="item in filteredWalletList" :key="item.fiat.id">
              <td>
                <SingleCrypto :cryptoInfo="item.fiat"/>
              </td>
              <td>
                <LongAmount :value="item.available"/>
              </td>
              <td>
                <LongAmount :value="item.total"/>
              </td>
              <td>
                <LongAmount :value="item.value" :withZeros="false" :sign="'$'"/>
              </td>
              <td :class="{'active': item.isWithdrawable}">
                <button class="wallet-action"
                        :disabled="!item.isWithdrawable"
                        @click="withdrawClick(item.id)"> Withdraw </button>
              </td>
            </tr>
        </template>
        <template v-if="!search">
          <tr v-for="item in walletList" :key="item.fiat.id">
            <td>
              <SingleCrypto :cryptoInfo="item.fiat"/>
            </td>
            <td>
              <LongAmount :value="item.available"/>
            </td>
            <td>
              <LongAmount :value="item.total"/>
            </td>
            <td>
              <LongAmount :value="item.value" :withZeros="false" :sign="'$'"/>
            </td>
            <td :class="{'active': item.isWithdrawable}">
              <button class="wallet-action"
                      :disabled="!item.isWithdrawable"
                      @click="withdrawClick(item.id)"> Withdraw </button>
            </td>
          </tr>
        </template>
      </table>
      <template v-if="search && filteredWalletList.length===0">
        <div class="empty-info">Not found by search "<code>{{search}}</code>"</div>
      </template>
    </div>
  </div>

</template>

<script setup lang="ts">
import IconSearch from '@/components/icons/IconSearch.vue'
import {onMounted, ref} from 'vue'
import type { IWalletItem } from "@/api/@types/Wallet.type";
import { useRouter } from "vue-router";
import { useWalletStore } from "@/stores/wallet";
import SingleCrypto from "@/components/SingleCrypto.vue"
import LongAmount from "@/components/LongAmount.vue"


const router = useRouter();


const walletStore = useWalletStore();
const walletList = ref<IWalletItem[]>([])
const filteredWalletList = ref<IWalletItem[]>([])
const search = ref<string>('')


onMounted(() => {
  initialize()
})

async function initialize() {
  try {
    await walletStore.getWallet()
    walletList.value = walletStore.walletList
  } catch (err: any) {
    console.log(err)
  }
}

function searchHandler() {
  filteredWalletList.value = walletList.value.filter((item) => {
    if (didSearchFind(item.fiat.short_name,search.value) ||
        didSearchFind(item.fiat.full_name, search.value)) {
      return item
    }
  })
  return filteredWalletList.value
}

function didSearchFind(text: string, fraction: string) : boolean {
  return text.toLowerCase().includes(fraction.toLowerCase().trim())
}

function withdrawClick(id: number) {
  router.push({
    name: "WithdrawalPage",
    params: {
      id: id
    }
  });
}

</script>

<style scoped>
.wallet-wrap {
  background-color: #FFFFFF;
  border-radius: 5px;
  max-width: 1240px;
  width: 100%;
  margin: 48px auto;
  padding: 30px;
}
.wallet-wrap__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 50px;
}
.search-label__icon {
  position: absolute;
  top: 50%;
  margin-top: -9px;
  pointer-events: none;
  left: 19px;
}
.search-label__input {
  height: 50px;
  width: 350px;
  padding: 15px 18px 15px 47px;
  display: inline-block;
  border-radius: 5px;
  border: 1px solid #D3D4D8;
  box-sizing: border-box;
}
.wallet-wrap table {
  width: 100%;
  border: none;
  text-align: left;
  border-spacing: 0;
}
.wallet-wrap tr:nth-child(even) {
  background-color: #F7F8F9;
}
.wallet-wrap tr:hover {
  transition: .2s;
  background-color: #d4e4ff;
}
.wallet-wrap th {
  background-color: #FFFFFF;
}
.wallet-wrap td, th {
  padding: 12px 16px 12px 20px;
}
.search-label {
  position: relative;
}
.empty-info {
  margin: 20px;
  text-align: center;
  font-size: 1.5rem;
}
.empty-info code{
  color: #0F66BD;
}
.wallet-action {
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
}
.active {
  color: #0F66BD;
}

</style>