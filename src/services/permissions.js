// 封装权限相关API请求 能够使用 permissionServe 模块来获取权限数据了

import request from '@/utils/request';

import API from '@/consts/api';

const permissionServe = {
  getPermissions: () => {
    return request.get(API.permissions);
  }
};

export default permissionServe;
