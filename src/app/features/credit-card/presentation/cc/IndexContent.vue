<script setup lang="ts">
import { computed } from 'vue';
import CreditCardComponent from '@/components/cc/CreditCardComponent.vue';
import CreditCardForm from '@/components/cc/CreditCardForm.vue'
import PrimeDivider from 'primevue/divider'
import { useCreditCardStore } from '@/stores/credit-card.store';

import type CreditCard from '@/app/domain/credit-card.model';
import type { Ref } from 'vue';

const objStore = useCreditCardStore()

const selectedCreditCard: Ref<CreditCard> = computed(() => objStore.creditCards[0])
</script>

<template>
  <div class="pt-6">
    <div v-if="objStore.creditCards.length > 0" class="flex-row md:flex">
      <div class="flex flex-col gap-3 items-center">
        <CreditCardComponent v-for="obj in objStore.creditCards" :key="obj.id" :data="obj" :isActive="true" />
      </div>
      <div class="grow flex-row md:flex mt-8 md:mt-0">
        <PrimeDivider class="md:hidden" />
        <PrimeDivider class="hidden md:flex" layout="vertical" />
        <div class="grow pb-4">
          <h3 class="text-xl font-thin text-gray-400 mt-4 md:mt-0">{{ $t('labels.cardInformation') }}</h3>
          <CreditCardForm :data="selectedCreditCard" :readonly="true" class="mt-8" />
          <div class="flex justify-end mt-8">
            <PrimeButton text class="text-primary" :label="$t('labels.transferMoney')" />
            <PrimeButton text class="ml-3" :label="$t('labels.recharge')" />
          </div>
        </div>
      </div>
    </div>

    <div v-else class="flex flex-col items-center p-6 md:p-10">
      <svg xmlns="http://www.w3.org/2000/svg" width="18rem" height="18rem" viewBox="0 0 24 24">
        <g fill="none" stroke="#d2cbcb" stroke-width="1.5">
          <path
            d="M2 12c0-3.771 0-5.657 1.172-6.828C4.343 4 6.229 4 10 4h4c3.771 0 5.657 0 6.828 1.172C22 6.343 22 8.229 22 12c0 3.771 0 5.657-1.172 6.828C19.657 20 17.771 20 14 20h-4c-3.771 0-5.657 0-6.828-1.172C2 17.657 2 15.771 2 12Z" />
          <path stroke-linecap="round" d="M10 16H6m8 0h-1.5M2 10h20" opacity="0.5" />
        </g>
      </svg>
      <p class="text-xl md:text-2xl text-gray-400">{{ $t('messages.noCreditCardsFound') }}</p>
      <span class="text-center text-gray-400 mt-4">Click on the 'new card' button above to request a new credit card or
        add existing one</span>
    </div>
  </div>
</template>