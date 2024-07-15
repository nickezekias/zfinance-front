<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

import type { Ref } from 'vue'

import AppContent from '@/layouts/AppContent.vue'
import CreditCard from '@/components/cc/CreditCard.vue'
import CreditCardForm from '@/components/cc/CreditCardForm.vue'
import PrimeDivider from 'primevue/divider'

const { t } = useI18n()

const breadcrumbItems: Ref<Array<Record<string, string>>> = ref([{ label: t('labels.creditCard') }])
</script>

<template>
  <AppContent :breadcrumbItems="breadcrumbItems">
    <template #header-title>
      <span class="font-light text-xl md:text-2xl text-gray-600">{{ $t('labels.creditCard', 2) }}</span>
    </template>
    <template #header-end>
      <PrimeButton class="ml-3" :label="$t('labels.newCard')"/>
    </template>


    <div class="pt-6">
      <div class="flex-row md:flex">
        <div class="flex flex-col gap-3 items-center">
          <CreditCard :isActive="true" />
          <CreditCard />
        </div>
        <div class="grow flex-row md:flex mt-8 md:mt-0">
          <PrimeDivider class="md:hidden" />
          <PrimeDivider class="hidden md:flex" layout="vertical" />
          <div class="grow pb-4">
            <h3 class="text-xl font-thin text-gray-400 mt-4 md:mt-0">{{ $t('labels.cardInformation') }}</h3>
            <CreditCardForm :readonly="true" class="mt-8"/>
          </div>
        </div>
      </div>
    </div>
  </AppContent>
</template>