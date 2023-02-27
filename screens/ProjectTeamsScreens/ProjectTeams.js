import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import ProjectTeam from "../../components/ProjectTeamComponents/ProjectTeam";
import { ProjectContext } from "../../store/project-team-context";
import { Ionicons } from "@expo/vector-icons";
import { fetchProjectTeamData } from "../../util/httpProjectTeam";
import { useEffect, useState, useContext } from "react";
import LoadingOverlay from "../../components/UI/LoadingOverlay";

export default function ProjectTeams({ navigation }) {
  const TeamContx = useContext(ProjectContext);

  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    async function getTeamData() {
      setIsFetching(true);
      const projectTeams = await fetchProjectTeamData();
      TeamContx.setTeamData(projectTeams);
      setIsFetching(false);
    }
    getTeamData();
  }, []);

  if (isFetching) {
    return <LoadingOverlay message="Loading Project Teams..." />;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate("ProjectTeamForm")}>
        <View style={styles.option}>
          <Ionicons name="add-circle" size={20} color="#2B5876" />
          <Text style={styles.title}>ADD NEW TEAM</Text>
        </View>
      </TouchableOpacity>

      <FlatList
        data={TeamContx.projectTeams}
        renderItem={({ item }) => <ProjectTeam info={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  option: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    margin: 24,
  },
  title: {
    fontSize: 16,
    color: "#2B5876",
    marginLeft: 6,
    fontWeight: "bold",
  },
});
