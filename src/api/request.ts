import { Toast } from "antd-mobile";
import axios from "axios";
import { store } from "../store";
import { setLoading } from "../store/actions";

//发送请求时请求头自动加上cookie，要不然总返回460
axios.defaults.withCredentials = false;

declare module 'axios' {
  export interface AxiosResponse<T = any> extends Promise<T> {}
}
const requests = axios.create({
  baseURL: "",
  timeout: 5000,
  headers: {
    // "Content-type" : "application/x-www-form-urlencoded",
  },
});

requests.interceptors.request.use((config) => {
  store.dispatch(setLoading(true))
  return config;
});

requests.interceptors.response.use(
  (res) => {
    store.dispatch(setLoading(false))
    const {code} = res.data
    if( code || code !==0 ){
      Toast.show({
        icon: 'fail',
        content: res.data.message,
      })
    }
    return res.data;
  },
  (err) => {
    return Promise.reject(err.response.data);
  }
);
export default requests;
