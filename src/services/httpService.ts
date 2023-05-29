import axios from 'axios';

axios.interceptors.response.use(undefined, (err) => {
  const expectedError =
    err.response && err.response.status >= 400 && err.response.status <= 500;

  if (!expectedError) {
    console.error(err);
    alert('Unexpected Error Happened');
  }

  return Promise.reject(err);
});

const http = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};

export default http;
