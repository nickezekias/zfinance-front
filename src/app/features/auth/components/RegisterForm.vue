<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { email, minLength, required, sameAs } from "@vuelidate/validators";
import { getApiErrors } from '@/app/utils/helpers';
import { useAuthStore } from '@/stores/auth.store';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';
import { useVuelidate } from "@vuelidate/core";

import type { AxiosError } from 'axios';
import type { Ref } from 'vue';
import type { RegisterRequest } from '@/@types/auth.interface';

import NikInputText from '@/components/forms/NikkInputText.vue'
import { MIN_PWD_LENGTH } from '@/app/config';

const authStore = useAuthStore()
const loading = ref(false)
const router = useRouter()

const state = reactive({
  email: '',
  firstName: '',
  lastName: '',
  password: '',
  passwordConfirmation: '',
  phone: ''
})

const form: Ref<RegisterRequest> = computed(() => ({
  email: state.email,
  first_name: state.firstName,
  last_name: state.lastName,
  password: state.password,
  password_confirmation: state.passwordConfirmation,
  phone: state.phone
}))

const rules = computed(() => ({
  email: { required, email },
  firstName: { required },
  lastName: { required },
  password: { required, minLength: minLength(MIN_PWD_LENGTH) },
  passwordConfirmation: { sameAsPassword: sameAs(state.password) },
  phone: { required }
}));

const { t } = useI18n()
const toast = useToast()
const v$ = useVuelidate(rules, state, { $autoDirty: true });

async function submit(): Promise<void> {
  loading.value = true
  try {
    const isFormCorrect = await v$.value.$validate();
    if (isFormCorrect) {
      await authStore.register(form.value);
      toast.add({
        severity: "success",
        summary: t('features.register.success'),
        detail: t('features.register.successDetail'),
        life: 5000
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
      summary: t('labels.registerFailed'),
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
      <NikInputText
        v-model="state.lastName"
        errorHelpLabel="errors.validation.requiredField"
        id="last-name"
        :isError="v$.lastName.$error"
        label="labels.lastName"
        type="text"
      />
    </div>

    <div class="field mt-10">
      <NikInputText
        v-model="state.firstName"
        errorHelpLabel="errors.validation.requiredField"
        id="first-name"
        :isError="v$.firstName.$error"
        label="labels.firstName"
        type="text"
      />
    </div>

    <div class="field mt-10">
      <NikInputText
        v-model="state.email"
        errorHelpLabel="errors.validation.email"
        id="email"
        :isError="v$.email.$error"
        label="labels.email"
        type="email"
      />
    </div>

    <div class="field mt-10">
      <NikInputText
        v-model="state.phone"
        errorHelpLabel="errors.validation.requiredField"
        id="phone"
        :isError="v$.phone.$error"
        label="labels.phone"
        type="tel"
      />
    </div>

    <div class="field mt-8">
      <NikInputText
        v-model="state.password"
        errorHelpLabel="errors.validation.passwords.minCount"
        id="password"
        :isError="v$.password.$error"
        label="labels.password"
        type="password"
      />
    </div>

    <div class="field mt-8">
      <NikInputText
        v-model="state.passwordConfirmation"
        errorHelpLabel="errors.validation.passwords.notSame"
        id="password-confirmation"
        :isError="v$.passwordConfirmation.$error"
        label="labels.confirmPassword"
        type="password"
      />
    </div>

    <div class="actions mt-8">
      <PrimeButton type="submit" :loading="loading" class="w-full p-3 bg-primary text-white" :label="$t('labels.register')"/>
      <router-link class="ml-auto" :to="{ name: 'auth.login' }">
        <PrimeButton text plain class="w-full p-3 text-primary mt-3" :label="$t('features.register.loginExistingAccount')"/>
      </router-link>
    </div>
  </form>
</template>