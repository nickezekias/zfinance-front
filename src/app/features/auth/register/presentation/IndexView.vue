<script setup lang="ts">
import RegisterForm from '@/app/features/auth/components/RegisterForm.vue'
</script>

<template>
  <div class="flex flex-row h-screen">
    <section id="artwork" class="basis-full md:basis-1/2">
      <div id="artwork-overlay"></div>
    </section>

    <section class="basis-full md:basis-1/2 md:p-24 overflow-y-auto">
      <h1 class="text-right text-3xl md:text-5xl font-black">FINAPP</h1>

      <div class="mt-24 font-thin">
        <h2 class="text-2xl md:text-4xl uppercase">{{ $t('labels.register') }}</h2>
        <p class="text-secondary">{{ $t('features.register.pageDescription') }}</p>

        <RegisterForm class="mt-2" />
      </div>
    </section>
  </div>
</template>

<style scoped>
#artwork {
  position: relative;
  height: 100vh;
  background: center / cover no-repeat url('https://images.pexels.com/photos/6969937/pexels-photo-6969937.jpeg?auto=compress&cs=tinysrgb&w=600')
}

#artwork-overlay {
  display: block;
  position: absolute;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: var(--p-primary-color);
  opacity: 0.75;
  z-index: 10;
}
</style>