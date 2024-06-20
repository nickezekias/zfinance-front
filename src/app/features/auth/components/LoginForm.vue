<script setup lang="ts">
import NikInputText from '@/components/forms/NikInputText.vue'
</script>

<template>
  <form>
    <div class="field mt-10">
      <NikInputText
        errorHelpLabel="errors.invalid.email"
        id="email"
        :isError="false"
        label="labels.email"
        type="email"
      />
    </div>

    <div class="field mt-8">
      <NikInputText
        errorHelpLabel="errors.requiredField"
        id="password"
        :isError="false"
        label="labels.password"
        type="password"
      />
    </div>
    <div class="flex">
      <PrimeButton class="ml-auto mt-1 py-1 px-2 text-red-500" :label="$t('labels.forgotPassword')"/>
    </div>

    <div class="actions mt-8">
      <PrimeButton class="w-full p-3 bg-primary text-white" :label="$t('labels.login')"/>
      <PrimeButton text plain class="w-full p-3 text-primary mt-3" :label="$t('features.login.createNewAccount')"/>
    </div>
  </form>
</template>
