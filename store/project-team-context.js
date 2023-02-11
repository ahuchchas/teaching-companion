import { createContext } from "react";
import { useReducer } from "react";

const DummyTeams = [
  {
    id: "1",
    name: "LU ATT",
    Batch: "52",
    TeamMemberOne: "Md. Shahinur Rahman",
    TeamMemberTwo: "Taslima Hussain Enas",
    TeamMemberThree: "Amira Mostofa Chowdhury",
    Email: "tahsinchowdhuryupoma@gmail.com",
    appoinment: new Date("2023-03-03"),
  },
  {
    id: "2",
    name: "LU STA",
    Batch: "56",
    TeamMemberOne: "Md. Shahinur Rahman",
    TeamMemberTwo: "Taslima Hussain Enas",
    TeamMemberThree: "Amira Mostofa Chowdhury",
    Email: "cse_1932020044@lus.ac.bd",
    appoinment: new Date("2023-03-21"),
  },
];

export const ProjectContext = createContext({
  projectTeams: [],
  addTeam: ({
    name,
    Batch,
    TeamMemberOne,
    TeamMemberTwo,
    TeamMemberThree,
    Email,
    appoinment,
  }) => {},
  deleteTeam: (id) => {},
  updateTeam: (
    id,
    {
      name,
      Batch,
      TeamMemberOne,
      TeamMemberTwo,
      TeamMemberThree,
      Email,
      appoinment,
    }
  ) => {},
});

function TeamReducer(state, action) {
  switch (action.type) {
    case "ADD":
      const id = new Date().toString() + Math.random().toString();
      return [{ ...action.payload, id: id }, ...state];
    case "DELETE":
      return state.filter((team) => team.id !== action.payload);
    case "UPDATE":
      const updateableIndex = state.findIndex(
        (team) => team.id === action.payload.id
      );
      const updateableTeam = state[updateableIndex];
      const updatedItem = { ...updateableTeam, ...action.payload.data };
      const Teams = [...state];
      Teams[updateableIndex] = updatedItem;
      return Teams;
    default:
      return state;
  }
}
export default function ProjectContextProvider({ children }) {
  const [teamState, dispatch] = useReducer(TeamReducer, DummyTeams);
  function addTeam(teamData) {
    dispatch({ type: "ADD", payload: teamData });
  }

  function deleteTeam(id) {
    dispatch({ type: "DELETE", payload: id });
  }

  function updateTeam(id, teamData) {
    dispatch({ type: "UPDATE", payload: { id: id, data: teamData } });
  }

  const value = {
    projectTeams: teamState,
    addTeam: addTeam,
    updateTeam: updateTeam,
    deleteTeam: deleteTeam,
  };
  return (
    <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>
  );
}
