export interface Context<T, S> {
  (name: number | string, args: T, fn: (options: T, state: S) => void): void;
}

interface InitializeState<T> {
  (): T;
}

interface Describe {
  (name: string, fn: () => void): void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function defaultInitializeState(): any {
  return {};
}

function initialize(options: { describe: Describe }) {
  const { describe } = options;

  /**
   * To create context function
   *
   * @param name context description
   * @param commonFn a pre-process block function
   * @param initializeState initialize context state function
   */
  return function createContext<T, S>(
    name: string,
    commonFn: (options: T, state: S) => void,
    initializeState: InitializeState<S> = defaultInitializeState
  ): Context<T, S> {
    const contextName = name;
    return function(name, options, fn) {
      describe(`${name} (${contextName})`, () => {
        const state: S = initializeState();
        commonFn(options, state);
        fn(options, state);
      });
    };
  };
}

const createContext = initialize({ describe });

export { createContext as default, createContext, initialize };
