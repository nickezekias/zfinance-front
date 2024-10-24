<script setup lang="ts">
import { useCreditCardStore } from '@/stores/credit-card.store';

import Column from 'primevue/column'
import DataTable from 'primevue/datatable'
import Tag from 'primevue/tag'

const objStore = useCreditCardStore()

function getSeverity(status: string) {
  switch(`${status}`) {
    case '0':
      return 'warn'
    case '1':
      return 'info'
    case '2':
      return 'error'
    case '3': 
      return 'success'
    default: 
      return null
  }
}
</script>

<template>
  <DataTable :value="objStore.creditCardRequests">
    <Column field="user" :header="$t('labels.user')"></Column>
    <Column field="cardIssuer" :header="$t('labels.cardIssuer')"></Column>
    <Column field="cardNetwork" :header="$t('labels.cardNetwork')"></Column>
    <Column field="cardType" :header="$t('labels.cardType')"></Column>
    <Column field="createdAt" :header="$t('labels.date')"></Column>
    <Column :header="$t('labels.validationStatus')">
      <template #body="slotProps">
        <Tag :value="$t(`features.cc.validationStatuses.${slotProps.data.validationStatus}`)" :severity="getSeverity(slotProps.data.validationStatus)" />
      </template>
    </Column>
    <template #empty>
      <div class="text-center font-thin">{{ $t('messages.noDataFound') }}</div>
    </template>
  </DataTable>
</template>