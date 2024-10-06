<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

import type { Ref } from 'vue'
import AppContent from '@/layouts/AppContent.vue'
import GeneralSettingsCard from './components/GeneralSettingsCard.vue';

const { t } = useI18n()

const breadcrumbItems: Ref<Array<Record<string, string>>> = ref([{ label: t('labels.profile') }])
</script>

<template>
<AppContent :breadcrumbItems="breadcrumbItems">
    <template #header-title>
      <span class="font-light text-xl md:text-2xl text-gray-600">{{ $t('labels.userProfile') }}</span>
    </template>

    <div class="flex">
      <GeneralSettingsCard class="w-full md:w-5/12 mt-8 shadow-none border mx-auto"/>
    </div>
    
  </AppContent>
</template>