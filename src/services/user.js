import utils from '@/utils/request';
import API from '@/consts/api';

const userService = {
  getUserInfo() {
    return utils.get(API.userInfo);
  }
};

export default userService;
