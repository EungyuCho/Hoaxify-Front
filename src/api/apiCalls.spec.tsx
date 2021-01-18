import axios from 'axios';
import * as apiCalls from './apiCalls';
import { User } from '../types';

describe('apiCalls', () => {
  describe('signup', () => {
    test('calls /api/1.0/users', () => {
      const mockSignup = jest.fn();
      axios.post = mockSignup;

      const mockUser: User = {
        displayName: 'mock_display_name',
        password: 'mock_password',
        username: 'mock_username',
      };

      apiCalls.signup(mockUser);

      const path = mockSignup.mock.calls[0][0];
      const requestBody = mockSignup.mock.calls[0][1];
      // console.log(mockSignup.mock.calls);
      expect(path).toBe('/api/1.0/users');
      expect(requestBody).toEqual(mockUser);
    });
  });
});
