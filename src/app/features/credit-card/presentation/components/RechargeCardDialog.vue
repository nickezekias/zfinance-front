<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import { getApiErrors } from '@/app/utils/helpers';
import { required } from '@vuelidate/validators';

import type { AxiosError } from 'axios';

import Dialog from 'primevue/dialog'
import NikkInputText from '@/components/forms/NikkInputText.vue'

import { useCreditCardStore } from '@/stores/credit-card.store';
import { useI18n } from 'vue-i18n';
import { useToast } from 'primevue/usetoast';
import useVuelidate from '@vuelidate/core';


const { t } = useI18n()
const toast = useToast()
const emit = defineEmits(['close'])
const loading = ref(false)
const objStore = useCreditCardStore()
const model = defineModel()

const state = reactive({
  amount: '',
  passCode: ''
})

const rules = computed(() => ({
  amount: { required },
  passCode: { required }
}))

const v$ = useVuelidate(rules, state, { $autoDirty: true });

function clearForm() {
  state.amount = ''
  state.passCode = ''
  v$.value.$reset()
}

function closeDialog() {
  emit('close')
  clearForm()
}

async function submit() {
  loading.value = true
  try {
    const isFormCorrect = await v$.value.$validate();
    if (isFormCorrect) {
      await objStore.rechargeCard(state)
      toast.add({
        severity: "success",
        summary: t('labels.operationSuccess'),
        detail: t('features.cc.rechargeSuccessDesc'),
        life: 10000
      })
      await objStore.getAllForUser()
      closeDialog()
    }
  } catch (e) {
    toast.add({
      severity: "error", 
      summary: t('labels.operationFailure'),
      detail: t(`${getApiErrors(e as AxiosError)}`),
      life: 10000,
    });
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <Dialog v-model:visible="model" modal :header="$t('labels.rechargeCard')" :closable="false">
    <form @submit.prevent="submit" class="mt-6 flex flex-col gap-8">
      <NikkInputText
        v-model="state.amount"
        errorHelpLabel="errors.validation.requiredField"
        id="tm-amount"
        :isError="v$.amount.$error"
        label="labels.amount"
        type="text"
      />

      <NikkInputText
        v-model="state.passCode"
        errorHelpLabel="errors.validation.requiredField"
        id="tm-pass-code"
        :isError="v$.passCode.$error"
        label="labels.passCode"
        type="password"
      />

      <div class="flex place-content-between mt-4">
        <PrimeButton @click="closeDialog" text severity="error" :label="$t('labels.cancel')" />
        <PrimeButton :loading="loading" type="submit" :label="$t('labels.recharge')" />
      </div>
    </form>
  </Dialog>
</template>
