import { Message } from '@alifd/next';
import axios from 'axios';
import { createHashHistory } from 'history';
import Cookies from 'js-cookie';
import qs from 'qs';


const token = 'ff4004ca-12d0-4748-b822-1f02eab24c74';

axios.defaults.baseURL = 'http://10.111.64.251:32701/api';

axios.defaults.timeout = 600000;

// const token = Cookies.get('user_usopp') && JSON.parse(Cookies.get('user_usopp')).token;

// axios.defaults.baseURL = `http://${document.domain}:32701/api`;


// axios.defaults.withCredentials = true;
const MethodType = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
  PATCH: 'PATCH'
};

export default (api, method = MethodType.GET, params, config = {}) => {
  let data = 'data';

  if (method === 'GET') {
    data = 'params';
  }


  let headers = {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
  };
  let responseType = 'json';

  if (config.hasOwnProperty('headers')) {
    headers = {
      ...headers,
      ...config.headers
    };
  }
  if (config.hasOwnProperty('responseType')) {
    responseType = config.responseType;
  }

  return new Promise((resolve, reject) => {
    axios({
      url: api,
      method,
      [data]: params,
      headers,
      responseType
    }).then((res) => {
      if (res.status === 200) {
        resolve(res);
      }
    }, (error) => {
      if (error.response && error.response.status === 401) {
        createHashHistory().replace('/exception/401');
      }
      if (error.response && error.response.status === 404) {
        Message.show({
          type: 'error',
          title: error.response.data.error,
          content: '未找到请求地址！',
          hasMask: true
        });
      } else {
        Message.show({
          type: 'error',
          title: error.response && error.response.data.error || error.message,
          content: error.response && error.response.data.message,
          hasMask: true
        });
      }
      reject(error);
    });
  });
};


