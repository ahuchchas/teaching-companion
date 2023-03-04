import axios from "axios";
import { getUserId } from "./auth";
import { objectToArray } from "./converter";

const BACKEND_URL =
  "https://teaching-companion-default-rtdb.firebaseio.com/users/";

//for student task backend

export async function storeCourse(courseData) {
  const userId = await getUserId();
  //console.log(userId);
  const response = await axios.post(
    BACKEND_URL + userId + "/courses.json",
    courseData
  );
  const id = response.data.name;
  return id;
}

export async function fetchCourses() {
  const userId = await getUserId();
  const response = await axios.get(BACKEND_URL + userId + "/courses.json");

  const courses = [];

  for (const key in response.data) {
    const courseObj = {
      courseId: key,
      courseTitle: response.data[key].courseTitle,
      courseCode: response.data[key].courseCode,
      topicList: response.data[key].topicList
        ? objectToArray(response.data[key].topicList)
        : [],
    };
    //console.log(response.data[key].topicList);
    courses.push(courseObj);
  }

  return courses;
}

export async function updateCourse(id, courseData) {
  const userId = await getUserId();
  return axios.put(BACKEND_URL + userId + `/courses/${id}.json`, courseData);
}

export async function deleteCourse(id) {
  const userId = await getUserId();
  return axios.delete(BACKEND_URL + userId + `/courses/${id}.json`);
}
