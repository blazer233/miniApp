const app = getApp();
export const ajax = async (type, options) => {
  const [page] = getCurrentPages();
  const { route } = page;
  const result = await app.call({
    name: "wishes-520", // 云函数名称
    data: { type, ...options }, // 传给云函数的参数
  });
  console.error(`接口：${type}参数：${JSON.stringify(options)}页面：${route}`);
  return result.errMsg ? [result.errMsg] : [null, result];
};
