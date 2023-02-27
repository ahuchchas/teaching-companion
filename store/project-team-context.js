import { createContext } from "react";
import { useReducer } from "react";

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
  setTeamData: (projectTeams) => {},
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
      return [action.payload, ...state];
    case "DELETE":
      return state.filter((team) => team.id !== action.payload);
    case "SET":
      const inverted = action.payload.reverse();
      return inverted;
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
  const [teamState, dispatch] = useReducer(TeamReducer, []);
  function addTeam(teamData) {
    dispatch({ type: "ADD", payload: teamData });
  }

  function deleteTeam(id) {
    dispatch({ type: "DELETE", payload: id });
  }

  function updateTeam(id, teamData) {
    dispatch({ type: "UPDATE", payload: { id: id, data: teamData } });
  }

  function setTeamData(projectTeams) {
    dispatch({ type: "SET", payload: projectTeams });
  }
  const value = {
    projectTeams: teamState,
    addTeam: addTeam,
    setTeamData: setTeamData,
    updateTeam: updateTeam,
    deleteTeam: deleteTeam,
  };
  return (
    <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>
  );
}
