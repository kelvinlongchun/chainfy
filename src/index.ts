type ChainMethods<T, U> = {
  [K in keyof U]: (
    ...otherArgs: U[K] extends (value: T, ...otherArgs: infer A) => any
      ? A
      : never
  ) => Chain<T, U>;
};

type Chain<T, U> = Readonly<
  {
    value: T;
    map: (callback: (value: T) => T) => Chain<T, U>;
    trace: (tag?: string) => Chain<T, U>;
  } & ChainMethods<T, U>
>;

const createChain =
  <T, U>(funcs: U & Record<string, (value: T, ...otherArgs: any) => T>) =>
  (value: T): Chain<T, U> => {
    const map = (callback: (value: T) => T) =>
      createChain(funcs)(callback(value));

    const trace = (tag?: string) => {
      console.log(tag ? `${tag}: ${value}` : value);
      return createChain(funcs)(value);
    };

    const chainMethods = Object.keys(funcs).reduce((acc, funcName) => {
      acc[funcName as keyof U] = (...otherArgs) =>
        createChain<T, U>(funcs)(funcs[funcName](value, ...otherArgs));
      return acc;
    }, {} as ChainMethods<T, U>);

    return Object.freeze({
      value,
      map,
      trace,
      ...chainMethods,
    });
  };

class Chainfy {
  createChain = createChain;
}

export const chainfy = new Chainfy();
