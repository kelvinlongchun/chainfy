// Import module - ES6
import { chainfy } from "chainfy";

// Import module - CommonJS
const { chainfy } = require("chainfy");

// Build the chain
const numberChain = chainfy.createChain({
  add: (value: number, num: number) => value + num,
  minus: (value: number, num: string) => value - Number(num),
  square: (value: number) => value * value,
});

// Initiate the data
const num1 = 100;
const chainObject = numberChain(num1);

// Read the data
chainObject.value; // 100

// value is immutable
chainObject.value = 10; // Return Error

// Use the methods in a chain
const num2 = numberChain(num1).add(1).minus("2").square().value; // (100 + 1 - 2) ^ 2 = 9801

// Function map
const num3 = numberChain(num1).map((n) => n / 2).value; // 100 / 2 = 50

// Function trace
const num4 = numberChain(num1)
  .add(1)
  .trace() // Console: 101
  .minus("2")
  .trace("Minus 2") // Console: Minus 2: 99
  .square().value;
