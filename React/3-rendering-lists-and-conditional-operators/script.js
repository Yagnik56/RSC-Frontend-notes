// REACT – NOTE 3: Rendering Lists & Conditional Operators

const products = [
  { id: 1, name: "Product A", price: 20, category: "Electronics" },
  { id: 2, name: "Product B", price: 30, category: "Clothing" },
  { id: 3, name: "Product C", price: 15, category: "Electronics" },
  { id: 4, name: "Product D", price: 25, category: "Clothing" },
  { id: 5, name: "Product E", price: 50, category: "Electronics" },
  { id: 6, name: "Product F", price: 40, category: "Electronics" },
];

const names = ["Alice", "Bob", "Alice", "Charlie", "Bob"];

function App() {
  return (
    <div>
      <h2>Rendering Lists and Conditional Operators</h2>

      {/* ---------------------------------- */}
      <h5>Question 1: How does map() work in React for rendering lists?</h5>
      {/* 
        - map() is used to transform arrays into JSX.
        - Each element must have a unique key.
      */}
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <strong>{product.name}</strong> - ${product.price} - Category:{" "}
            {product.category}
          </li>
        ))}
      </ul>

      {/* ---------------------------------- */}
      <h5>Question 2: How do you filter items before rendering?</h5>
      <ul>
        {products
          .filter((product) => product.category === "Electronics")
          .map((product) => (
            <li key={product.id}>
              <strong>{product.name}</strong> - ${product.price}
            </li>
          ))}
      </ul>

      {/* ---------------------------------- */}
      <h5>Question 3: How do you calculate derived data (total price)?</h5>
      {/* reduce() is commonly used for aggregations */}
      <p>
        Total Price Summary: $
        {products.reduce((acc, product) => acc + product.price, 0)}
      </p>

      {/* ---------------------------------- */}
      <h5>
        Question 4: Add discountedPrice (10%) for products priced above $20
      </h5>
      <ul>
        {products
          .filter((product) => product.price > 20)
          .map((product) => ({
            ...product,
            discountedPrice: product.price * 0.9, // derived value
          }))
          .map((product) => (
            <li key={product.id}>
              <strong>{product.name}</strong> - ${product.discountedPrice}{" "}
              (Original: ${product.price})
            </li>
          ))}
      </ul>

      {/* ---------------------------------- */}
      <h5>Question 5: How do you render unique elements from an array?</h5>
      {/* filter + indexOf ensures uniqueness */}
      <ul>
        {names
          .filter((name, index) => names.indexOf(name) === index)
          .map((name) => (
            <li key={name}>{name}</li>
          ))}
      </ul>

      {/* ---------------------------------- */}
      <h5>Question 6: Difference between && and ||</h5>
      <LogicalAnd />
      <LogicalOr />

      {/* ---------------------------------- */}
      <h5>Question 7: Difference between ?. and ??</h5>
      <OptionalChaining />
      <NullishCoalescing />
    </div>
  );
}

/* ================= CONDITIONAL OPERATORS ================= */

// ?? → only checks null or undefined
const NullishCoalescing = () => {
  let userInput = null;
  let defaultValue = "Hello, default value!";

  return <p>{userInput ?? defaultValue}</p>;
};

// ?. → safely access nested properties
const OptionalChaining = () => {
  let user = {
    name: "John",
    // address: { city: "New York" },
  };

  return <p>{user?.address?.city}</p>;
};

// && → renders RHS if condition is true
const LogicalAnd = () => {
  let x = 5;
  let y = 10;

  return x > 0 && y > 0 ? <p>Both are greater than 0</p> : null;
};

// || → renders if ANY condition is true
const LogicalOr = () => {
  let isRaining = false;
  let isSunny = true;

  return isRaining || isSunny ? (
    <p>It's either raining or sunny (or both)!</p>
  ) : null;
};

/* ================= RENDER ================= */

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
