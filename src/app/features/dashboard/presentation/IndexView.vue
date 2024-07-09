<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

import type { Ref } from 'vue'

import AppContent from '@/layouts/AppContent.vue'

const { t } = useI18n()

const breadcrumbItems: Ref<Array<Record<string, string>>> = ref([{ label: t('labels.dashboard') }])
</script>

<template>
  <AppContent :breadcrumbItems="breadcrumbItems">
    <template #header>
      <span class="font-light text-xl md:text-2xl text-gray-600">{{ $t('labels.dashboard') }}</span>
    </template>
  </AppContent>
</template>