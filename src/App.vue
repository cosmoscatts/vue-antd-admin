<script setup lang="ts">
import { getPopupContainer } from '@/hooks/app';
import zhCN from 'ant-design-vue/es/locale/zh_CN';
</script>

<template>
  <a-config-provider
    :locale="zhCN"
    :get-popup-container="getPopupContainer"
  >
    <a-app class="container">
      <RouterView />
    </a-app>
  </a-config-provider>
</template>

<style scoped>
.container {
  height: 100%;
}
</style>
