// 接口 API ，用于放置后端提供的 API ，因为环境不同需要在 env 获取 请求 hosts
const PREFIX = `${import.meta.env.VITE_APP_HOST}`;
const WEB_PREFIX = `${PREFIX}/api/web`;

export default {
  // 获取用户信息
  userInfo: `${WEB_PREFIX}/users/user-info`,
  ossToken: `${PREFIX}/api/file/alioss-token`,
  ossStore: `${PREFIX}/api/file/alioss-store`
};
