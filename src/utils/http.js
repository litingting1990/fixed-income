import { Message } from '@alifd/next';
import axios from 'axios';
import { createHashHistory } from 'history';
import Cookies from 'js-cookie';
import qs from 'qs';


// axios.defaults.baseURL = 'http://118.31.43.6:8089/risk';
axios.defaults.baseURL = '/risk';
axios.defaults.timeout = 600000;


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
    'Content-Type': 'application/json'
    // Authorization: `Bearer ${token}`
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


