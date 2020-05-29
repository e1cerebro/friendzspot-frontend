import axios from 'axios';
const userToken = localStorage.getItem('user');
export default axios.create({
  baseURL: `http://127.0.0.1:4000`,
  headers: { authorization: userToken },
});
