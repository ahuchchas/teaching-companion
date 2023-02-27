import axios from "axios";
import { getUserId } from "./auth";

const BACKEND_URL =
  "https://teaching-companion-default-rtdb.firebaseio.com/users/";

export async function storeProjectTeams(teamsData) {
  const userId = await getUserId();
  const response = await axios.post(
    BACKEND_URL + userId + "/projectTeams.json",
    teamsData
  );
  const id = response.data.name;
  return id;
}

export async function fetchProjectTeamData() {
  const userId = await getUserId();
  const response = await axios.get(BACKEND_URL + userId + "/projectTeams.json");
  // console.log(response.data);
  const projectTeams = [];

  for (const key in response.data) {
    const projectTeamOb = {
      id: key,
      name: response.data[key].name,
      Batch: response.data[key].Batch,
      Email: response.data[key].Email,
      TeamMemberOne: response.data[key].TeamMemberOne,
      TeamMemberTwo: response.data[key].TeamMemberTwo,
      TeamMemberThree: response.data[key].TeamMemberThree,
      appoinment: new Date(response.data[key].appoinment),
    };
    projectTeams.push(projectTeamOb);
  }
  // console.log(projectTeams);
  return projectTeams;
}

export async function updateProjectTeams(id, teamData) {
  const userId = await getUserId();
  return axios.put(BACKEND_URL + userId + `/projectTeams/${id}.json`, teamData);
}

export async function deleteProjectTeams(id) {
  const userId = await getUserId();
  return axios.delete(BACKEND_URL + userId + `/projectTeams/${id}.json`);
}
