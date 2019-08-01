import { initialize } from "./index";

describe("initialize", () => {
  const describe = jest.fn().mockImplementation((_name, fn) => fn());
  const commonContextFn = jest.fn();
  const specificContextFn = jest.fn();

  beforeEach(() => {
    describe.mockClear();
    commonContextFn.mockClear();
    specificContextFn.mockClear();
  });

  test("simple", () => {
    const options = undefined;
    const state = {};

    const createContext = initialize({ describe });
    const context = createContext("with db", commonContextFn);
    context("name", options, specificContextFn);

    expect(commonContextFn).toHaveBeenCalledTimes(1);
    expect(commonContextFn).toHaveBeenCalledWith(options, state);

    expect(specificContextFn).toHaveBeenCalledTimes(1);
    expect(specificContextFn).toHaveBeenCalledWith(options, state);

    expect(describe).toHaveBeenCalledTimes(1);
    expect(describe).toHaveBeenCalledWith(
      "name (with db)",
      expect.any(Function)
    );
  });

  test("use options", () => {
    const options = { hostName: "example.com" };
    const state = {};

    const createContext = initialize({ describe });
    const context = createContext("with db", commonContextFn);
    context("name", options, specificContextFn);

    expect(commonContextFn).toHaveBeenCalledTimes(1);
    expect(commonContextFn).toHaveBeenCalledWith(options, state);

    expect(specificContextFn).toHaveBeenCalledTimes(1);
    expect(specificContextFn).toHaveBeenCalledWith(options, state);

    expect(describe).toHaveBeenCalledTimes(1);
    expect(describe).toHaveBeenCalledWith(
      "name (with db)",
      expect.any(Function)
    );
  });

  test("use state", () => {
    interface State {
      dbConn?: string;
    }

    const options = undefined;
    const initState = (): State => {
      return {};
    };

    const createContext = initialize({ describe });
    const context = createContext(
      "with db",
      (_options, state) => {
        state.dbConn = "dummy connection";
      },
      initState
    );
    context("name", options, specificContextFn);

    expect(specificContextFn).toHaveBeenCalledTimes(1);
    expect(specificContextFn).toHaveBeenCalledWith(options, {
      dbConn: "dummy connection",
    });

    expect(describe).toHaveBeenCalledTimes(1);
    expect(describe).toHaveBeenCalledWith(
      "name (with db)",
      expect.any(Function)
    );
  });
});
