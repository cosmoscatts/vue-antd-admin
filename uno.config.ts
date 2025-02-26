import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetWind3,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss';

export default defineConfig({
  presets: [
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      extraProperties: {
        'color': 'inherit',
        'min-width': '1.2em',
      },
    }),
    presetWind3(),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
  theme: {
    colors: {
      // 品牌色
      'primary': '#1890ff',
      'primary-hover': '#40a9ff',
      'primary-active': '#096dd9',
      'primary-outline': 'rgba(24, 144, 255, 0.2)',
      'primary-1': '#e6f7ff',
      'primary-2': '#bae7ff',
      'primary-3': '#91d5ff',
      'primary-4': '#69c0ff',
      'primary-5': '#40a9ff',
      'primary-6': '#1890ff',
      'primary-7': '#096dd9',
      'primary-8': '#0050b3',
      'primary-9': '#003a8c',
      'primary-10': '#002766',

      // 成功色
      'success': '#52c41a',
      'success-hover': '#73d13d',
      'success-active': '#389e0d',

      // 警告色
      'warning': '#faad14',
      'warning-hover': '#ffc53d',
      'warning-active': '#d48806',

      // 错误色
      'error': '#ff4d4f',
      'error-hover': '#ff7875',
      'error-active': '#d9363e',

      // 信息色
      'info': '#1890ff',

      // 中性色
      'text': 'rgba(0, 0, 0, 0.85)',
      'text-secondary': 'rgba(0, 0, 0, 0.45)',
      'border': 'rgb(240, 240, 240)',
      'disabled': 'rgba(0, 0, 0, 0.25)',
      'disabled-bg': '#f5f5f5',
    },
  },
  shortcuts: {
    // 基础边框
    'border-base': 'border border-solid border-border',
    'border-primary': 'border border-solid border-primary',
    'border-success': 'border border-solid border-success',
    'border-warning': 'border border-solid border-warning',
    'border-error': 'border border-solid border-error',

    // 背景卡片
    'bg-card': 'bg-white shadow-sm rounded-lg',
    'bg-card-hover': 'bg-white shadow-sm hover:shadow rounded-lg transition-all duration-300',
    'bg-card-primary': 'bg-primary-1 rounded-lg',
    'bg-card-success': 'bg-success-1 rounded-lg',
    'bg-card-warning': 'bg-warning-1 rounded-lg',
    'bg-card-error': 'bg-error-1 rounded-lg',

    // 文本样式
    'text-base': 'text-text text-base',
    'text-secondary': 'text-text-secondary text-sm',
    'text-primary': 'text-primary cursor-pointer hover:underline',
    'text-success': 'text-success',
    'text-warning': 'text-warning',
    'text-error': 'text-error',
    'text-disabled': 'text-disabled cursor-not-allowed',

    // 布局辅助
    'flex-center': 'flex items-center justify-center',
    'flex-between': 'flex items-center justify-between',
  },
});
