import axios from 'axios';
import { User } from '../types';

export const signup = (user: User) => {
  return axios.post('/api/1.0/users', user);
};
