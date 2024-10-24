<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useCreditCardStore } from '@/stores/credit-card.store';
import { useI18n } from 'vue-i18n';

import type { Ref } from 'vue'

import AppContent from '@/layouts/AppContent.vue'
import Tabs from 'primevue/tabs'
import TabList from 'primevue/tablist'
import Tab from 'primevue/tab'
import TabPanels from 'primevue/tabpanels'

import CreditCardRequestIndexTabPanel from './cc-request/IndexTabPanel.vue'

const objStore = useCreditCardStore()
const { t } = useI18n()

const breadcrumbItems: Ref<Array<Record<string, string>>> = ref([{ label: t('labels.creditCard') }])

onMounted(async () => {
  // await objStore.getAllForUser()
  await objStore.getAllCardRequests()
})
</script>

<template>
  <AppContent :breadcrumbItems="breadcrumbItems">
    <template #header-title>
      <span class="font-light text-xl md:text-2xl text-gray-600">{{ $t('labels.creditCard', 2) }}</span>
    </template>

    <Tabs value="0" class="mt-4">
      <TabList>
        <Tab value="1">{{ $t('labels.creditCardRequest', 2) }}</Tab>
        <Tab value="0">{{ $t('labels.creditCard', 2) }}</Tab>
      </TabList>
      <TabPanels>
        <CreditCardRequestIndexTabPanel />
      </TabPanels>
    </Tabs>
  </AppContent>
</template>