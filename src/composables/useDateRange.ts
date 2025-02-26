interface DateRangeFieldNames {
  startField: string
  endField: string
}

/**
 * 日期范围选择器
 * @param form 表单对象
 * @param fieldNames 字段名配置
 * @returns 日期范围相关的状态和方法
 */
export const useDateRange = <T extends Record<string, any>>(
  form: T,
  fieldNames: DateRangeFieldNames = {
    startField: 'startDate',
    endField: 'endDate',
  },
) => {
  const dateRange: Ref<[string, string] | []> = ref([]);

  watch(dateRange, (newValue) => {
    if (newValue) {
      form[fieldNames.startField as keyof T] = newValue[0] as any;
      form[fieldNames.endField as keyof T] = newValue[1] as any;
    } else {
      form[fieldNames.startField as keyof T] = '' as any;
      form[fieldNames.endField as keyof T] = '' as any;
    }
  });

  /**
   * 重置日期范围
   */
  const resetDateRange = (): void => {
    dateRange.value = [];
  };

  /**
   * 设置日期范围
   * @param start 开始日期
   * @param end 结束日期
   */
  const setDateRange = (start: string, end: string): void => {
    dateRange.value = [start, end];
  };

  return {
    dateRange,
    resetDateRange,
    setDateRange,
  };
};
