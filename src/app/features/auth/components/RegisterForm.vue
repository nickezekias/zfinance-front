<script setup lang="ts">
import NikInputText from '@/components/forms/NikInputText.vue'
</script>

<template>
  <form>
    <div class="field mt-10">
      <NikInputText
        errorHelpLabel="errors.requiredField"
        id="last-name"
        :isError="false"
        label="labels.lastName"
        type="text"
      />
    </div>

    <div class="field mt-10">
      <NikInputText
        errorHelpLabel="errors.requiredField"
        id="first-name"
        :isError="false"
        label="labels.firstName"
        type="text"
      />
    </div>

    <div class="field mt-10">
      <NikInputText
        errorHelpLabel="errors.invalid.email"
        id="email"
        :isError="false"
        label="labels.email"
        type="email"
      />
    </div>

    <div class="field mt-10">
      <NikInputText
        errorHelpLabel="errors.requiredField"
        id="tel"
        :isError="false"
        label="labels.tel"
        type="tel"
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

    <div class="field mt-8">
      <NikInputText
        errorHelpLabel="errors.requiredField"
        id="password-confirmation"
        :isError="false"
        label="labels.confirmPassword"
        type="password"
      />
    </div>

    <div class="actions mt-8">
      <PrimeButton class="w-full p-3 bg-primary text-white" :label="$t('labels.register')"/>
      <PrimeButton text plain class="w-full p-3 text-primary mt-3" :label="$t('features.register.loginExistingAccount')"/>
    </div>
  </form>
</template>