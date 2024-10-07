<script setup lang="ts">
import NotificationItem from './NotificationItem.vue';
</script>

<template>
  <ul class="notification-list">
    <slot>
      <NotificationItem v-for="i in 40" :key="i">
      </NotificationItem>
    </slot>
  </ul>
</template>

<style lang="css" scoped>
.notifications-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}
</style>