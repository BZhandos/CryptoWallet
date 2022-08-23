<template>
  <div class="withdraw-wrap">
    <WalletMenu />
    <div class="withdraw-form">
      <p class="withdraw-form__header">Withdraw Bitcoin
        <span v-if="step===4" class="withdraw-form__status">pending</span>
      </p>
      <!--      it already took much time so i did it this way, in best case i would have done it in separate
       components and with validation of field in <form> tag not wrapped in div-->
      <div v-show="step === 1">
        <TheInput :type="'number'"
                  :label="`Amount (${walletHolder.fiat.short_name})`"
                  v-model:value="withdrawForm.amount"
                  :description="`A withdrawal fee of ${walletHolder.fiat.short_name} ${walletHolder.fee} applies.`"
                  :fillValue="walletHolder.total" />
        <TheInput label="Destination address" v-model:value="withdrawForm.address"/>
        <TheInput label="Comment" :textarea="true" v-model:value="withdrawForm.comment"/>
        <div class="withdraw-form__action">
          <TheButton text="Withdraw" @click="step=2" />
        </div>
      </div>
      <div v-show="step===2">
        <TheInput :label="`Amount (${walletHolder.fiat.short_name})`"
                  :disabled="true"
                  v-model:value="withdrawForm.amount" />
        <TheInput :disabled="true" label="Destination address" v-model:value="withdrawForm.address"/>
        <TheInput :type="'password'"
                  label="Password"
                  :highlighted="true"
                  v-model:value="withdrawForm.password"/>

        <div class="withdraw-form__action">
          <TheButton text="Cancel" @click="step=1" type="ghost"/>
          <TheButton text="Confirm" @click="step=3" />
        </div>
      </div>
      <div v-show="step===3">
        <TheInput :label="`Amount (${walletHolder.fiat.short_name})`"
                  :disabled="true"
                  v-model:value="withdrawForm.amount" />
        <TheInput :disabled="true" label="Destination address" v-model:value="withdrawForm.address"/>
        <TheInput label="2FA code"
                  :highlighted="true"
                  v-model:value="withdrawForm.code_2FA"/>

        <div class="withdraw-form__action">
          <TheButton text="Cancel" @click="step=2" type="ghost"/>
          <TheButton text="Confirm" @click="step=4" />
        </div>
      </div>
      <div v-show="step===4">
        <p class="withdraw-form__info">A withdrawal for {{`${walletHolder.fiat.short_name} ${walletHolder.fee}`}} is pending, and will be processed shortly.</p>
        <TheInput :label="`Amount (${walletHolder.fiat.short_name})`"
                  :disabled="true"
                  v-model:value="withdrawForm.amount" />
        <div class="withdraw-form__action">
          <TheButton text="OK" @click="withdrawHandler" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { reactive, computed, ref } from "vue";
import { useWalletStore } from "@/stores/wallet";
import { useApi } from "@/composables/useApi";

import WalletMenu from "@/components/WalletMenu.vue"
import TheInput from "@/components/input/TheInput.vue"
import TheButton from "@/components/button/TheButton.vue"
import type {IWalletItem, IWithdrawalForm} from "@/api/@types/Wallet.type";

const $API = useApi();
const router = useRouter();
const walletStore = useWalletStore();

const walletHolder = computed((): IWalletItem => {
  if (walletStore.walletList.length === 0) {
    walletStore.getWallet()
  }
  return walletStore.walletList.find(value => value.id === Number(router.currentRoute.value.params.id)) as IWalletItem;
})

const withdrawForm = reactive<IWithdrawalForm>({
  amount: "",
  comment: "",
  address: "",
  password: "",
  code_2FA: "",
});
const step = ref<number>(1)

async function withdrawHandler() {
  const {success} = await $API.Wallet.withdrawFromWallet(withdrawForm)
  if (success) {
    await router.push('/')
  } else {
    alert('error happened')
  }
}

</script>

<style scoped>
.withdraw-wrap {
  display: grid;
  grid-template-columns: 380px auto;
  gap: 40px;
  max-width: 1240px;
  width: 100%;
  margin: 48px auto;
}
.withdraw-form{
  width: 100%;
  background-color: #fff;
  padding: 32px 0;
}
.withdraw-form__header {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 32px;
  padding: 0 32px;
}
.withdraw-form__info {
  margin-bottom: 48px;
}
.withdraw-form__status {
  background: #F7F8F9;
  border-radius: 20px;
  padding: 9px 12px;
  color: #FE9A01;
  font-size: 16px;
}
.withdraw-form__status::before{
  content: '';
  margin-right: 8px;
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #FE9A01;
}
.withdraw-form__action {
  display: flex;
  justify-content: center;
  gap: 16px;
}
</style>