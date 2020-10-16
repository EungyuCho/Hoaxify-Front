export interface User {
  username: string;
  displayName: string;
  password: string;
}

export interface UserSignupPageProps {
  actions?: {
    postSignup(user: User): object;
  };
}
