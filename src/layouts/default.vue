<script setup lang="ts">
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons-vue';
import TheTabs from './components/TheTabs.vue';

const selectedKeys = ref<string[]>(['1']);
const collapsed = ref<boolean>(false);

const menuItems = [
  { key: '1', icon: UserOutlined, title: 'nav 1' },
  { key: '2', icon: VideoCameraOutlined, title: 'nav 2' },
  { key: '3', icon: UploadOutlined, title: 'nav 3' },
];
</script>

<template>
  <a-layout h-full>
    <a-layout-sider
      v-model:collapsed="collapsed"
      :trigger="null"
      collapsible
      breakpoint="lg"
    >
      <div class="logo" h-32px mx-16px my-8px bg-white op-30 />
      <a-menu v-model:selected-keys="selectedKeys" theme="dark" mode="inline">
        <a-menu-item v-for="item in menuItems" :key="item.key">
          <component :is="item.icon" />
          <span>{{ item.title }}</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>

    <a-layout flex flex-col h-full>
      <a-layout-header
        :style="{
          background: '#fff',
          padding: 0,
          height: '48px',
          lineHeight: '48px',
          display: 'flex',
          alignItems: 'center',
          border: '1px solid rgb(240, 240, 240)',
        }"
      >
        <div
          px-24px text-lg cursor-pointer
          transition-colors duration-300
          hover:text-primary
          @click="collapsed = !collapsed"
        >
          <component :is="collapsed ? MenuUnfoldOutlined : MenuFoldOutlined" />
        </div>
      </a-layout-header>

      <TheTabs />

      <div flex-1 of-auto>
        <a-layout flex flex-col min-h-full of-auto p-24px pb-0>
          <a-layout-content flex-1>
            <RouterView />
          </a-layout-content>

          <a-layout-footer text-center>
            <p>
              Vue Antd Admin ©2025
            </p>
            <p>
              Created by Cosmoscatts
            </p>
          </a-layout-footer>
        </a-layout>
      </div>
    </a-layout>
  </a-layout>
</template>
