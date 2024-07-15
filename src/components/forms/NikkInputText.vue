<script setup lang="ts">
const model = defineModel()
const props = defineProps<{
  id: string
  disabled?: boolean
  errorHelpLabel: string
  label: string
  readonly?: boolean
  type: string
  isError: boolean
}>()
</script>

<template>
  <PrimeFloatLabel>
    <PrimeInputText
      v-model="model"
      class="w-full p-3 border shadow-none"
      :disabled="props.disabled"
      :invalid="props.isError"
      :id="props.id"
      :readonly="props.readonly"
      :type="type"
    />
    <label :class="props.isError ? 'nikk-invalid' : ''" :for="props.id">{{ $t(`${props.label}`) }}</label>
    <small v-if="props.isError" :id="`${props.id}-help`" class="nikk-invalid">
      {{ $t(`${props.errorHelpLabel}`) }}
    </small>
  </PrimeFloatLabel>
</template>

<style scoped>
.p-inputtext:focus {
  border-color: var(--p-primary-color)
}
.p-inputtext.p-invalid {
  border-color: var(--p-red-500)
}

</style>