<script setup lang="ts">
import { reactive, ref } from 'vue'
import { email, required } from "@vuelidate/validators";
import { useAuthStore } from '@/stores/auth.store';
import { useI18n } from 'vue-i18n';
import { useToast } from 'primevue/usetoast';
import { useVuelidate } from "@vuelidate/core";

import type { AxiosError } from 'axios';

import NikInputText from '@/components/forms/NikkInputText.vue'
import { getApiErrors } from '@/app/utils/helpers';
import type { LoginRequest } from '@/@types/auth.interface';

const authStore = useAuthStore()
const loading = ref(false)
const rules = {
  email: { required, email },
  password: { required },
};
const state: LoginRequest = reactive({
  email: '',
  password: ''
})
const { t } = useI18n()
const toast = useToast()
const v$ = useVuelidate(rules, state, { $autoDirty: true });

async function submit(): Promise<void> {
  loading.value = true
  try {
    const isFormCorrect = await v$.value.$validate();
    if (isFormCorrect) {
      await authStore.login(state);
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
      summary: t('labels.loginFailed'),
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
    <div class="field mt-10">
      <NikInputText v-model="state.email" errorHelpLabel="errors.invalid.email" id="email" :isError="v$.email.$error"
        label="labels.email" type="email" />
    </div>

    <div class="field mt-8">
      <NikInputText v-model="state.password" errorHelpLabel="errors.requiredField" id="password" :isError="v$.password.error"
        label="labels.password" type="password" />
    </div>
    <div class="flex">
      <router-link class="ml-auto" :to="{ name: 'auth.forgotPassword' }">
        <PrimeButton class="ml-auto mt-1 py-1 px-2 text-red-500" :label="$t('labels.forgotPassword')" />
      </router-link>
    </div>

    <div class="actions mt-8">
      <PrimeButton type="submit" :loading="loading" class="w-full p-3 bg-primary text-white"
        :label="$t('labels.login')" />
      <router-link class="ml-auto" :to="{ name: 'auth.register' }">
        <PrimeButton text plain class="w-full p-3 text-primary mt-3" :label="$t('features.login.createNewAccount')" />
      </router-link>
    </div>
  </form>
</template>import type { AxiosError } from 'axios';
