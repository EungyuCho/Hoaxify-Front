import axios from "axios";
import * as apiCalls from "./apiCalls";

describe("apiCalls", () => {
  describe("signup", () => {
    test("calls /api/1.0/users", () => {
      const mockSignup = jest.fn();
      axios.post = mockSignup;

      apiCalls.signup();

      const path = mockSignup.mock.calls[0][0];
      //   console.log(mockSignup.mock.calls);
      expect(path).toBe("/api/1.0/users");
    });
  });
});
