import { createContext } from "react";
import { useReducer } from "react";

export const TodoContext = createContext({
  TodoList: [],
  addTodo: ({ title, description, date, remindar }) => {},
  deleteTodo: (id) => {},
  updateTodo: (id, { title, description, date, remindar }) => {},
  setTodos: (todos) => {},
});

function TodoReducer(state, action) {
  switch (action.type) {
    case "ADD":
      return [action.payload, ...state];
    case "DELETE":
      return state.filter((todo) => todo.id !== action.payload);
    case "SET":
      const inverted = action.payload.reverse();
      return inverted;
    case "UPDATE":
      const updateableIndex = state.findIndex(
        (todo) => todo.id === action.payload.id
      );
      const updateableTodo = state[updateableIndex];
      const updatedItem = { ...updateableTodo, ...action.payload.data };
      const Todo = [...state];
      Todo[updateableIndex] = updatedItem;
      return Todo;
    default:
      return state;
  }
}
export default function TodoContextProvider({ children }) {
  const [todoState, dispatch] = useReducer(TodoReducer, []);
  function addTodo(todoData) {
    dispatch({ type: "ADD", payload: todoData });
  }

  function deleteTodo(id) {
    dispatch({ type: "DELETE", payload: id });
  }

  function updateTodo(id, todoData) {
    dispatch({ type: "UPDATE", payload: { id: id, data: todoData } });
  }
  function setTodos(todos) {
    dispatch({ type: "SET", payload: todos });
  }
  const value = {
    TodoList: todoState,
    addTodo: addTodo,
    updateTodo: updateTodo,
    deleteTodo: deleteTodo,
    setTodos: setTodos,
  };
  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}
