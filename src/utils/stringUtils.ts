/**
 * 截取字符串并添加省略号
 */
export const truncate = (str: string, length: number): string => {
  return str.length > length ? `${str.substring(0, length)}...` : str;
};

/**
 * 转换为驼峰命名
 */
export const toCamelCase = (str: string): string => {
  return str
    .replace(/[-_\s]+(.)?/g, (_, c) => c ? c.toUpperCase() : '')
    .replace(/^(.)/, c => c.toLowerCase());
};

/**
 * 转换为帕斯卡命名
 */
export const toPascalCase = (str: string): string => {
  const camelCase = toCamelCase(str);
  return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
};

/**
 * 转换为下划线命名
 */
export const toSnakeCase = (str: string): string => {
  return str
    .replace(/([a-z])([A-Z])/g, '$1_$2')
    .replace(/\s+/g, '_')
    .toLowerCase();
};

/**
 * 转换为短横线命名
 */
export const toKebabCase = (str: string): string => {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/\s+/g, '-')
    .toLowerCase();
};

/**
 * 首字母大写
 */
export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * 检查字符串是否为有效URL
 */
export const isValidUrl = (str: string): boolean => {
  try {
    // eslint-disable-next-line no-new
    new URL(str);
    return true;
  } catch {
    return false;
  }
};

/**
 * 检查字符串是否为有效邮箱
 */
export const isValidEmail = (str: string): boolean => {
  return /^[^\s@]+@[^\s@][^\s.@]*\.[^\s@]+$/.test(str);
};
