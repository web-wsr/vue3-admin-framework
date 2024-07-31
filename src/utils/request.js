import axios from 'axios';
import { ElMessage } from 'element-plus';
import Cookies from 'js-cookie';

// 定义cookie中的jwt 的token 的key 名称
const TOKEN_KEY = 'web_token';

// 定义当前应用 ID，nginx 查看 log 的时候知道是来自哪个应用 （ 可选 ）
// 除了 APPID 也可以根据业务的需求场景加上 user_id 等信息
const APPID = import.meta.env.VITE_APP_APPID;

// 创建请求实例
const axiosInstance = axios.create();
axiosInstance.defaults.timeout = 20000;

// 全局错误处理
const handleErrorRequest = (error) => {
  const { response } = error;
  const status = response ? response.status : 408;
  const token = Cookies.get(TOKEN_KEY);

  if (response) {
    const { data } = response;
    const message = data ? data.msg || data.message : '服务器发送错误，请稍后再试';
    switch (status) {
      case 401:
        // token过期 ，跳转到首页重新调整
        ElMessage.error('未登录，请登录重试');
        if (token) {
          Cookies.remove(TOKEN_KEY, {
            path: '/',
            domin: `${import.meta.env.VITE_APP_DOMIN}`
          });
          window.location.href = `/`;
        }
        break;
      case 403:
        ElMessage.error('没有权限，请联系管理员');
        break;
      default:
        ElMessage.error(message);
    }
  } else {
    ElMessage.error('网络超时');
  }
};

// 添加一个请求拦截器(放置 token 和 业务参数)
axiosInstance.interceptors.request.use((config) => {
  const token = Cookies.get(TOKEN_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  //   合并请求参数。这里将appid参数添加到请求的查询字符串中，与原有的config.params对象合并。APPID通常是一个应用标识符，用于服务器端识别请求来源。
  config.params = {
    ...config.params,
    appid: APPID
  };
  return config;
});

// 添加响应拦截器 ( 格式化返回数据，把 data 拿掉 )
axiosInstance.interceptors.response.use(
  (res) => {
    switch (true) {
      case !!res.data.error_code:
        ElMessage.error(res.data.msg);
        return Promise.reject(res.data);
      default:
        return res.data.data;
    }
  },
  (error) => {
    handleErrorRequest(error);
    return Promise.reject(error);
  }
);

/*[请求库] 重新封装，让传递的参数更符合自己的习惯
 ** @params url         { string }   @default => '' [接口地址]
 ** @params data/params { object }   @default => {} [发送数据]
 ** @params config      { object }   配置
 */

export default {
  post: function (url = '', data = {}, config = {}) {
    // 返回Promise对象
    return axiosInstance.post(url, data, config);
  },
  get: function (url = '', params = {}, config = {}) {
    // 合并
    const OPTIONS = { params, ...config };
    return axiosInstance.get(url, OPTIONS);
  },
  put: function (url = '', data = {}, config = {}) {
    return axiosInstance.put(url, data, config);
  },
  delete: function (url = '', params = {}, config = {}) {
    const OPTIONS = { params, ...config };
    return axiosInstance.delete(url, OPTIONS);
  }
};
