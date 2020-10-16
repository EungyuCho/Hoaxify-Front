import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { UserSignupPage } from "./UserSignupPage";
import { User, UserSignupPageProps } from "../types";

describe("UserSignupPage", () => {
  describe("Layout", () => {
    test("has header of Sign Up", () => {
      const { container } = render(<UserSignupPage />);
      const header = container.querySelector("h1");
      expect(header).toHaveTextContent("Sign Up");
    });

    test("has input for display name", () => {
      const { queryByPlaceholderText } = render(<UserSignupPage />);
      const displayNameInput = queryByPlaceholderText("Your display name");
      expect(displayNameInput).toBeInTheDocument();
    });

    test("has input for username", () => {
      const { queryByPlaceholderText } = render(<UserSignupPage />);
      const userNameInput = queryByPlaceholderText("Your username");
      expect(userNameInput).toBeInTheDocument();
    });

    test("has input for password", () => {
      const { queryByPlaceholderText } = render(<UserSignupPage />);
      const passwordInput = queryByPlaceholderText("Your password");
      expect(passwordInput).toBeInTheDocument();
    });

    test("has password type from password input", () => {
      const { queryByPlaceholderText } = render(<UserSignupPage />);
      const passwordInput = queryByPlaceholderText(
        "Your password"
      ) as HTMLInputElement;
      expect(passwordInput?.type).toBe("password");
    });

    test("has input for password repeat", () => {
      const { queryByPlaceholderText } = render(<UserSignupPage />);
      const passwordRepeat = queryByPlaceholderText("Repeat your password");
      expect(passwordRepeat).toBeInTheDocument();
    });

    test("has password type from password repeat input", () => {
      const { queryByPlaceholderText } = render(<UserSignupPage />);
      const passwordRepeat = queryByPlaceholderText(
        "Repeat your password"
      ) as HTMLInputElement | null;
      expect(passwordRepeat?.type).toBe("password");
    });

    test("has submit button", () => {
      const { container } = render(<UserSignupPage />);
      const button = container.querySelector("button");
      expect(button).toBeInTheDocument();
    });
  });

  describe("Interactions", () => {
    const changeEvent = (content: string) => ({
      target: {
        value: content,
      },
    });

    let button: Element,
      displayNameInput: Element,
      usernameInput: Element,
      passwordInput: Element,
      passwordRepeat: Element;

    const setupForSubmit = (props?: object) => {
      const rendered = render(<UserSignupPage {...props} />);

      const { container, queryByPlaceholderText } = rendered;

      displayNameInput = queryByPlaceholderText("Your display name") as Element;
      usernameInput = queryByPlaceholderText("Your username") as Element;
      passwordInput = queryByPlaceholderText("Your password") as Element;
      passwordRepeat = queryByPlaceholderText(
        "Repeat your password"
      ) as Element;

      fireEvent.change(displayNameInput, changeEvent("my-display-name"));
      fireEvent.change(usernameInput, changeEvent("my-user-name"));
      fireEvent.change(passwordInput, changeEvent("Password"));
      fireEvent.change(passwordRepeat, changeEvent("Password"));

      button = container.querySelector("button") as Element;

      return rendered;
    };

    test("sets the dispalyName value into state", () => {
      const { queryByPlaceholderText } = render(<UserSignupPage />);
      const displayNameInput = queryByPlaceholderText(
        "Your display name"
      ) as Element;

      fireEvent.change(displayNameInput, changeEvent("my-display-name"));
      expect(displayNameInput).toHaveValue("my-display-name");
    });

    test("sets the userName value into state", () => {
      const { queryByPlaceholderText } = render(<UserSignupPage />);
      const userNameInput = queryByPlaceholderText("Your username") as Element;

      fireEvent.change(userNameInput, changeEvent("my-user-name"));
      expect(userNameInput).toHaveValue("my-user-name");
    });

    test("sets the password value into state", () => {
      const { queryByPlaceholderText } = render(<UserSignupPage />);
      const passwordInput = queryByPlaceholderText("Your password") as Element;

      fireEvent.change(passwordInput, changeEvent("password"));
      expect(passwordInput).toHaveValue("password");
    });

    test("sets the password repeat value into state", () => {
      const { queryByPlaceholderText } = render(<UserSignupPage />);
      const passwordRepeat = queryByPlaceholderText(
        "Repeat your password"
      ) as Element;

      fireEvent.change(passwordRepeat, changeEvent("password repeat"));
      expect(passwordRepeat).toHaveValue("password repeat");
    });

    test("calls postSignup when the fields are valid and the actions are provided in props", () => {
      const props: UserSignupPageProps = {
        actions: {
          postSignup: jest.fn().mockResolvedValue({}),
        },
      };
      setupForSubmit(props);

      fireEvent.click(button);
      expect(props.actions?.postSignup).toHaveBeenCalledTimes(1);
    });

    test("does not throw exception when clicking the button when actions not provided in props", () => {
      setupForSubmit();
      expect(() => fireEvent.click(button)).not.toThrow();
    });

    test("calls post with user body when the fileds are valid", () => {
      const props: UserSignupPageProps = {
        actions: {
          postSignup: jest.fn().mockResolvedValue({}),
        },
      };
      setupForSubmit(props);
      fireEvent.click(button);

      const expectedUserObject: User = {
        username: "my-user-name",
        displayName: "my-display-name",
        password: "Password",
      };
      expect(props.actions?.postSignup).toHaveBeenCalledWith(
        expectedUserObject
      );
    });
  });
});
