import type { RouteRecordRaw } from 'vue-router';

const modules = import.meta.glob<{ default: RouteRecordRaw | RouteRecordRaw[] }>('./modules/*.ts', { eager: true });

/**
 * 格式化路由模块，将所有模块中的路由合并到一个数组中
 * 并确保 NotFound 路由总是在最后
 *
 * @param moduleFiles - 导入的模块文件
 * @returns 格式化后的路由数组
 */
const formatRoutes = (moduleFiles: Record<string, { default: RouteRecordRaw | RouteRecordRaw[] }>): RouteRecordRaw[] => {
  const routes: RouteRecordRaw[] = [];

  Object.values(moduleFiles).forEach((module) => {
    const moduleRoutes = module.default;
    if (!moduleRoutes)
      return;

    if (Array.isArray(moduleRoutes)) {
      routes.push(...moduleRoutes);
    } else {
      routes.push(moduleRoutes);
    }
  });

  const notFoundRouteIndex = routes.findIndex(route => route.name === 'NotFound');

  if (notFoundRouteIndex === -1)
    return routes;

  const notFoundRoute = routes[notFoundRouteIndex];
  const filteredRoutes = routes.filter(route => route.name !== 'NotFound');

  return [...filteredRoutes, notFoundRoute];
};

const appRoutes: RouteRecordRaw[] = formatRoutes(modules);

export default appRoutes;
