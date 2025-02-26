import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/zh-cn';

// 加载插件
dayjs.extend(relativeTime);

// 设置语言环境
dayjs.locale('zh-cn');

/**
 * 格式化日期
 * @param date 日期
 * @param format 格式
 * @returns 格式化后的日期字符串
 */
export const formatDate = (date: string | number | Date, format = 'YYYY-MM-DD'): string => {
  return dayjs(date).format(format);
};

/**
 * 格式化日期时间
 * @param date 日期
 * @param format 格式
 * @returns 格式化后的日期时间字符串
 */
export const formatDateTime = (date: string | number | Date, format = 'YYYY-MM-DD HH:mm:ss'): string => {
  return dayjs(date).format(format);
};

/**
 * 获取相对时间
 * @param date 日期
 * @returns 相对时间字符串，如"几分钟前"
 */
export const fromNow = (date: string | number | Date): string => {
  return dayjs(date).fromNow();
};

/**
 * 计算两个日期之间的天数差
 * @param date1 日期1
 * @param date2 日期2
 * @returns 天数差
 */
export const diffDays = (date1: string | number | Date, date2: string | number | Date): number => {
  return dayjs(date1).diff(dayjs(date2), 'day');
};

/**
 * 判断日期是否是今天
 * @param date 日期
 * @returns 是否是今天
 */
export const isToday = (date: string | number | Date): boolean => {
  return dayjs(date).isSame(dayjs(), 'day');
};

/**
 * 添加时间
 * @param date 日期
 * @param amount 数量
 * @param unit 单位：day, month, year, hour, minute, second
 * @returns 新的日期
 */
export const addTime = (
  date: string | number | Date,
  amount: number,
  unit: 'day' | 'month' | 'year' | 'hour' | 'minute' | 'second',
): Date => {
  return dayjs(date).add(amount, unit).toDate();
};
