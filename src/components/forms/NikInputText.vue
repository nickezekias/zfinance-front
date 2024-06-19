<script setup lang="ts">
const model = defineModel()
const props = defineProps<{
  id: string
  errorHelpLabel: string
  label: string
  type: string
  isError: boolean
}>()
</script>

<template>
  <PrimeFloatLabel>
    <PrimeInputText
      v-model="model"
      class="w-full p-3 border shadow-none"
      :class="props.isError ? 'p-invalid' : ''"
      :id="props.id"
      :type="type"
    />
    <label :for="props.id">{{ $t(`${props.label}`) }}</label>
    <small v-if="props.isError" :id="`${props.id}-help`" class="p-error">
      {{ $t(`${props.errorHelpLabel}`) }}
    </small>
  </PrimeFloatLabel>
</template>

<style scoped>
.p-inputtext:focus {
  border-color: var(--p-primary-color)
}
</style>