<script setup lang="ts">
import { ref } from 'vue'

import PrimeBreadcrumb from 'primevue/breadcrumb'

const props = defineProps<{
  breadcrumbItems: Array<Record<string, string>>
}>()

const home = ref({
  icon: 'pi pi-home'
})
</script>

<template>
  <div class="w-full">
    <div class="flex">
      <div>
        <slot name="header-title"></slot>
        <PrimeBreadcrumb :home="home" :model="props.breadcrumbItems" class="p-0 m-0 text-sm" />
      </div>
      <div class="flex items-center ml-auto">
        <slot name="header-end" class="h-fit"></slot>
      </div>
    </div>
    <slot></slot>
  </div>
</template>
