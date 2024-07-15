<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import { required } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';

import NikkInputText from '@/components/forms/NikkInputText.vue'

const state = reactive({
  accountNumber: '039239032',
  cardHolder: '',
  cardNumber: '',
  cvc: '',
  expiryDate: ''
})
const loading = ref(false)
const props = defineProps<{
  readonly?: boolean
}>()
const rules = computed(() => ({
  accountNumber: { required },
  cardHolder: { required },
  cardNumber: { required },
  cvc: { required },
  expiryDate: { required }
}))
const v$ = useVuelidate(rules, state, { $autoDirty: true });

async function submit(){}
</script>

<template>
  <form @submit.prevent="submit">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 gap-y-10">
      <NikkInputText
        v-model="state.accountNumber"
        errorHelpLabel="errors.validation.requiredField"
        id="account-number"
        :isError="v$.accountNumber.$error"
        label="labels.accountNumber"
        :disabled="props.readonly"
        type="text"
      />

      <NikkInputText
        v-model="state.cardHolder"
        errorHelpLabel="errors.validation.requiredField"
        id="card-holder"
        :isError="v$.cardHolder.$error"
        label="labels.cardHolder"
        :disabled="props.readonly"
        type="text"
      />

      <NikkInputText
        v-model="state.cardNumber"
        errorHelpLabel="errors.validation.requiredField"
        id="card-number"
        :isError="v$.cardNumber.$error"
        label="labels.cardNumber"
        :disabled="props.readonly"
        type="text"
      />

      <NikkInputText
        v-model="state.cvc"
        errorHelpLabel="errors.validation.requiredField"
        id="cvc"
        :isError="v$.cvc.$error"
        label="labels.cvc"
        :disabled="props.readonly"
        type="text"
      />

      <NikkInputText
        v-model="state.expiryDate"
        errorHelpLabel="errors.validation.requiredField"
        id="expiry-date"
        :isError="v$.expiryDate.$error"
        label="labels.expiryDate"
        :disabled="props.readonly"
        type="text"
      />
    </div>

    <div class="flex justify-end mt-8">
      <PrimeButton text class="text-primary" :label="$t('labels.transferMoney')"/>
      <PrimeButton text class="ml-3" :label="$t('labels.recharge')"/>
    </div>
  </form>
</template>