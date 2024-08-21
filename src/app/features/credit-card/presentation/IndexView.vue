<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useCreditCardStore } from '@/stores/credit-card.store';
import { useI18n } from 'vue-i18n';

import type { Ref } from 'vue'

import AppContent from '@/layouts/AppContent.vue'
import CreditCardIndexContent from './cc/IndexContent.vue';
import CreditCardIndexTabPanel from './cc/IndexTabPanel.vue';
import CreditCardRequestIndexTabPanel from './cc-request/IndexTabPanel.vue';
import CreateView from './CreateView.vue'

import Tabs from 'primevue/tabs'
import TabList from 'primevue/tablist'
import Tab from 'primevue/tab'
import TabPanels from 'primevue/tabpanels'

const { t } = useI18n()

const breadcrumbItems: Ref<Array<Record<string, string>>> = ref([{ label: t('labels.creditCard') }])
const isCreateDialog = ref(false)
const objStore = useCreditCardStore()

function showCreateDialog() {
  isCreateDialog.value = true
}

onMounted(async () => {
  await objStore.getAllForUser()
  await objStore.getAllCardRequestsForUser()
})
</script>

<template>
  <AppContent :breadcrumbItems="breadcrumbItems">
    <template #header-title>
      <span class="font-light text-xl md:text-2xl text-gray-600">{{ $t('labels.creditCard', 2) }}</span>
    </template>
    <template #header-end>
      <PrimeButton @click="showCreateDialog" class="ml-3" :label="$t('labels.newCard')" />
    </template>

    <Tabs v-if="objStore.creditCardRequests.length > 0" value="0" class="mt-4">
      <TabList>
        <Tab value="0">{{ $t('labels.creditCard', 2) }}</Tab>
        <Tab value="1">{{ $t('labels.creditCardRequest', 2) }}</Tab>
      </TabList>
      <TabPanels>
        <CreditCardIndexTabPanel />
        <CreditCardRequestIndexTabPanel />
      </TabPanels>
    </Tabs>

    <CreditCardIndexContent v-else />

    <CreateView v-model="isCreateDialog" @close="isCreateDialog = false" />
  </AppContent>
</template>