import type { App } from 'vue';
import 'virtual:uno.css';

export const setupModules = (app: App, rootElement: string = '#app'): void => {
  const modules = import.meta.glob<ModuleInstaller>('@/modules/*.ts', { eager: true });

  Object.values(modules).forEach((module) => {
    if (typeof module.install === 'function') {
      module.install(app);
    }
  });

  app.mount(rootElement);
};
