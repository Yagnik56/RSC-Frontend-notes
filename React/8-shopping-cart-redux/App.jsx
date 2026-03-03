import "./App.css";

function App() {
  return (
    <div>
      <h2>Redux Interview Questions in React</h2>

      <h4>
        <u>Question 1: What is Redux?</u>
      </h4>
      <p>
        Redux is a predictable state management library used mainly with React.
        It stores the entire application state in a single global store and
        manages updates using actions and reducers, making state changes
        traceable and easier to debug.
      </p>

      <h4>
        <u>Question 2: How does Redux state management work?</u>
      </h4>
      <p>
        Redux follows a unidirectional data flow:
        <br />
        1. UI dispatches an Action.
        <br />
        2. Action is sent to Reducer.
        <br />
        3. Reducer updates the Store based on action type.
        <br />
        4. Updated state is provided back to UI via subscriptions.
      </p>

      <h4>
        <u>Question 3: How do you define an action in Redux?</u>
      </h4>
      <p>
        An action is a plain JavaScript object that describes what happened. It
        must contain a <b>type</b> property and can optionally contain payload
        data.
      </p>

      <pre>
{`const incrementAction = {
  type: "INCREMENT",
  payload: 1
};`}
      </pre>

      <h4>
        <u>Question 4: What is a reducer in Redux? Show an example?</u>
      </h4>
      <p>
        A reducer is a pure function that takes the previous state and an action
        and returns a new updated state without mutating the existing state.
      </p>

      <pre>
{`const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    default:
      return state;
  }
};`}
      </pre>

      <h4>
        <u>Question 5: How do you create a Redux store?</u>
      </h4>
      <p>
        A Redux store is created using the <b>createStore</b> function or
        preferably Redux Toolkit's <b>configureStore</b>.
      </p>

      <pre>
{`import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: counterReducer
});`}
      </pre>

      <h4>
        <u>
          Question 6: What is redux-thunk middleware in Redux and how do you
          apply it?
        </u>
      </h4>
      <p>
        Redux Thunk is middleware that allows dispatching asynchronous actions.
        Instead of returning an action object, it allows returning a function
        that performs async operations like API calls.
      </p>

      <pre>
{`const fetchData = () => {
  return async (dispatch) => {
    const res = await fetch("/api");
    const data = await res.json();
    dispatch({ type: "SET_DATA", payload: data });
  };
};`}
      </pre>

      <h4>
        <u>
          Question 7: When would you choose Context API over Redux, and vice
          versa?
        </u>
      </h4>
      <p>
        <b>Context API:</b> Suitable for small applications or sharing simple
        global data like theme or authentication.
        <br />
        <b>Redux:</b> Preferred for large-scale applications requiring complex
        state logic, middleware support, debugging tools, and predictable state
        updates.
      </p>
    </div>
  );
}

const incrementAction = {
  type: "INCREMENT",
  payload: "data",
};

const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    default:
      return state;
  }
};

export default App;