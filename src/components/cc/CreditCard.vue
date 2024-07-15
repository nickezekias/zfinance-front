<script setup lang="ts">
const props = defineProps<{
  isActive?: boolean
}>()
</script>

<template>
  <div class="credit-card" :class="props.isActive ? 'active': ''">
    <span id="holder">Jean Marie Lepenn</span>
    <span id="amount">3 900 000 F CFA</span>
    <div class="flex">
      <span class="inline-flex mr-auto">8484 9284 0128 8910</span>
      <span class="mr-2" id="network">VISA</span>
      <span id="issuer">UBA</span>
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