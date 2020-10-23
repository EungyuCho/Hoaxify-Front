import React from "react";
import {
  render,
  fireEvent,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import { UserSignupPage } from "./UserSignupPage";
import { User, UserSignupPageProps } from "../types";

test("UserSignupPage Layout Test", () => {
  const { container, queryByPlaceholderText } = render(<UserSignupPage />);

  // header "Sign UP" Text 존재 여부
  const header = container.querySelector("h1");
  expect(header).toHaveTextContent("Sign Up");

  // input for "display name" DOM 에 존재 여부
  const displayNameInput = queryByPlaceholderText("Your display name");
  expect(displayNameInput).toBeInTheDocument();

  // input for "username" DOM 에 존재 여부
  const userNameInput = queryByPlaceholderText("Your username");
  expect(userNameInput).toBeInTheDocument();

  const passwordInput = queryByPlaceholderText(
    "Your password"
  ) as HTMLInputElement;

  // input for "password" DOM 에 존재 여부
  expect(passwordInput).toBeInTheDocument();

  // "password" input 의 type 이 "password" 인지?
  expect(passwordInput?.type).toBe("password");

  const passwordRepeat = queryByPlaceholderText(
    "Repeat your password"
  ) as HTMLInputElement;

  // input for "password repeat" DOM 에 존재 여부
  expect(passwordRepeat).toBeInTheDocument();

  // "password repeat" input 의 type 이 "password" 인지?
  expect(passwordRepeat.type).toBe("password");

  // "submit" button DOM 에 존재 여부
  const button = container.querySelector("button");
  expect(button).toBeInTheDocument();
});

describe("UserSignupPage Interaction Test", () => {
  const changeEvent = (content: string) => ({
    target: {
      value: content,
    },
  });

  test("Input value 들 변경 후 API call 성공 case", async () => {
    // api call fn Mocking 하여 prop 생성
    const succeedingProps: UserSignupPageProps = {
      actions: {
        postSignup: jest.fn().mockImplementation(() => {
          return new Promise((resolve) => {
            // 성공하는 API call
            setTimeout(() => {
              resolve({});
            }, 300);
          });
        }),
      },
    };

    // render with mocked props
    const { container, queryByPlaceholderText, queryByText } = render(
      <UserSignupPage {...succeedingProps} />
    );

    // render 후 test 에 필요한 Element 들 선택
    const displayNameInput = queryByPlaceholderText(
      "Your display name"
    ) as Element;
    const userNameInput = queryByPlaceholderText("Your username") as Element;
    const passwordInput = queryByPlaceholderText("Your password") as Element;
    const passwordRepeatInput = queryByPlaceholderText(
      "Repeat your password"
    ) as Element;
    const button = container.querySelector("button") as Element;

    // API call fn 의 올바른 매개변수 선언
    const expectedUserObject: User = {
      displayName: "my-display-name",
      password: "password",
      username: "my-user-name",
    };

    // change event 에 따른 "displayName" input 값 변경
    fireEvent.change(
      displayNameInput,
      changeEvent(expectedUserObject.displayName)
    );
    expect(displayNameInput).toHaveValue(expectedUserObject.displayName);

    // change event 에 따른 "userName" input 값 변경
    fireEvent.change(userNameInput, changeEvent(expectedUserObject.username));
    expect(userNameInput).toHaveValue(expectedUserObject.username);

    // change event 에 따른 "password" input 값 변경
    fireEvent.change(passwordInput, changeEvent(expectedUserObject.password));
    expect(passwordInput).toHaveValue(expectedUserObject.password);

    // change event 에 따른 "password repeat" input 값 변경
    fireEvent.change(passwordRepeatInput, changeEvent("password repeat"));
    expect(passwordRepeatInput).toHaveValue("password repeat");

    // submit 버튼 클릭
    fireEvent.click(button);

    // submit 버튼 클릭 시 postSignup() 한번 호출
    expect(succeedingProps.actions?.postSignup).toHaveBeenCalledTimes(1);

    // postSignup() 이 올바른 매개변수와 함께 호출
    expect(succeedingProps.actions?.postSignup).toHaveBeenCalledWith(
      expectedUserObject
    );

    // pending api call 이 있을 경우 signup 버튼 동작하지 않음
    fireEvent.click(button); // 두번째 클릭
    expect(succeedingProps.actions?.postSignup).toHaveBeenCalledTimes(1); // 여전히 한번만 호출됨

    // pending api call 이 있을 경우 Spinner render 함
    const spinner = queryByText("Loading...");
    expect(spinner).toBeInTheDocument();

    // api call 이 성공적으로 종료되면 Spinner 숨기기
    await waitForElementToBeRemoved(spinner);
    expect(spinner).not.toBeInTheDocument();
  });

  test("API call 실패 case", async () => {
    const failingProps: UserSignupPageProps = {
      actions: {
        postSignup: jest.fn().mockImplementation(() => {
          return new Promise((resolve, reject) => {
            // 실패하는 API call
            setTimeout(() => {
              reject({
                response: { data: {} },
              });
            }, 300);
          });
        }),
      },
    };

    const { container, queryByText } = render(
      <UserSignupPage {...failingProps} />
    );

    const button = container.querySelector("button") as Element;

    // submit 버튼 클릭
    fireEvent.click(button);

    // submit 버튼 클릭 시 postSignup 한번 호출
    expect(failingProps.actions?.postSignup).toBeCalledTimes(1);

    // pending api call 이 있을 경우 Spinner render 함
    const spinner = queryByText("Loading...");
    expect(spinner).toBeInTheDocument();

    // api call 이 실패하고 종료되면 Spinner 숨기기
    await waitForElementToBeRemoved(spinner);
    expect(spinner).not.toBeInTheDocument();
  });

  test("userSignupPage 에 prop (action) 이 주어지지 않은 case", () => {
    const { container } = render(<UserSignupPage />);
    const button = container.querySelector("button") as Element;

    // Exception throw 하지 않는다.
    expect(() => fireEvent.click(button)).not.toThrow();
  });
});
