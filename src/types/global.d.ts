import type { App } from 'vue';

declare global {
  interface ModuleInstaller {
    install?: (app: App) => void
  }
}
