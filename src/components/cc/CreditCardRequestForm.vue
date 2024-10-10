<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import { email, required } from "@vuelidate/validators";
import { getApiErrors, getImageSrc } from '@/app/utils/helpers';
import { useAuthStore } from '@/stores/auth.store';
import { useCreditCardStore } from '@/stores/credit-card.store';
import { useI18n } from 'vue-i18n';
import { useToast } from 'primevue/usetoast';
import { useVuelidate } from "@vuelidate/core";

import type { AxiosError } from 'axios';
import type { CreditCardRequest } from '@/@types/credit-card.interface';
import gendersList from '@/assets/data/genders.json'

import FileUploader from '@/components/FileUploader.vue'
import NikkDatePicker from '@/components/forms/NikkDatePicker.vue';
import NikkInputText from '@/components/forms/NikkInputText.vue'
import NikkSelect from '@/components/forms/NikkSelect.vue';
import { useProfileStore } from '@/stores/profile.store';

const authStore = useAuthStore()
const emit = defineEmits(['close'])
const profileStore = useProfileStore()
const { t } = useI18n()
const toast = useToast()

const state = reactive({
  birthDate: '',
  email: '',
  firstName: '',
  gender: '',
  IDDocument: '',
  issuer: 'ORABANK',
  lastName: '',
  network: 'Visa',
  occupation: '',
  phone: '',
  type: 'Prepaid'
})

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

const idMessageSeverity = ref('warn')

const idImageSrc = computed(() => {
  return authStore.user?.IDDocument
})

const loading = ref(false)
const objStore = useCreditCardStore()

const rules = computed(() => ({
  birthDate: { required },
  email: { required, email },
  firstName: { required },
  gender: { required },
  issuer: { required },
  lastName: { required },
  network: { required },
  IDDocument: { required },
  occupation: { required },
  phone: { required },
  type: { required }
}));

const v$ = useVuelidate(rules, state, { $autoDirty: true });

onMounted(() => {
  fillData()
})

function canRequestCreditCard(): boolean {
  if (
    state.birthDate != ''
    && state.gender != ''
    && state.IDDocument != ''
    && state.occupation != ''
  ) {
    return true
  } else {
    return false
  }
}

function clearForm() {
  state.birthDate = ''
  state.email = ''
  state.firstName = ''
  state.gender = ''
  state.issuer = ''
  state.lastName = ''
  state.network = ''
  state.IDDocument = ''
  state.occupation = ''
  state.phone = ''
  state.type = ''
}

function fillData() {
  if (authStore.user) {
    state.birthDate = authStore.user.birthDate?.split('T')[0]
    state.email = authStore.user.email
    state.firstName = authStore.user.firstName
    state.gender = authStore.user.gender
    state.lastName = authStore.user.lastName
    state.IDDocument = authStore.user?.IDDocument as string
    state.occupation = authStore.user.occupation
    state.phone = authStore.user.phone
  }
}

async function submit() {
  loading.value = true
  try {
    const isFormCorrect = await v$.value.$validate();
    if (isFormCorrect) {
      if (canRequestCreditCard()) {
        const birthDate = new Date(`${formData.value.get('birthDate')}`).toISOString().split('T')[0]
        formData.value.set('birthDate', birthDate)
        await profileStore.updateProfileInfo(formData.value)
        await authStore.getAuthenticatedUser()
      }
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
      emit('close')
      clearForm()
    } else {
      if (state.IDDocument == '') {
        idMessageSeverity.value = 'error'
      }
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

    <div class="flex-row md:flex gap-6 overflow-y-auto min-h-fit">
      <div class="w-full md:w-96">
        <PrimeMessage class="mb-3" :severity="idMessageSeverity" icon="pi pi-info-circle">{{ $t('messages.idDocumentRequired') }}
        </PrimeMessage>
        <FileUploader :extImageSrc="getImageSrc(`${idImageSrc}`)"
          @file-selected="(event: File) => { state.IDDocument = event }" />
      </div>

      <div class="grow overflow-y-auto mt-8 md:mt-0">
        <section>
          <h3 class="text-xl mb-6 font-semibold">{{ $t('labels.personalInfoReview') }}</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 grow gap-8">
            <NikkInputText v-model="state.lastName" errorHelpLabel="errors.validation.requiredField" id="last-name"
              :isError="v$.lastName.$error" label="labels.lastName" type="text" />

            <NikkInputText v-model="state.firstName" errorHelpLabel="errors.validation.requiredField" id="first-name"
              :isError="v$.firstName.$error" label="labels.firstName" type="text" />

            <NikkDatePicker v-model="state.birthDate" dateFormat="dd-mm-yy"
              errorHelpLabel="errors.validation.requiredField" id="birth-date" :isError="v$.birthDate.$error"
              label="labels.birthDate" />

            <NikkSelect v-model="state.gender" errorHelpLabel="errors.validation.requiredField" id="gender"
              :isError="v$.gender.$error" :options=gendersList :placeholder="$t('labels.selectGender')"
              class="w-full" />

            <NikkInputText v-model="state.email" errorHelpLabel="errors.validation.email" id="email"
              :isError="v$.email.$error" label="labels.email" type="email" />


            <NikkInputText v-model="state.phone" errorHelpLabel="errors.validation.requiredField" id="phone"
              :isError="v$.phone.$error" label="labels.phone" type="tel" />

            <NikkInputText v-model="state.occupation" errorHelpLabel="errors.validation.requiredField" id="occupation"
              :isError="v$.occupation.$error" label="labels.occupation" type="text" />
          </div>
        </section>

        <section class="mt-12">
          <h3 class="text-xl mb-6 font-semibold">{{ $t('labels.bankInfo') }}</h3>
          <div class="flex justify-between md:justify-start md:gap-16">
            <div>
              <span class="block font-normal">{{ $t('labels.bank') }}</span>
              <span class="font-thin">{{ state.issuer }}</span>
            </div>

            <div>
              <span class="block font-normal">{{ $t('labels.cardNetwork') }}</span>
              <span class="font-thin">{{ state.network }}</span>
            </div>

            <div>
              <span class="block font-normal">{{ $t('labels.cardType') }}</span>
              <span class="font-thin">{{ state.type }}</span>
            </div>
          </div>
        </section>
        <footer class="absolute left-0 bottom-0 w-full">
          <div class="blur-box p-4 flex justify-between md:gap-4 border-t">
            <PrimeButton @click="$emit('close')" severity="danger" :label="$t('labels.cancel')" />
            <PrimeButton type="submit" :loading="loading" :label="$t('labels.addCard')" />
          </div>
        </footer>
      </div>
    </div>
  </form>
</template>

<style scoped>
.blur-box {
  /* background-color: rgba(255, 255, 255, 0.051); */
  -webkit-backdrop-filter: blur(5px);
  backdrop-filter: blur(5px);
}
</style>
