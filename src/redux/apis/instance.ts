import axios from "axios";

const instance = axios.create({
  baseURL: "http://3.34.123.112:8080",
  timeout: 10000,
  responseType: "json",
});

// 요청 인터셉터
instance.interceptors.request.use(
  (config) => {
    // 1. 요청 전달되기 전 작업 처리
    // config를 설정할 수 있다
    config.headers = config.headers || {
      "Content-Type": "application/json",
    };
    return config;
  },
  (error) => {
    // 2. 요청 에러가 있는 작업 처리
    return Promise.reject(error);
  },
);

// 응답 인터셉터
instance.interceptors.response.use(
  (response) => {
    // 응답 200번대 status일 때 응답 성공 직전 호출
    // 3. 이 작업 이후 .then()으로 이어진다
    return response;
  },
  (error) => {
    // 응답 200번대가 아닌 status일 때 응답 에러 직전 호출
    // 4. 이 작업 이후 .catch()로 이어진다
    return Promise.reject(error);
  },
);

export default instance;
