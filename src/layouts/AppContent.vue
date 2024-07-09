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
    <slot name="header"></slot>
    <PrimeBreadcrumb :home="home" :model="props.breadcrumbItems" class="p-0 m-0 text-sm" />
    <slot></slot>
  </div>
</template>