<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue';
import { getApiErrors } from '@/app/utils/helpers';
import { required } from '@vuelidate/validators';
import { useCreditCardStore } from '@/stores/credit-card.store';
import { useI18n } from 'vue-i18n';
import { useToast } from 'primevue/usetoast';
import useVuelidate from '@vuelidate/core';

import type { AxiosError } from 'axios';

import NikkInputText from '@/components/forms/NikkInputText.vue'
import { useRouter } from 'vue-router';
import type { CreditCardCreateRequest, CreditCardRequest } from '@/@types/credit-card.interface';
import type CreditCard from '@/app/domain/credit-card.model';

const state: CreditCardCreateRequest = reactive({
  accountNumber: '039239032',
  cvc: '',
  expiryDate: '',
  holder: '',
  issuer: 'UBA',
  network: 'Visa',
  number: '392838239238',
  type: 'Prepaid'
})
defineEmits(['close'])
const loading = ref(false)
const objStore = useCreditCardStore()
const props = defineProps<{
  data?: CreditCard | null,
  readonly?: boolean
}>()
const router = useRouter()
const rules = computed(() => ({
  accountNumber: { required },
  cvc: { required },
  expiryDate: { required },
  holder: { required },
  issuer: { required },
  network: { required },
  number: { required },
  type: { required }
}))
const { t } = useI18n()
const toast = useToast()
const v$ = useVuelidate(rules, state, { $autoDirty: true });

onMounted(() => {
  fillForm()
})

function fillForm() {
  if (props.data) {
    state.accountNumber = props.data.accountNumber
    state.cvc = props.data.cvc
    state.expiryDate = props.data.expiryDate
    state.holder = props.data.holder
    state.issuer = props.data.issuer
    state.network = props.data.network
    state.number = props.data.type
  }
}

async function submit(){
  loading.value = true
  try {
    const isFormCorrect = await v$.value.$validate();
    console.log("FORM_STATE", state)
    if (isFormCorrect) {
      const postData: CreditCardRequest = {
        cardIssuer: state.issuer,
        cardNetwork: state.network,
        cardType: "prepaid"
      }
      await objStore.createCardRequest(postData);
      toast.add({
        severity: "success",
        summary: t('labels.operationSuccess'),
        detail: t('features.cc.createCardRequestSuccessDesc'),
        life: -1
      })
      router.push({ name: 'dashboard' })
    } else {
      toast.add({
        severity: "error",
        summary: t('labels.invalidForm'),
        detail: t('labels.invalidFormHint'),
        life: 10000,
      });
    }
  } catch (e) {
    toast.add({
      severity: "error", 
      summary: t('labels.operationFailure'),
      detail: getApiErrors(e as AxiosError),
      life: 10000,
    });
  } finally {
    loading.value = false
  }
}
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
        v-model="state.holder"
        errorHelpLabel="errors.validation.requiredField"
        id="card-holder"
        :isError="v$.holder.$error"
        label="labels.cardHolder"
        :disabled="props.readonly"
        type="text"
      />

      <NikkInputText
        v-model="state.number"
        errorHelpLabel="errors.validation.requiredField"
        id="card-number"
        :isError="v$.number.$error"
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
        type="date"
      />
    </div>

    <div v-if="!props.readonly" class="flex justify-end mt-8">
      <PrimeButton @click="$emit('close')" text :label="$t('labels.cancel')"/>
      <PrimeButton type="submit" :loading="loading" class="ml-3" :label="$t('labels.addCard')"/>
    </div>
  </form>
</template>