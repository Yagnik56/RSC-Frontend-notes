// REACT – UNDER THE HOOD (Interview Notes)

// React rendering happens in TWO phases:
//
// 1️⃣ Render Phase (Pure & interruptible)
// - JSX → React Elements (through transpiler like babel)
// - New Virtual DOM tree is created
// - Diffing (Reconciliation) happens here
// - No DOM mutations
//
// 2️⃣ Commit Phase (Non-interruptible)
// - React updates the REAL DOM
// - useEffect callbacks run here
//
// NOTE:
// JSX → React.createElement → Virtual DOM
// React compares OLD vs NEW virtual DOM using diffing algorithm
// Then commits only the changed nodes to actual DOM

// React is declarative in nature not imperative means it doesn't allow directly manipulating the dom.


function Counter() {
  // State persists between renders
  const [count, setCount] = React.useState(0);

  // Normal variables do NOT persist between renders
  // let count1 = 0; // resets on every render

  const increment = () => {
    // Functional updates are queued
    // React batches these updates in the same render cycle
    setCount((prev) => prev + 1);
    setCount((prev) => prev + 1);
    setCount((prev) => prev + 1);
    setCount((prev) => prev + 1);
    setCount((prev) => prev + 1);

    // ❌ This would NOT work correctly due to stale closure
    // setCount(count + 1);
  };

  // This runs on EVERY render
  console.log("Counter Rendered");

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
}

const CounterParent = () => {
  const [showMessage, setShowMessage] = React.useState(false);
  const [showMessage2, setShowMessage2] = React.useState(false);
  const [toggleCount, setToggleCount] = React.useState(false);

  // Parent re-render causes child re-render
  // unless memoization is used (React.memo)
  console.log("Parent Rendered");

  const toggleMessages = () => {
    // Multiple state updates inside same event are batched
    setShowMessage(!showMessage);
    setShowMessage2(!showMessage2);
  };

  return (
    <div>
      {/* Conditional rendering */}
      {toggleCount ? (
        <div>
          <h1>Counter</h1>
          <Counter />
        </div>
      ) : (
        <span>
          <p>Counter off</p>
        </span>
      )}

      <button onClick={() => setToggleCount(!toggleCount)}>
        Toggle Counter
      </button>

      <br />

      {/* React mounts/unmounts elements based on condition */}
      {showMessage && <b>Now you see me</b>}
      {showMessage2 && <b>Now you see me Again</b>}

      <button onClick={toggleMessages}>Show Message</button>

      <br />
      <Frameworks />
    </div>
  );
};

const Frameworks = () => {
  const [frameworks, setFrameworks] = React.useState([
    { id: 166, name: "React" },
    { id: 321, name: "Angular" },
  ]);

  return (
    <div>
      <h3>Popular Frameworks</h3>

      {/* Keys help React identify elements during diffing */}
      {/* Stable keys = better reconciliation */}
      {frameworks.map((item) => (
        <p key={item.id}>{item.name}</p>
      ))}

      <button
        onClick={() =>
          // New array reference → triggers re-render
          setFrameworks([{ id: 888, name: "Vue" }, ...frameworks])
        }
      >
        Add New
      </button>
    </div>
  );
};

// Root creation (React 18 concurrent rendering enabled)
const root = ReactDOM.createRoot(document.getElementById("root"));

// Rendering React element tree
root.render(React.createElement(CounterParent));
