<script setup lang="ts">
import type CreditCard from '@/app/domain/credit-card.model';

const props = defineProps<{
  isActive?: boolean
  data: CreditCard
}>()
</script>

<template>
  <div class="credit-card" :class="props.isActive ? 'active': ''">
    <span id="holder">{{ props.data.holder }}</span>
    <span id="amount">{{ props.data.amount }} F CFA</span>
    <div class="flex">
      <span class="inline-flex mr-auto">{{ props.data.number }}</span>
      <span class="mr-2" id="network">{{ props.data.network }}</span>
      <span id="issuer">{{ props.data.issuer }}</span>
    </div>
  </div>
</template>

<style scoped>
.credit-card {
  border: 1px dashed var(--p-gray-300);
  border-radius: 8px;
  cursor: pointer;
  padding: 0.5rem 1rem;
  max-width: 23rem;
  width: 100%;
  min-width: 20rem;
  transition: transform 0.3s ease;
}

.credit-card.active {
  border: 2px dashed var(--p-primary-color);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.credit-card:hover {
  transform: translateY(-5px);
}

.credit-card span {
  display: block
}

.credit-card div span {
  display: inline-flex
}

#amount {
  padding: 4rem 0 4rem;
  text-align: center;
  font-size: 1.8rem;
  font-weight: bold;
}
</style>