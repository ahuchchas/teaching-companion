import axios from "axios";
import { getUserId } from "./auth";

const BACKEND_URL =
  "https://teaching-companion-default-rtdb.firebaseio.com/users/";

//for student task backend

export async function storeTask(taskData) {
  const userId = await getUserId();
  //console.log(userId);
  const response = await axios.post(
    BACKEND_URL + userId + "/tasks.json",
    taskData
  );
  const id = response.data.name;
  return id;
}

export async function fetchTasks() {
  const userId = await getUserId();
  const response = await axios.get(BACKEND_URL + userId + "/tasks.json");

  const tasks = [];

  for (const key in response.data) {
    const taskObj = {
      id: key,
      title: response.data[key].title,
      description: response.data[key].description,
      courseTitle: response.data[key].courseTitle,
      courseCode: response.data[key].courseCode,
      section: response.data[key].section,
      deadline: new Date(response.data[key].deadline),
    };
    tasks.push(taskObj);
  }

  return tasks;
}

export async function updateTask(id, taskData) {
  const userId = await getUserId();
  return axios.put(BACKEND_URL + userId + `/tasks/${id}.json`, taskData);
}

export async function deleteTask(id) {
  const userId = await getUserId();
  return axios.delete(BACKEND_URL + userId + `/tasks/${id}.json`);
}
