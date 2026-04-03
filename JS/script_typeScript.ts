// ============================================================
// TYPESCRIPT – ALL IN ONE INTERVIEW NOTES (WITH EXPLANATIONS)
// ============================================================

// ------------------------------------------------------------
// WHY TYPESCRIPT? (VERY COMMON INTERVIEW QUESTION)
// ------------------------------------------------------------

/*
Interview Answer:

TypeScript adds static typing to JavaScript, helping catch errors
during development instead of runtime. It improves maintainability,
scalability, and developer productivity, especially in large apps.

Key Benefits:
- Early bug detection
- Better refactoring
- Self-documenting code
- Strong contracts between frontend and backend
- Improved IDE support
*/

// ------------------------------------------------------------
// BASIC TYPES
// ------------------------------------------------------------

let username: string = "Alice";
let age: number = 30;
let isLoggedIn: boolean = true;

let scores: number[] = [10, 20, 30];
let tuple: [string, number] = ["id", 1];

// ------------------------------------------------------------
// TYPE INFERENCE
// ------------------------------------------------------------

/*
TypeScript automatically infers types based on values.
*/

let city = "Mumbai"; // inferred as string

// ------------------------------------------------------------
// TYPE vs INTERFACE (TOP INTERVIEW QUESTION)
// ------------------------------------------------------------

/*
Interview Answer:

Both are used to define object shapes.

Interface:
- Best for object contracts
- Supports declaration merging
- Easier to extend
- Used widely for component props and APIs

Type:
- More flexible
- Supports unions, intersections, primitives
- Used for advanced typing

Performance:
No runtime difference — types are erased after compilation.
*/

// Interface example
interface User {
  name: string;
  age: number;
}

// Type example
type Admin = {
  role: string;
};

// Declaration merging (only interface supports this)

interface Person {
  name: string;
}

interface Person {
  age: number;
}

// merged automatically

// Union only possible with type
type Status = "loading" | "success" | "error";

// ------------------------------------------------------------
// ANY vs UNKNOWN (POPULAR)
// ------------------------------------------------------------

/*
any:
Disables type checking — unsafe.

unknown:
Requires validation — safe.
*/

let a: any = 5;
a.toUpperCase(); // allowed but unsafe

let b: unknown = "hello";

if (typeof b === "string") {
  b.toUpperCase();
}

// ------------------------------------------------------------
// EXTENDS vs IMPLEMENTS
// ------------------------------------------------------------

/*
extends → inheritance between interfaces/types
implements → class must follow contract
*/

interface Animal {
  name: string;
}

interface Dog extends Animal {
  breed: string;
}

class Cat implements Animal {
  name = "Kitty";
}

// ------------------------------------------------------------
// GENERICS (VERY IMPORTANT)
// ------------------------------------------------------------

/*
Interview Answer:

Generics allow writing reusable and type-safe code by parameterizing types.
Used heavily in reusable components, API responses, and utilities.
*/

function identity<T>(value: T): T {
  return value;
}

identity<number>(10);

// Real-world example
interface ApiResponse<T> {
  data: T;
  success: boolean;
}

// ------------------------------------------------------------
// UNION TYPES
// ------------------------------------------------------------

let id: string | number = 123;

// ------------------------------------------------------------
// INTERSECTION TYPES
// ------------------------------------------------------------

type Employee = User & Admin;

// ------------------------------------------------------------
// TYPE NARROWING
// ------------------------------------------------------------

function print(value: string | number) {
  if (typeof value === "string") {
    console.log(value.toUpperCase());
  }
}

// ------------------------------------------------------------
// TYPE GUARD
// ------------------------------------------------------------

function isString(val: unknown): val is string {
  return typeof val === "string";
}

// ------------------------------------------------------------
// UTILITY TYPES
// ------------------------------------------------------------

/*
Frequently asked — know real use cases.
*/

interface Profile {
  name: string;
  email: string;
  age: number;
}

type PartialProfile = Partial<Profile>; // updates
type PickName = Pick<Profile, "name">; // select
type RemoveAge = Omit<Profile, "age">; // exclude
type MapUsers = Record<string, Profile>; // dictionary
type ReadonlyProfile = Readonly<Profile>; // immutable

const arr: ReadonlyArray<number> = [1, 2, 3];

// ------------------------------------------------------------
// MAPPED TYPES
// ------------------------------------------------------------

type Optional<T> = {
  [K in keyof T]?: T[K];
};

// ------------------------------------------------------------
// CONDITIONAL TYPES
// ------------------------------------------------------------

type IsString<T> = T extends string ? true : false;

// ------------------------------------------------------------
// TYPE ASSERTION
// ------------------------------------------------------------

/*
Used when developer knows more than compiler.
Avoid overusing.
*/

const input = document.getElementById("input") as HTMLInputElement;

// ------------------------------------------------------------
// ENUMS
// ------------------------------------------------------------

enum Direction {
  Up,
  Down,
  Left,
  Right,
}

// ------------------------------------------------------------
// OPTIONAL PROPERTIES
// ------------------------------------------------------------

interface Product {
  name: string;
  price?: number;
}

// ------------------------------------------------------------
// NEVER TYPE
// ------------------------------------------------------------

/*
Used for functions that never return.
*/

function throwError(): never {
  throw new Error("Error");
}

// ------------------------------------------------------------
// FUNCTION OVERLOADS
// ------------------------------------------------------------

function combine(a: number, b: number): number;
function combine(a: string, b: string): string;

function combine(a: any, b: any) {
  return a + b;
}

// ------------------------------------------------------------
// TS CONFIG INTERVIEW POINTS
// ------------------------------------------------------------

/*
strict → enables strict type checking
noImplicitAny → prevents accidental any
strictNullChecks → safer null handling
*/

// ------------------------------------------------------------
// REAL WORLD BEST PRACTICES
// ------------------------------------------------------------

/*
- Avoid any
- Prefer unknown
- Use strict mode
- Type API responses
- Use utility types
- Keep types close to domain logic
*/

// ------------------------------------------------------------
// COMMON INTERVIEW TRAPS
// ------------------------------------------------------------

/*
1. Types are compile-time only
2. Assertion ≠ conversion
3. Interfaces merge automatically
4. Generics increase reusability
5. unknown is safer than any
*/
