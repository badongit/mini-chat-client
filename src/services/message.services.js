import axios from '@utils/axios';
import { endpoints } from '@constants/index';

const messageServices = {
  getMessages: (params) => {
    return axios.get(endpoints.messagesGet, { params });
  },
};

export default messageServices;
