import { cloneDeep } from 'lodash-es';

/**
 * 深拷贝对象
 * 使用 lodash 的 cloneDeep 方法实现深拷贝，可以正确处理循环引用等复杂情况
 *
 * @param obj - 要拷贝的对象
 * @returns 拷贝后的新对象
 * @example
 * const original = { a: 1, b: { c: 2 } };
 * const copy = deepClone(original);
 * copy.b.c = 3; // 不会影响 original.b.c
 */
export const deepClone = <T>(obj: T): T => {
  return cloneDeep(obj);
};

/**
 * 安全获取嵌套对象属性
 * 避免因访问不存在的属性而导致的 "Cannot read property of undefined" 错误
 *
 * @param obj - 要获取属性的对象
 * @param path - 属性路径，使用点号分隔，如 "user.address.city"
 * @param defaultValue - 当路径不存在时返回的默认值
 * @returns 找到的属性值或默认值
 * @example
 * const user = { profile: { name: 'John' } };
 * const name = getNestedValue(user, 'profile.name'); // 'John'
 * const age = getNestedValue(user, 'profile.age', 18); // 18 (默认值)
 */
export const getNestedValue = <T>(obj: any, path: string, defaultValue?: T): T => {
  const keys = path.split('.');
  let result = obj;

  for (const key of keys) {
    if (result === undefined || result === null) {
      return defaultValue as T;
    }
    result = result[key];
  }

  return (result === undefined) ? defaultValue as T : result;
};

/**
 * 移除对象中的空值属性
 * 删除值为 null、undefined 或空字符串的属性
 *
 * @param obj - 要处理的对象
 * @returns 不包含空值的新对象
 * @example
 * const obj = { name: 'John', age: null, email: '' };
 * const cleaned = removeEmpty(obj); // { name: 'John' }
 */
export const removeEmpty = <T extends Record<string, any>>(obj: T): Partial<T> => {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    if (value !== null && value !== undefined && value !== '') {
      acc[key as keyof T] = value;
    }
    return acc;
  }, {} as Partial<T>);
};

/**
 * 对象扁平化
 * 将嵌套对象转换为单层对象，键名使用点号连接
 *
 * @param obj - 要扁平化的对象
 * @param prefix - 键名前缀（内部递归使用）
 * @returns 扁平化后的对象
 * @example
 * const obj = { user: { name: 'John', address: { city: 'New York' } } };
 * const flat = flattenObject(obj);
 * // { 'user.name': 'John', 'user.address.city': 'New York' }
 */
export const flattenObject = (obj: Record<string, any>, prefix = ''): Record<string, any> => {
  return Object.keys(obj).reduce((acc, key) => {
    const pre = prefix.length ? `${prefix}.` : '';

    if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
      Object.assign(acc, flattenObject(obj[key], `${pre}${key}`));
    } else {
      acc[`${pre}${key}`] = obj[key];
    }

    return acc;
  }, {} as Record<string, any>);
};

/**
 * 对象转查询字符串
 * 将对象转换为 URL 查询参数字符串
 *
 * @param params - 要转换的参数对象
 * @returns 格式化的查询字符串（不包含前导问号）
 * @example
 * const params = { name: 'John', age: 30 };
 * const query = toQueryString(params); // 'name=John&age=30'
 */
export const toQueryString = (params: Record<string, any>): string => {
  return Object.entries(params)
    .filter(([_, value]) => value !== undefined && value !== null)
    .map(([key, value]) => {
      if (typeof value === 'object') {
        return `${encodeURIComponent(key)}=${encodeURIComponent(JSON.stringify(value))}`;
      }
      return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
    })
    .join('&');
};

/**
 * 查询字符串转对象
 * 将 URL 查询参数字符串转换为对象
 *
 * @param queryString - 要解析的查询字符串，可以包含或不包含前导问号
 * @returns 解析后的参数对象
 * @example
 * const query = '?name=John&age=30';
 * const params = parseQueryString(query); // { name: 'John', age: '30' }
 */
export const parseQueryString = (queryString: string): Record<string, string> => {
  if (!queryString || !queryString.trim())
    return {};

  const query = queryString.startsWith('?')
    ? queryString.substring(1)
    : queryString;

  return query.split('&').reduce((params, param) => {
    const [key, value] = param.split('=');
    if (key)
      params[decodeURIComponent(key)] = decodeURIComponent(value || '');
    return params;
  }, {} as Record<string, string>);
};

/**
 * 合并对象
 * 深度合并多个对象，后面的对象属性会覆盖前面的
 *
 * @param objects - 要合并的对象列表
 * @returns 合并后的新对象
 * @example
 * const obj1 = { a: 1, b: { c: 2 } };
 * const obj2 = { b: { d: 3 }, e: 4 };
 * const merged = mergeObjects(obj1, obj2);
 * // { a: 1, b: { c: 2, d: 3 }, e: 4 }
 */
export const mergeObjects = <T extends Record<string, any>>(...objects: T[]): T => {
  return objects.reduce((result, current) => {
    Object.keys(current).forEach((key) => {
      const currentValue = current[key];
      const resultValue = result[key as keyof typeof result];

      // 如果两个值都是对象且不是数组，则递归合并
      if (
        isObject(resultValue)
        && isObject(currentValue)
        && !Array.isArray(resultValue)
        && !Array.isArray(currentValue)
      ) {
        (result as any)[key] = mergeObjects(
          resultValue as Record<string, any>,
          currentValue as Record<string, any>,
        );
      } else {
        // 否则直接覆盖
        (result as any)[key] = currentValue;
      }
    });

    return result;
  }, {} as T);
};

/**
 * 判断值是否为对象
 *
 * @param value - 要检查的值
 * @returns 是否为对象
 */
const isObject = (value: any): boolean => {
  return value !== null && typeof value === 'object';
};

/**
 * 选择对象的指定属性
 *
 * @param obj - 源对象
 * @param keys - 要选择的属性名数组
 * @returns 包含选定属性的新对象
 * @example
 * const user = { name: 'John', age: 30, email: 'john@example.com' };
 * const picked = pick(user, ['name', 'email']); // { name: 'John', email: 'john@example.com' }
 */
export const pick = <T extends Record<string, any>, K extends keyof T>(
  obj: T,
  keys: K[],
): Pick<T, K> => {
  return keys.reduce((result, key) => {
    if (key in obj) {
      result[key] = obj[key];
    }
    return result;
  }, {} as Pick<T, K>);
};

/**
 * 排除对象的指定属性
 *
 * @param obj - 源对象
 * @param keys - 要排除的属性名数组
 * @returns 不包含指定属性的新对象
 * @example
 * const user = { name: 'John', age: 30, password: '123456' };
 * const safe = omit(user, ['password']); // { name: 'John', age: 30 }
 */
export const omit = <T extends Record<string, any>, K extends keyof T>(
  obj: T,
  keys: K[],
): Omit<T, K> => {
  return Object.entries(obj).reduce((result, [key, value]) => {
    if (!keys.includes(key as K)) {
      result[key as keyof Omit<T, K>] = value;
    }
    return result;
  }, {} as Omit<T, K>);
};
