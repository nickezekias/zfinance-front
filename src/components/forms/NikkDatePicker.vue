<script setup lang="ts">
import PrimeDatePicker from 'primevue/datepicker'

const model = defineModel()
const props = defineProps<{
  id: string
  dateFormat?: string
  disabled?: boolean
  errorHelpLabel: string
  isError: boolean
  label: string
  manualInput?: boolean
  maxDate?: string
  minDate?: string
  readonly?: boolean
  selectionMode?: string
  showButtonBar?: boolean
}>()
</script>

<template>
  <PrimeFloatLabel>
    <PrimeDatePicker
      v-model="model"
      class="w-full shadow-none"
      :dateFormat="props.dateFormat" 
      :disabled="props.disabled"
      :invalid="props.isError"
      :id="props.id"
      :manualInput="props.manualInput"
      :maxDate="props.maxDate"
      :minDate="props.minDate"
      :readonly="props.readonly"
      :selectionMode="props.selectionMode"
      :showButtonBar="props.showButtonBar"
    />
    <label :class="props.isError ? 'nikk-invalid' : ''" :for="props.id">{{ $t(`${props.label}`) }}</label>
    <small v-if="props.isError" :id="`${props.id}-help`" class="nikk-invalid">
      {{ $t(`${props.errorHelpLabel}`) }}
    </small>
  </PrimeFloatLabel>
</template>
