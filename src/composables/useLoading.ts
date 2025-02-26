export const useLoading = (initialState = false) => {
  const isLoading = ref(initialState);

  // 开始加载
  const startLoading = () => {
    isLoading.value = true;
  };

  // 结束加载
  const endLoading = () => {
    isLoading.value = false;
  };

  // 包装异步函数，自动处理加载状态
  const withLoading = async <T>(fn: () => Promise<T>): Promise<T> => {
    try {
      startLoading();
      return await fn();
    } finally {
      endLoading();
    }
  };

  return {
    isLoading: readonly(isLoading),
    startLoading,
    endLoading,
    withLoading,
  };
};
