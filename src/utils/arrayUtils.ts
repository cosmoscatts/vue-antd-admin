/**
 * 数组去重
 * 移除数组中的重复元素，返回一个新数组
 *
 * @param arr - 要去重的数组
 * @returns 去重后的新数组
 * @example
 * unique([1, 2, 2, 3, 1]); // [1, 2, 3]
 */
export const unique = <T>(arr: T[]): T[] => {
  return [...new Set(arr)];
};

/**
 * 数组分组
 * 根据指定的键将数组元素分组
 *
 * @param arr - 要分组的数组
 * @param key - 分组依据的键
 * @returns 分组后的对象，键为分组值，值为分组元素数组
 * @example
 * const users = [
 *   { id: 1, role: 'admin' },
 *   { id: 2, role: 'user' },
 *   { id: 3, role: 'admin' }
 * ];
 * groupBy(users, 'role');
 * // { admin: [{ id: 1, role: 'admin' }, { id: 3, role: 'admin' }], user: [{ id: 2, role: 'user' }] }
 */
export const groupBy = <T>(arr: T[], key: keyof T): Record<string, T[]> => {
  return arr.reduce((groups, item) => {
    const groupKey = String(item[key]);
    groups[groupKey] = groups[groupKey] || [];
    groups[groupKey].push(item);
    return groups;
  }, {} as Record<string, T[]>);
};

/**
 * 数组转树形结构
 * 将扁平数组转换为嵌套的树形结构，支持多层嵌套
 *
 * @param items - 要转换的扁平数组
 * @param options - 配置选项
 * @param options.idKey - ID字段名，默认为 'id'
 * @param options.parentIdKey - 父ID字段名，默认为 'parentId'
 * @param options.childrenKey - 子节点字段名，默认为 'children'
 * @param options.rootId - 根节点的父ID值，默认为 null
 * @returns 树形结构数组
 * @example
 * const items = [
 *   { id: 1, parentId: null, name: '部门1' },
 *   { id: 2, parentId: 1, name: '部门1-1' },
 *   { id: 3, parentId: 2, name: '部门1-1-1' }
 * ];
 * const tree = arrayToTree(items);
 * // 结果: [{id: 1, parentId: null, name: '部门1', children: [{id: 2, parentId: 1, name: '部门1-1', children: [{id: 3, parentId: 2, name: '部门1-1-1'}]}]}]
 */
export const arrayToTree = <
  T extends Record<string, any>,
  K extends keyof T = 'id',
  P extends keyof T = 'parentId',
  C extends string = 'children',
>(
  items: T[],
  options?: {
    idKey?: K
    parentIdKey?: P
    childrenKey?: C
    rootId?: T[P] | null
  },
): (T & { [key in C]?: Array<T & { [key in C]?: any[] }> })[] => {
  const {
    idKey = 'id' as unknown as K,
    parentIdKey = 'parentId' as unknown as P,
    childrenKey = 'children' as C,
    rootId = null,
  } = options || {};

  // 创建一个映射表，用于快速查找
  const itemMap = new Map<any, T & { [key in C]?: Array<T & { [key in C]?: any[] }> }>();

  // 深拷贝每个项并添加到映射表
  const itemsCopy = items.map(item => ({ ...item }));
  itemsCopy.forEach((item) => {
    itemMap.set(item[idKey], item);
  });

  const result: (T & { [key in C]?: Array<T & { [key in C]?: any[] }> })[] = [];

  // 构建树结构
  itemsCopy.forEach((item) => {
    const parentId = item[parentIdKey];

    if (parentId === rootId) {
      // 根节点直接加入结果数组
      result.push(item);
    } else {
      // 非根节点，找到父节点并添加到其子节点列表中
      const parentItem = itemMap.get(parentId);
      if (parentItem) {
        if (!parentItem[childrenKey]) {
          parentItem[childrenKey] = [] as any;
        }
        (parentItem[childrenKey] as any).push(item);
      }
    }
  });

  return result;
};

/**
 * 树形结构转数组
 * 将嵌套的树形结构扁平化为一维数组
 *
 * @param tree - 要扁平化的树形结构
 * @param childrenKey - 子节点字段名，默认为 'children'
 * @returns 扁平化后的数组
 * @example
 * const tree = [{
 *   id: 1,
 *   name: '部门1',
 *   children: [{
 *     id: 2,
 *     name: '部门1-1',
 *     children: [{ id: 3, name: '部门1-1-1' }]
 *   }]
 * }];
 * const array = treeToArray(tree);
 * // [{ id: 1, name: '部门1' }, { id: 2, name: '部门1-1' }, { id: 3, name: '部门1-1-1' }]
 */
export const treeToArray = <T extends Record<string, any>, K extends string = 'children'>(
  tree: T[],
  childrenKey: K = 'children' as unknown as K,
): Omit<T, K>[] => {
  const result: Omit<T, K>[] = [];

  const flatten = (items: T[]) => {
    for (const item of items) {
      const { [childrenKey]: children, ...rest } = item;
      result.push(rest as Omit<T, K>);
      if (children && Array.isArray(children)) {
        flatten(children as T[]);
      }
    }
  };

  flatten(tree);
  return result;
};

/**
 * 数组交集
 * 返回两个数组中共同存在的元素
 *
 * @param arr1 - 第一个数组
 * @param arr2 - 第二个数组
 * @returns 包含共同元素的新数组
 * @example
 * intersection([1, 2, 3], [2, 3, 4]); // [2, 3]
 */
export const intersection = <T>(arr1: T[], arr2: T[]): T[] => {
  return arr1.filter(item => arr2.includes(item));
};

/**
 * 数组差集
 * 返回存在于第一个数组但不存在于第二个数组的元素
 *
 * @param arr1 - 第一个数组
 * @param arr2 - 第二个数组
 * @returns 差集数组
 * @example
 * difference([1, 2, 3], [2, 3, 4]); // [1]
 */
export const difference = <T>(arr1: T[], arr2: T[]): T[] => {
  return arr1.filter(item => !arr2.includes(item));
};

/**
 * 数组分块
 * 将数组分割成指定大小的小数组
 *
 * @param arr - 要分块的数组
 * @param size - 每个块的大小
 * @returns 分块后的二维数组
 * @example
 * chunk([1, 2, 3, 4, 5], 2); // [[1, 2], [3, 4], [5]]
 */
export const chunk = <T>(arr: T[], size: number): T[][] => {
  return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size));
};

/**
 * 数组洗牌
 * 随机打乱数组元素顺序
 *
 * @param arr - 要打乱的数组
 * @returns 打乱后的新数组
 * @example
 * shuffle([1, 2, 3, 4, 5]); // [3, 1, 5, 2, 4] (随机结果)
 */
export const shuffle = <T>(arr: T[]): T[] => {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
};

/**
 * 数组求和
 * 计算数组中所有数字的总和
 *
 * @param arr - 数字数组
 * @returns 总和
 * @example
 * sum([1, 2, 3, 4]); // 10
 */
export const sum = (arr: number[]): number => {
  return arr.reduce((total, num) => total + num, 0);
};

/**
 * 数组平均值
 * 计算数组中所有数字的平均值
 *
 * @param arr - 数字数组
 * @returns 平均值，如果数组为空则返回 0
 * @example
 * average([1, 2, 3, 4]); // 2.5
 */
export const average = (arr: number[]): number => {
  if (arr.length === 0)
    return 0;
  return sum(arr) / arr.length;
};

/**
 * 数组最大值
 * 获取数组中的最大值
 *
 * @param arr - 数字数组
 * @returns 最大值，如果数组为空则返回 undefined
 * @example
 * max([1, 5, 3, 9, 2]); // 9
 */
export const max = (arr: number[]): number | undefined => {
  return arr.length ? Math.max(...arr) : undefined;
};

/**
 * 数组最小值
 * 获取数组中的最小值
 *
 * @param arr - 数字数组
 * @returns 最小值，如果数组为空则返回 undefined
 * @example
 * min([1, 5, 3, 9, 2]); // 1
 */
export const min = (arr: number[]): number | undefined => {
  return arr.length ? Math.min(...arr) : undefined;
};

/**
 * 数组并集
 * 合并两个数组并去除重复元素
 *
 * @param arr1 - 第一个数组
 * @param arr2 - 第二个数组
 * @returns 并集数组
 * @example
 * union([1, 2, 3], [2, 3, 4]); // [1, 2, 3, 4]
 */
export const union = <T>(arr1: T[], arr2: T[]): T[] => {
  return unique([...arr1, ...arr2]);
};

/**
 * 数组对象排序
 * 根据对象的属性对数组进行排序
 *
 * @param arr - 要排序的对象数组
 * @param key - 排序依据的属性名
 * @param order - 排序顺序，'asc' 为升序，'desc' 为降序，默认为 'asc'
 * @returns 排序后的新数组
 * @example
 * const users = [{ name: 'Bob', age: 30 }, { name: 'Alice', age: 25 }];
 * sortBy(users, 'age'); // [{ name: 'Alice', age: 25 }, { name: 'Bob', age: 30 }]
 * sortBy(users, 'age', 'desc'); // [{ name: 'Bob', age: 30 }, { name: 'Alice', age: 25 }]
 */
export const sortBy = <T extends Record<string, any>>(
  arr: T[],
  key: keyof T,
  order: 'asc' | 'desc' = 'asc',
): T[] => {
  const multiplier = order === 'desc' ? -1 : 1;
  return [...arr].sort((a, b) => {
    if (a[key] < b[key])
      return -1 * multiplier;
    if (a[key] > b[key])
      return 1 * multiplier;
    return 0;
  });
};
