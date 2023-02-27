import axios from "axios";
import { getUserId } from "./auth";

const BACKEND_URL =
  "https://teaching-companion-default-rtdb.firebaseio.com/users/";

export async function storeTodo(todoData) {
  const userId = await getUserId();
  const response = await axios.post(
    BACKEND_URL + userId + "/todoList.json",
    todoData
  );
  const id = response.data.name;
  return id;
}

export async function fetchTodoData() {
  const userId = await getUserId();
  const response = await axios.get(BACKEND_URL + userId + "/todoList.json");
  const todoList = [];
  for (const key in response.data) {
    const todoOb = {
      id: key,
      title: response.data[key].title,
      description: response.data[key].description,
      remindar: response.data[key].remindar,
      date: new Date(response.data[key].date),
    };
    todoList.push(todoOb);
  }

  return todoList;
}
export async function updateTodo(id, teamData) {
  const userId = await getUserId();
  return axios.put(BACKEND_URL + userId + `/todoList/${id}.json`, teamData);
}

export async function deleteTodo(id) {
  const userId = await getUserId();
  return axios.delete(BACKEND_URL + userId + `/todoList/${id}.json`);
}
