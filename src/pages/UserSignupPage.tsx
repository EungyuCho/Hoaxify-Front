import React, { useState } from "react";
import { User, UserSignupPageProps } from "../types";
import Input from "../components/Input";

interface IError {
  displayName?: string;
  username?: string;
  password?: string;
  passwordRepeat?: string;
}

export const UserSignupPage: React.FC<UserSignupPageProps> = ({ actions }) => {
  const [displayName, setDisplayName] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordRepeat, setpasswordRepeat] = useState<string>("");
  const [hasPendingApiCall, setHasPendingApiCall] = useState<boolean>(false);
  const [errors, setErrors] = useState<IError>();

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
    setHasPendingApiCall(true);
    actions
      ?.postSignup(user)
      .then((response) => {
        setHasPendingApiCall(false);
        // setErrors(undefined);
      })
      .catch((apiError) => {
        // console.log(apiError.response.data?.validtationErrors?.displayName);
        if (apiError.response.data?.validationErrors) {
          setErrors({ ...apiError.response.data.validationErrors });
        }
        setHasPendingApiCall(false);
      });
    // console.log(user);
  };

  return (
    <div className="container">
      <h1 className="text-center">Sign Up</h1>
      <div className="col-12 mb-3">
        <Input
          label="Display Name"
          placeholder="Your display name"
          value={displayName}
          onChange={onChangeDisplayName}
          hasError={errors ? errors.displayName !== undefined : undefined}
          error={errors?.displayName}
        />
      </div>
      <div className="col-12 mb-3">
        <Input
          label="Username"
          placeholder="Your username"
          value={userName}
          onChange={onChangeUserName}
          hasError={errors ? errors.username !== undefined : undefined}
          error={errors?.username}
        />
      </div>
      <div className="col-12 mb-3">
        <Input
          label="Password"
          placeholder="Your password"
          type="password"
          value={password}
          onChange={onChangePassword}
          hasError={errors ? errors.password !== undefined : undefined}
          error={errors?.password}
        />
      </div>
      <div className="col-12 mb-3">
        <Input
          label="Password Repeat"
          placeholder="Repeat your password"
          type="password"
          value={passwordRepeat}
          onChange={onChangePasswordRepeat}
          // hasError={errors ? errors.passwordRepeat !== undefined : undefined}
          // error={errors?.passwordRepeat}
        />
      </div>
      <div className="text-center">
        <button
          className="btn btn-primary"
          onClick={onClickSignup}
          disabled={hasPendingApiCall}
        >
          {hasPendingApiCall && (
            <div className="spinner-border text-light spinner-border-sm mr-sm-1">
              <span className="sr-only">Loading...</span>
            </div>
          )}
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default UserSignupPage;
