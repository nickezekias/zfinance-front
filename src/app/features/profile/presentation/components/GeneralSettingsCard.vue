<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue';
import { email, required } from '@vuelidate/validators';
import { getApiErrors, getImageSrc } from '@/app/utils/helpers';
import { useI18n } from 'vue-i18n';
import { useToast } from 'primevue/usetoast';
import useVuelidate from '@vuelidate/core';

import type { AxiosError } from 'axios';
import gendersList from '@/assets/data/genders.json'

import FileUploader from '@/components/FileUploader.vue'
import NikkInputText from '@/components/forms/NikkInputText.vue'
import NikkDatePicker from '@/components/forms/NikkDatePicker.vue';
import NikkSelect from '@/components/forms/NikkSelect.vue';
import { useAuthStore } from '@/stores/auth.store';
import { useProfileStore } from '@/stores/profile.store';

const authStore = useAuthStore()
const objStore = useProfileStore()
const { t } = useI18n()
const toast = useToast()

const idImageSrc = computed(() => {
  return authStore.user?.IDDocument
})

const loading = ref(false)
const formData = computed(() => {
  const formData = new FormData()
  for (let [key, value] of Object.entries(state)) {
    formData.append(`${key}`, value.toString())
  }

  const IDDocument = state.IDDocument as any // inferred as any to remove typescript error
  if (IDDocument instanceof File) {
    formData.append('file', state.IDDocument)
  }
  return formData
})

const state = reactive({
  birthDate: '',
  email: '',
  firstName: '',
  gender: '',
  IDDocument: '',
  lastName: '',
  occupation: '',
  phone: '',
})

const rules = computed(() => ({
  birthDate: { required },
  email: { required, email },
  firstName: { required },
  gender: { required },
  lastName: { required },
  IDDocument: { required },
  occupation: { required },
  phone: { required },
}));

const v$ = useVuelidate(rules, state, { $autoDirty: true });

onMounted(() => {
  fillData()
})

function fillData() {
  if (authStore.user) {
    // state.avatar = authStore.user.avatar
    state.birthDate = authStore.user.birthDate?.split('T')[0]
    state.email = authStore.user.email
    state.firstName = authStore.user.firstName
    state.gender = authStore.user.gender
    state.IDDocument = authStore.user?.IDDocument as string
    state.lastName = authStore.user.lastName
    state.occupation = authStore.user.occupation
    state.phone = authStore.user.phone
  }
}

async function submit() {
  loading.value = true
  try {
    const isFormCorrect = await v$.value.$validate();
    if (isFormCorrect) {
      const birthDate = new Date(`${formData.value.get('birthDate')}`).toISOString().split('T')[0]
      formData.value.set('birthDate', birthDate)
      await objStore.updateProfileInfo(formData.value)
      // Refresh auth user data in store
      await authStore.getAuthenticatedUser()
      toast.add({
        severity: "success",
        summary: t('labels.operationSuccess'),
        detail: t('features.profile.generalInfoChangedSuccessDesc'),
        life: -1
      })
    } else {
      /* if (state.IDDocument == '') {
        alert('Something bout missing ID card')
      } */
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
  <PrimeCard>
    <template #title>
      {{ $t('features.profile.generalSettings') }}
    </template>

    <template #content>
      <form @submit.prevent="submit" class="flex flex-col gap-8 mt-8">
        <NikkInputText v-model="state.lastName" errorHelpLabel="errors.validation.requiredField" id="last-name"
          :isError="v$.lastName.$error" label="labels.lastName" type="text" />

        <NikkInputText v-model="state.firstName" errorHelpLabel="errors.validation.requiredField" id="first-name"
          :isError="v$.firstName.$error" label="labels.firstName" type="text" />

        <NikkDatePicker v-model="state.birthDate" dateFormat="dd-mm-yy" errorHelpLabel="errors.validation.requiredField"
          id="birth-date" :isError="v$.birthDate.$error" label="labels.birthDate" />

        <NikkSelect v-model="state.gender" errorHelpLabel="errors.validation.requiredField" id="gender"
          :isError="v$.gender.$error" :options=gendersList :placeholder="$t('labels.selectGender')" class="w-full" />

        <NikkInputText v-model="state.email" errorHelpLabel="errors.validation.email" id="email"
          :isError="v$.email.$error" label="labels.email" type="email" />

        <NikkInputText v-model="state.phone" errorHelpLabel="errors.validation.requiredField" id="phone"
          :isError="v$.phone.$error" label="labels.phone" type="tel" />

        <NikkInputText v-model="state.occupation" errorHelpLabel="errors.validation.requiredField" id="occupation"
          :isError="v$.occupation.$error" label="labels.occupation" type="text" />

        <PrimeMessage class="mb-3" severity="warn" icon="pi pi-info-circle">{{
          $t('messages.idDocumentRequired') }}
        </PrimeMessage>
        <FileUploader :extImageSrc="getImageSrc(`${idImageSrc}`)"
          @file-selected="(event: File) => { state.IDDocument = event }" />

        <div class="flex mt-4">
          <PrimeButton type="submit" class="ml-auto px-6" :loading="loading" :label="$t('labels.save')" />
        </div>
      </form>
    </template>
  </PrimeCard>
</template>