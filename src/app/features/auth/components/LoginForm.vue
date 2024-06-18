<script setup lang="ts">
import NikInputText from '@/components/forms/NikInputText.vue'
</script>

<template>
  <form class="mt-8">
    <div class="field dbg-border">
      <NikInputText
        errorHelpLabel="errors.invalid.email"
        id="email"
        :isError="false"
        label="labels.email"
        type="email"
      />
    </div>

    <div class="field mt-16 border-1 border-solid border-primary-500">
      <NikInputText
        errorHelpLabel="errors.requiredField"
        id="password"
        :isError="false"
        label="labels.password"
        type="password"
      />
    </div>
    <div class="field mt-8">
      <PrimeInputText type="text" />
    </div>
  </form>
</template>
