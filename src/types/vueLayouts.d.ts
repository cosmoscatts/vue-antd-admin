declare module 'virtual:generated-layouts' {
  import type { RouteRecordRaw } from 'vue-router';
  import { DefineComponent } from 'vue';

  export function setupLayouts(routes: RouteRecordRaw[]): RouteRecordRaw[];

  export interface LayoutMeta {
    layout?: string
  }
}
