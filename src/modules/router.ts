import type { App } from 'vue';
import router from '@/router';
import { createRouterScroller } from 'vue-router-better-scroller';

export const install = ({ use }: App) => {
  use(router);
  use(createRouterScroller({
    selectors: {
      'window': true,
      '.scrollable': true,
    },
    behavior: 'smooth',
  }));
};
