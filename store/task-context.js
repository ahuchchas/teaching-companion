import { createContext, useReducer } from "react";

const DUMMY_TASKS = [
  {
    id: "task1",
    title: "Compiler Assignment",
    description: "Solve the given problems and submit the hardcopy",
    courseTitle: "Compiler Design",
    courseCode: "CSE-3315",
    section: "52",
    deadline: new Date("2023-02-19"),
  },
  {
    id: "task2",
    title: "CAD Assignment",
    description: "Solve the given problems and submit the hardcopy",
    courseTitle: "CAD",
    courseCode: "CSE-3315",
    section: "52",
    deadline: new Date("2023-02-18"),
  },
  {
    id: "task3",
    title: "Sociology Assignment",
    description: "Solve the given problems and submit the hardcopy",
    courseTitle: "Sociology",
    courseCode: "CSE-3315",
    section: "52",
    deadline: new Date("2023-02-17"),
  },
  {
    id: "task4",
    title: "Data structure Assignment",
    description: "Solve the given problems and submit the hardcopy",
    courseTitle: "Data structure",
    courseCode: "CSE-3315",
    section: "52",
    deadline: new Date("2023-02-16"),
  },
  {
    id: "task5",
    title: "Java Assignment",
    description: "Solve the given problems and submit the hardcopy",
    courseTitle: "Java",
    courseCode: "CSE-3315",
    section: "52",
    deadline: new Date("2023-02-15"),
  },
  {
    id: "task6",
    title: "Compiler Assignment",
    description: "Solve the given problems and submit the hardcopy",
    courseTitle: "Compiler Design",
    courseCode: "CSE-3315",
    section: "52",
    deadline: new Date("2023-02-12"),
  },
  {
    id: "task7",
    title: "Compiler Assignment",
    description: "Solve the given problems and submit the hardcopy",
    courseTitle: "Compiler Design",
    courseCode: "CSE-3315",
    section: "52",
    deadline: new Date("2023-02-11"),
  },
];

export const TasksContext = createContext({
  tasks: [],
  addTask: ({
    title,
    description,
    courseTitle,
    courseCode,
    section,
    deadline,
  }) => {},
  setTasks: (tasks) => {},
  deleteTask: (id) => {},
  updateTask: (
    id,
    { title, description, courseTitle, courseCode, section, deadline }
  ) => {},
});

function tasksReducer(state, action) {
  switch (action.type) {
    case "SET":
      const inverted = action.payload.reverse();
      return inverted;

    case "ADD":
      return [action.payload, ...state];

    case "UPDATE":
      const updatableTaskIndex = state.findIndex(
        (task) => task.id === action.payload.id
      );
      const updatableTask = state[updatableTaskIndex];
      const updatedItem = { ...updatableTask, ...action.payload.data };
      const updatedTasks = [...state];
      updatedTasks[updatableTaskIndex] = updatedItem;
      return updatedTasks;

    case "DELETE":
      return state.filter((task) => task.id !== action.payload);
    default:
      return state;
  }
}

export default function TasksContextProvider({ children }) {
  const [tasksState, dispatch] = useReducer(tasksReducer, []);

  function setTasks(tasks) {
    dispatch({ type: "SET", payload: tasks });
  }

  function addTask(taskData) {
    dispatch({ type: "ADD", payload: taskData });
  }

  function deleteTask(id) {
    dispatch({ type: "DELETE", payload: id });
  }

  function updateTask(id, taskData) {
    dispatch({ type: "UPDATE", payload: { id: id, data: taskData } });
  }

  const value = {
    tasks: tasksState,
    setTasks: setTasks,
    addTask: addTask,
    deleteTask: deleteTask,
    updateTask: updateTask,
  };

  return (
    <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
  );
}
