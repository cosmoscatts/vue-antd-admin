<script setup lang="ts">
import type { RouteLocationNormalizedLoaded } from 'vue-router';
import { MoreOutlined } from '@ant-design/icons-vue';
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

// 定义标签页接口
interface TabItem {
  key: string // 标签唯一标识，通常是路由路径
  title: string // 标签显示的标题
  closable: boolean // 是否可关闭
  component?: string // 对应的组件名称
  meta?: any // 额外的元数据
}

// 路由相关
const router = useRouter();
const route = useRoute();

// 标签页状态管理
const tabs = ref<TabItem[]>([
  { key: '/dashboard', title: '仪表盘', closable: false },
]);
const activeTabKey = ref<string>('/dashboard');

// 获取当前标签对应的组件
const currentTabComponent = computed(() => {
  const tab = tabs.value.find(tab => tab.key === activeTabKey.value);
  return tab ? tab.component : null;
});

// 监听路由变化
watch(
  () => route.path,
  (newPath) => {
    handleRouteChange(route);
  },
  { immediate: true },
);

// 初始化
onMounted(() => {
  // 初始化时根据当前路由添加标签
  handleRouteChange(route);
});

// 处理路由变化
function handleRouteChange(route: RouteLocationNormalizedLoaded): void {
  const { name, meta, path } = route;
  const tabKey = path;

  // 检查标签是否已存在
  const isExist = tabs.value.some(tab => tab.key === tabKey);

  if (!isExist) {
    // 添加新标签
    tabs.value.push({
      key: tabKey,
      title: meta.title || (name as string),
      closable: true,
      component: route.matched[route.matched.length - 1].components?.default?.name,
      meta: { ...meta },
    });
  }

  // 激活当前标签
  activeTabKey.value = tabKey;
}

// 标签页编辑事件（关闭标签）
function onTabEdit(targetKey: string, action: 'add' | 'remove'): void {
  if (action === 'remove') {
    closeTab(targetKey);
  }
}

// 关闭标签
function closeTab(targetKey: string): void {
  // 找到要关闭的标签索引
  const targetIndex = tabs.value.findIndex(tab => tab.key === targetKey);

  // 如果关闭的是当前激活的标签，需要激活其他标签
  if (activeTabKey.value === targetKey) {
    // 优先激活右侧标签，如果没有则激活左侧标签
    if (targetIndex < tabs.value.length - 1) {
      activeTabKey.value = tabs.value[targetIndex + 1].key;
    } else {
      activeTabKey.value = tabs.value[targetIndex - 1].key;
    }

    // 跳转到新激活的标签对应的路由
    router.push(activeTabKey.value);
  }

  // 从数组中移除标签
  tabs.value = tabs.value.filter(tab => tab.key !== targetKey);
}

// 关闭其他标签页
function closeOtherTabs(): void {
  // 保留不可关闭的标签和当前激活的标签
  tabs.value = tabs.value.filter(
    tab => !tab.closable || tab.key === activeTabKey.value,
  );
}

// 刷新当前标签页
function refreshCurrentTab(): void {
  // 获取当前路由信息
  const currentPath = route.path;
  const currentQuery = route.query;

  // 方法1: 通过路由刷新
  router.replace({
    path: `/redirect${currentPath}`,
    query: currentQuery,
  });

  // 如果没有设置重定向路由，可以使用下面的方法
  // 方法2: 通过重新加载组件
  // const currentTab = tabs.value.find(tab => tab.key === activeTabKey.value);
  // if (currentTab) {
  //   currentTab.meta = { ...currentTab.meta, refresh: Date.now() };
  // }
}

// 监听标签激活变化
watch(activeTabKey, (newKey) => {
  // 当标签切换时，跳转到对应路由
  if (route.path !== newKey) {
    router.push(newKey);
  }
});
</script>

<template>
  <div class="bg-white border-b flex items-center h-40px px-18px">
    <!-- Tabs 组件容器，flex-1使其占据可用空间 -->
    <div class="flex-1 overflow-hidden">
      <a-tabs
        v-model:active-key="activeTabKey"
        :hide-add="true"
        @edit="onTabEdit"
      >
        <a-tab-pane
          v-for="tab in tabs"
          :key="tab.key"
          :tab="tab.title"
          :closable="tab.closable"
        />
      </a-tabs>
    </div>

    <!-- 右侧操作按钮 -->
    <div class="flex-shrink-0 flex items-center mr-2">
      <a-dropdown>
        <template #overlay>
          <a-menu>
            <a-menu-item @click="closeOtherTabs">
              关闭其他标签页
            </a-menu-item>
            <a-menu-item @click="refreshCurrentTab">
              刷新当前页面
            </a-menu-item>
          </a-menu>
        </template>
        <a-button type="text">
          <MoreOutlined />
        </a-button>
      </a-dropdown>
    </div>
  </div>
</template>
