<script setup lang="ts">
import { getPopupContainer } from '@/hooks/app';
import zhCN from 'ant-design-vue/es/locale/zh_CN';
</script>

<template>
  <a-config-provider
    :locale="zhCN"
    :get-popup-container="getPopupContainer"
  >
    <a-app>
      <div h-300px w-300px border="1 red solid">
        1
      </div>
      <RouterView />
    </a-app>
  </a-config-provider>
</template>
