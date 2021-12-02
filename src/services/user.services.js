import axios from '@utils/axios';
import { endpoints } from '@constants/index';

const userServices = {
  /**
   *
   * @param {Object} params
   * @returns {Promise<User[]>}
   */
  getUsers: (params) => {
    return axios.get(endpoints.userGetInfo, { params });
  },
};

export default userServices;
