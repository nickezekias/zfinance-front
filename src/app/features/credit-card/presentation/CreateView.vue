<script setup lang="ts">
import PrimeDrawer from 'primevue/drawer'

import CreditCardForm from '@/components/cc/CreditCardForm.vue'

defineEmits(['close'])
const model = defineModel()
</script>

<template>
  <PrimeDrawer v-model:visible="model" position="full" :dismissable="false">
    <template #container>
      <div class="p-4 md:p-8">
        <h3 class="text-xl md:text-2xl">{{ $t('labels.newCard') }}</h3>
        <CreditCardForm class="mt-12" @close="$emit('close')"/>
      </div>
    </template>
  </PrimeDrawer>
</template>