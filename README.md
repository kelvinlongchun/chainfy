# Overview

This npm module converts your functions to a method chain.

# Why should I use this?

1. Method chaining is one of the promgamming styles. For me, it is more readable.
2. By using one simple function, you don't need to define any class any more for implementing method chaining.
3. The data in the chain object is immutable (Just like using functions `map`, `filters`, `slice` in arrays). It's functional-programming-friendly.

# Get Started

## Setup

You need to install module `chainfy` first.

```
npm i chainfy
```

Import the module

```ts
// Import module - ES6
import { chainfy } from "chainfy";

// Import module - CommonJS
const { chainfy } = require("chainfy");
```

## Create a method chain

You can use function `createChain(funcs)` to create a chain for a specific data type. In the below example, I will use `number`.

Parameter `funcs` should be an object of functions. The key and the value of the object are the function name and the function that you will call in the chain. The type signature of the function is `(value: T, ...otherArgs: any) => T`. Note that all first parameters' (`value: T`) types in `funcs` must be the same (In the below case: `number`), and there is no type requirement for the other parameters (`otherArgs: any`).

The chain will return a function. If we want to use the chain, we need to put the data to the chain (Please see the detail in the next part).

```ts
// Build the chain
const numberChain = chainfy.createChain({
  add: (value: number, num: number) => value + num,
  minus: (value: number, num: string) => value - Number(num),
  square: (value: number) => value * value,
});
```

## Add the data to initiate the chain

The chain actually is a function. When we want to use the chain, we need to put the data to the chain. After that, we will get a chain object. The reason why we set the chain as a function is to make the code more reusable.

In the below case, we put number `num1` into chain `numberChain`. `chainObject` now is a chain object.

```ts
// Initiate the data
const num1 = 100;
const chainObject = numberChain(num1);
```

## Read the data

In the chain object, we can use property `value` to get the value. (Please note that this value is immutable.)

```ts
// Read the data
chainObject.value; // 100

// value is immutable
chainObject.value = 10; // Return Error
```

## Use the chain

You can call any functions after the chain object.

You will see you don't need to put the first parameter `value` in the function. You just need to put other parameters `otherArgs`. (Please review parameter `funcs` in function `createChain`.)

When you finish the chain, you should call property `value` to return the value.

```ts
// Use the methods in a chain
const num2 = numberChain(num1).add(1).minus("2").square().value; // (100 + 1 - 2) ^ 2 = 9801
```

# Built-ins

There are 2 built-in functions you can use in chain objects.

## `map(callback)`

Like arrays' function `map`, function `map(callback)` will copy the data and return a new chain object. You can put a callback function into the parameter for update the value.

```ts
// Function map
const num3 = numberChain(num1).map((n) => n / 2).value; // 100 / 2 = 50
```

## `trace(tag)`

Function `trace(tag)` is a debug function. Which will print the current value if we call it in the chain.

Parameter `tag` is optional.

```ts
// Function trace
const num4 = numberChain(num1)
  .add(1)
  .trace() // Console: 101
  .minus("2")
  .trace("Minus 2") // Console: Minus 2: 99
  .square().value;
```

# Example

Please check the code in [/src/examples/exmaple.ts](https://github.com/kelvinlongchun/chainfy/blob/main/examples/example.ts)
