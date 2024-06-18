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
  <PrimeFloatLabel class="border-1 border-solid border-primary">
    <PrimeInputText
      v-model="model"
      class="w-full py-2 border-1 border-solid border-surface-100 focus:border-primary"
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