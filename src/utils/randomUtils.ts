/**
 * 生成指定范围内的随机整数
 * @param min 最小值（包含）
 * @param max 最大值（包含）
 * @returns 随机整数
 */
export const randomInt = (min: number, max: number): number => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * 生成指定范围内的随机浮点数
 * @param min 最小值（包含）
 * @param max 最大值（不包含）
 * @param decimals 小数位数，默认为2
 * @returns 随机浮点数
 */
export const randomFloat = (min: number, max: number, decimals = 2): number => {
  const rand = Math.random() * (max - min) + min;
  const factor = 10 ** decimals;
  return Math.round(rand * factor) / factor;
};

/**
 * 从数组中随机选择一个元素
 * @param array 源数组
 * @returns 随机选中的元素
 */
export const randomItem = <T>(array: T[]): T => {
  if (!array.length)
    throw new Error('Cannot select from an empty array');
  return array[Math.floor(Math.random() * array.length)];
};

/**
 * 从数组中随机选择多个元素
 * @param array 源数组
 * @param count 选择数量
 * @returns 随机选中的元素数组
 */
export const randomItems = <T>(array: T[], count: number): T[] => {
  if (count <= 0)
    return [];
  if (count >= array.length)
    return [...array];

  const result: T[] = [];
  const copyArray = [...array];

  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * copyArray.length);
    result.push(copyArray[randomIndex]);
    copyArray.splice(randomIndex, 1);
  }

  return result;
};

/**
 * 生成随机布尔值
 * @param trueProbability 为true的概率，默认0.5
 * @returns 随机布尔值
 */
export const randomBoolean = (trueProbability = 0.5): boolean => {
  return Math.random() < trueProbability;
};

/**
 * 生成指定长度的随机字符串
 * @param length 字符串长度
 * @param chars 可选字符集，默认为字母和数字
 * @returns 随机字符串
 */
export const randomString = (
  length: number,
  chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
): string => {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

/**
 * 生成随机颜色十六进制代码
 * @returns 随机颜色代码，如 #FF5733
 */
export const randomColor = (): string => {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
};

/**
 * 生成随机UUID
 * @returns UUID字符串
 */
export const randomUUID = (): string => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  // 兼容性实现
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

/**
 * 生成随机IP地址
 * @returns IP地址字符串
 */
export const randomIP = (): string => {
  return `${randomInt(1, 255)}.${randomInt(0, 255)}.${randomInt(0, 255)}.${randomInt(1, 255)}`;
};

/**
 * 随机打乱数组
 * @param array 要打乱的数组
 * @returns 打乱后的新数组
 */
export const shuffle = <T>(array: T[]): T[] => {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
};

/**
 * 生成随机日期
 * @param start 开始日期
 * @param end 结束日期
 * @returns 随机日期对象
 */
export const randomDate = (start: Date = new Date(2000, 0, 1), end: Date = new Date()): Date => {
  const startTime = start.getTime();
  const endTime = end.getTime();
  const randomTime = startTime + Math.random() * (endTime - startTime);
  return new Date(randomTime);
};

/**
 * 生成随机手机号
 * @returns 随机手机号
 */
export const randomPhoneNumber = (): string => {
  const prefixes = ['134', '135', '136', '137', '138', '139', '150', '151', '152', '157', '158', '159', '182', '183', '184', '187', '188', '198'];
  const prefix = randomItem(prefixes);
  const suffix = randomString(8, '0123456789');
  return prefix + suffix;
};

/**
 * 生成随机中文姓名
 * @returns 随机中文姓名
 */
export const randomChineseName = (): string => {
  const surnames = '赵钱孙李周吴郑王冯陈褚卫蒋沈韩杨朱秦尤许何吕施张孔曹严华金魏陶姜戚谢邹喻水云苏潘葛奚范彭郎鲁韦昌马苗凤花方俞任袁柳酆鲍史唐费廉岑薛雷贺倪汤';
  const names = '伟刚勇毅俊峰强军平保东文辉力明永健世广志义兴良海山仁波宁贵福生龙元全国胜学祥才发武新利清飞彬富顺信子杰涛昌成康星光天达安岩中茂进林有坚和彪博诚先敬震振壮会思群豪心邦承乐绍功松善厚庆磊民友裕河哲江超浩亮政谦亨奇固之轮翰朗伯宏言若鸣朋斌梁栋维启克伦翔旭鹏泽晨辰士以建家致树炎德行时泰盛雄琛钧冠策腾楠榕风航弘';

  const surname = randomItem(surnames.split(''));
  const nameLength = randomBoolean(0.7) ? 1 : 2; // 70%概率是单字名
  let name = '';
  for (let i = 0; i < nameLength; i++) {
    name += randomItem(names.split(''));
  }

  return surname + name;
};
