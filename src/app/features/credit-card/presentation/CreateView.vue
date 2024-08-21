<script setup lang="ts">
import { ref } from 'vue'
import PrimeDrawer from 'primevue/drawer'

import CreditCardRequestForm from '@/components/cc/CreditCardRequestForm.vue'

defineEmits(['close'])
const model = defineModel()
</script>

<template>
  <PrimeDrawer v-model:visible="model" position="full" :dismissable="false">
    <template #container>
      <div class="p-4 md:p-8 overflow-y-auto">
        <h3 class="text-xl md:text-3xl font-bold">{{ $t('labels.newCard') }}</h3>
        <CreditCardRequestForm class="mt-12 mb-16" @close="$emit('close')" />
      </div>
    </template>
  </PrimeDrawer>
</template>ß
