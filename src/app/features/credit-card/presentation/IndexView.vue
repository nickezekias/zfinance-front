<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import type { Ref } from 'vue'

import AppContent from '@/layouts/AppContent.vue'
import CreateView from './CreateView.vue'
import CreditCard from '@/components/cc/CreditCard.vue'
import CreditCardForm from '@/components/cc/CreditCardForm.vue'
import PrimeDivider from 'primevue/divider'
import { useCreditCardStore } from '@/stores/credit-card.store';

const { t } = useI18n()
const objStore = useCreditCardStore()

const breadcrumbItems: Ref<Array<Record<string, string>>> = ref([{ label: t('labels.creditCard') }])
const isCreateDialog = ref(false)

onMounted(async () => {
  await objStore.getAllForUser()
  console.log("OBJ", objStore.creditCards)
})

function showCreateDialog() {
  isCreateDialog.value = true
}
</script>

<template>
  <AppContent :breadcrumbItems="breadcrumbItems">
    <template #header-title>
      <span class="font-light text-xl md:text-2xl text-gray-600">{{ $t('labels.creditCard', 2) }}</span>
    </template>
    <template #header-end>
      <PrimeButton @click="showCreateDialog" class="ml-3" :label="$t('labels.newCard')" />
    </template>


    <div class="pt-6">
      <div class="flex-row md:flex">
        <div class="flex flex-col gap-3 items-center">
          <CreditCard v-for="obj in objStore.creditCards" :key="obj.id" :data="obj" :isActive="true" />
        </div>
        <div class="grow flex-row md:flex mt-8 md:mt-0">
          <PrimeDivider class="md:hidden" />
          <PrimeDivider class="hidden md:flex" layout="vertical" />
          <div class="grow pb-4">
            <h3 class="text-xl font-thin text-gray-400 mt-4 md:mt-0">{{ $t('labels.cardInformation') }}</h3>
            <CreditCardForm :readonly="true" class="mt-8" />
            <div class="flex justify-end mt-8">
              <PrimeButton text class="text-primary" :label="$t('labels.transferMoney')" />
              <PrimeButton text class="ml-3" :label="$t('labels.recharge')" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <CreateView v-model="isCreateDialog" @close="isCreateDialog = false"/>
  </AppContent>
</template>