import { chainfy } from "../src";

const consoleSpy = jest.spyOn(console, "log");

const add = (value: number, num: number) => value + num;
const double = (value: number) => value * 2;

const numberFunctions = { add, double };

const chain = chainfy.createChain(numberFunctions);
const num = 10;

describe("Initiation", () => {
  test("The chain should be a function", () => {
    expect(typeof chain).toBe("function");
  });

  test("The chain object should have functions 'add' and 'double'", () => {
    const chainObject = chain(num);
    expect(chainObject).toHaveProperty("add");
    expect(typeof chainObject.add).toBe("function");
    expect(chain(num)).toHaveProperty("double");
    expect(typeof chainObject.double).toBe("function");
  });
});

describe("Chain functions", () => {
  test("The return value of chain function 'add' should be same as function 'add'", () => {
    const addNum = 5;
    expect(chain(num).add(addNum).value).toBe(add(num, addNum));
    expect(chain(num).add(addNum).value).toBe(15);
  });

  test("The return value of chain function 'double' should be same as function 'double'", () => {
    expect(chain(num).double().value).toBe(double(num));
    expect(chain(num).double().value).toBe(20);
  });

  test("Using chain's functions should return a correct value", () => {
    const addNum = 5;
    expect(chain(num).add(5).double().value).toBe(double(add(num, addNum)));
    expect(chain(num).add(5).double().value).toBe(30);
  });
});

describe("Function 'map'", () => {
  test("Function 'map' should pass the current value of the chain", () => {
    expect(chain(num).map((n) => n).value).toBe(num);
  });

  test("The final value should be 5 if the callback is (n) => n / 2", () => {
    expect(chain(num).map((n) => n / 2).value).toBe(num / 2);
    expect(chain(num).map((n) => n / 2).value).toBe(5);
  });

  test("The final value should be 300", () => {
    expect(
      chain(num)
        .add(5)
        .double()
        .map((n) => n * 10).value
    ).toBe(double(add(num, 5)) * 10);
    expect(
      chain(num)
        .add(5)
        .double()
        .map((n) => n * 10).value
    ).toBe(300);
  });
});

describe("Function 'trace'", () => {
  test("Console should have log [15] when we call trace() in the chain'", () => {
    const result = chain(num).add(5).trace().value;

    expect(consoleSpy).toHaveBeenCalled();
    expect(consoleSpy).toHaveBeenCalledTimes(1);
    expect(consoleSpy).toHaveBeenCalledWith(15);
    expect(result).toBe(15);

    consoleSpy.mockReset();
  });

  test("Console should have log ['Added five: 15'] when we call trace('Added five') in the chain", () => {
    const result = chain(num).add(5).trace("Added five").value;

    expect(consoleSpy).toHaveBeenCalled();
    expect(consoleSpy).toHaveBeenCalledTimes(1);
    expect(consoleSpy).toHaveBeenCalledWith("Added five: 15");
    expect(result).toBe(15);

    consoleSpy.mockReset();
  });

  test("Console should have log ['Added five: 15', 'Double: 30'] when we call trace('Added five') and trace('Double') in the chain", () => {
    const result = chain(num)
      .add(5)
      .trace("Added five")
      .double()
      .trace("Double").value;

    expect(consoleSpy).toHaveBeenCalled();
    expect(consoleSpy).toHaveBeenCalledTimes(2);
    expect(consoleSpy.mock.calls).toEqual([["Added five: 15"], ["Double: 30"]]);
    expect(result).toBe(30);

    consoleSpy.mockReset();
  });
});
