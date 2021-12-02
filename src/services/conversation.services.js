import axios from '@utils/axios';
import { endpoints } from '@constants/index';

const conversationServices = {
  /**
   *
   * @param {string} conversationId
   * @param {*} values
   * @returns
   */
  uploadPhoto: (conversationId, values) => {
    return axios.put(`${endpoints.conversationsUploadPhoto}/${conversationId}`, values);
  },

  changeRole: ({ conversationId, userId, role }) => {
    return axios.put(`${endpoints.conversationsChangeRole}/${conversationId}`, { userId, role });
  },
};

export default conversationServices;
