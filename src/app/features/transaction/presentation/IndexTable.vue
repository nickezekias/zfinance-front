<script setup lang="ts">
import { useTransactionStore as useObjStore } from '@/stores/transaction.store'
import Obj from '@/app/domain/transaction.model'

import Column from 'primevue/column'
import DataTable from 'primevue/datatable'
import Tag from 'primevue/tag'

const objStore = useObjStore()

function getSeverity(status: string) {
  switch (`${status}`) {
    case `${Obj.STATUS_CANCELED}`:
      return 'danger'
    case `${Obj.STATUS_COMPLETED}`:
      return 'success'
    case `${Obj.STATUS_IN_PROGRESS}`:
      return 'warn'
    default:
      return null
  }
}
</script>

<template>
  <DataTable :value="objStore.transactions">
    <Column field="description" :header="$t('labels.description')">
      <template #body="slotProps">
        {{ $t(`${slotProps.data.description}`) }}
      </template>
    </Column>
    <Column field="amount" :header="$t('labels.amount')">
      <template #body="slotProps">
        <span v-if="slotProps.data.type == Obj.TRANS_TYPE_ENTRY" class="text-green-500">+ {{ slotProps.data.amount }}</span>
        <span v-else class="text-red-500">- {{ slotProps.data.amount }}</span>
      </template>
    </Column>
    <Column field="date" :header="$t('labels.date')"></Column>
    <Column field="beneficiary" :header="$t('labels.beneficiary')"></Column>
    <!-- <Column field="type" :header="$t('labels.type')"></Column> -->
    <Column :header="$t('labels.status')">
      <template #body="slotProps">
        <Tag :value="$t(`features.transaction.statuses.${slotProps.data.status}`)"
          :severity="getSeverity(slotProps.data.status)" />
      </template>
    </Column>
    <template #empty>
      <div class="text-center font-thin">{{ $t('messages.noDataFound') }}</div>
    </template>
  </DataTable>
</template>
