import React, { useState } from "react";
import { User, UserSignupPageProps } from "../types";

export const UserSignupPage: React.FC<UserSignupPageProps> = ({ actions }) => {
  const [displayName, setDisplayName] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordRepeat, setpasswordRepeat] = useState<string>("");

  const onChangeDisplayName: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    const value = e.target.value;
    setDisplayName(value);
  };

  const onChangeUserName: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value;
    setUserName(value);
  };

  const onChangePassword: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value;
    setPassword(value);
  };

  const onChangePasswordRepeat: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    const value = e.target.value;
    setpasswordRepeat(value);
  };

  const onClickSignup: React.MouseEventHandler = () => {
    const user: User = {
      username: userName,
      displayName: displayName,
      password: password,
    };
    actions?.postSignup(user);
    // console.log(user);
  };

  return (
    <div className="container">
      <h1 className="text-center">Sign Up</h1>
      <div className="col-12 mb-3">
        <label>Display Name</label>
        <input
          className="form-control"
          placeholder="Your display name"
          value={displayName}
          onChange={onChangeDisplayName}
        />
      </div>
      <div className="col-12 mb-3">
        <label>Username</label>
        <input
          className="form-control"
          placeholder="Your username"
          value={userName}
          onChange={onChangeUserName}
        />
      </div>
      <div className="col-12 mb-3">
        <label>Password</label>
        <input
          className="form-control"
          placeholder="Your password"
          type="password"
          value={password}
          onChange={onChangePassword}
        />
      </div>
      <div className="col-12 mb-3">
        <label>Password Repeat</label>
        <input
          className="form-control"
          placeholder="Repeat your password"
          type="password"
          value={passwordRepeat}
          onChange={onChangePasswordRepeat}
        />
      </div>
      <div className="text-center">
        <button className="btn btn-primary" onClick={onClickSignup}>
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default UserSignupPage;
