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
      :invalid="props.isError"
      :id="props.id"
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