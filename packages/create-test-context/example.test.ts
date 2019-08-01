import createContext from "./index";

describe("Jest example", () => {
  describe("CreateContext(name, (options) => void)", () => {
    interface Options {
      hostName: string;
    }
    interface State {
      count: number;
      conn?: string;
    }

    const initState = (): State => ({ count: 0 });

    const context = createContext(
      "with db",
      (opts: Options, state: State) => {
        beforeEach(() => {
          state.count++;
          state.conn = `connection(${opts.hostName})`;
        });
      },
      initState
    );

    context(
      "ctx 01",
      { hostName: "db1.example.com" },
      (opts: Options, state: State) => {
        test("something1", () => {
          expect(opts).toEqual({ hostName: "db1.example.com" });
          expect(state).toEqual({
            conn: "connection(db1.example.com)",
            count: 1,
          });
        });
        test("something2", () => {
          expect(opts).toEqual({ hostName: "db1.example.com" });
          expect(state).toEqual({
            conn: "connection(db1.example.com)",
            count: 2,
          });
        });
      }
    );
  });
});
