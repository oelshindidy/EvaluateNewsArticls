import { handleSubmit } from "../src/client/js/formHandler";

describe("Testing the submit form functionality", () => {
  test("Testing the handleSubmit() function", () => {
    expect(handleSubmit).toBeDefined();
  });
});