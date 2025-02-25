// 递归导入所有 .ts 文件，包括子目录
const modules = import.meta.glob('./**/*.ts', { eager: true });

const hooks: Record<string, any> = {};

Object.keys(modules).forEach((key) => {
  // 排除 index.ts 文件和 types.ts 类型定义文件
  if (key !== './index.ts' && !key.endsWith('/types.ts')) {
    Object.entries(modules[key] as Record<string, any>).forEach(([exportName, exportValue]) => {
      if (exportName !== 'default') {
        // 命名导出
        hooks[exportName] = exportValue;
      } else {
        // 默认导出 - 使用文件名作为导出名
        const fileName = key.split('/').pop()?.replace(/\.ts$/, '') || '';
        hooks[fileName] = exportValue;
      }
    });
  }
});
