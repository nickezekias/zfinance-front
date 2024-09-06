<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useTransactionStore } from '@/stores/transaction.store';

import type { Ref } from 'vue'

import AppContent from '@/layouts/AppContent.vue'
import IndexTable from './IndexTable.vue';
import NikkSelect from '@/components/forms/NikkSelect.vue';

const objStore = useTransactionStore()
const { t } = useI18n()

const breadcrumbItems: Ref<Array<Record<string, string>>> = ref([{ label: t('labels.transaction', 2) }])
const timePeriod = ref(`${t('labels.month')}`)
const timePeriods = ref([
  t('labels.month'),
  t('labels.year'),
])

onMounted(async () => {
  await objStore.getAllForUser()
})
</script>

<template>
  <AppContent :breadcrumbItems="breadcrumbItems">
    <template #header-title>
      <span class="font-light text-xl md:text-2xl text-gray-600">{{ $t('labels.transaction', 2) }}</span>
    </template>
    <template #header-end>
      <NikkSelect v-model="timePeriod" id="tp-filter" :options=timePeriods class="w-full" />
    </template>

    <IndexTable class="mt-6"/>
  </AppContent>
</template>
