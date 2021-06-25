import { FilterAuthPipe } from "./filter-auth.pipe";

describe("FilterAuthPipe", () => {
  it("create an instance", () => {
    const pipe = new FilterAuthPipe();
    expect(pipe).toBeTruthy();
  });
});
