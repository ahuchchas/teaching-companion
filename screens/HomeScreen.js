import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import HomeOption from "../components/HomeOption";
import { GlobalStyles } from "../constants/styles";

export default function HomeScreen({ navigation }) {
  const homeOptionList = [
    {
      id: "homeOp1",
      title: "See Routine",
      icon: "calendar",
      navigateTo: () => navigation.navigate("TeacherRoutine"),
    },
    {
      id: "homeOp2",
      title: "Tasks for students",
      icon: "clipboard",
      navigateTo: () => navigation.navigate("StudentTasksScreens"),
    },
    {
      id: "homeOp3",
      title: "Manage Courses",
      icon: "newspaper",
      navigateTo: () => navigation.navigate("ManageCourses"),
    },
    {
      id: "homeOp4",
      title: "Project Teams",
      icon: "people",
      navigateTo: () => navigation.navigate("ProjectTeams"),
    },
    {
      id: "homeOp5",
      title: "About the app",
      icon: "information-circle",
      navigateTo: () => navigation.navigate("AboutScreen"),
    },
  ];

  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={(item) => item.id}
        data={homeOptionList}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={item.navigateTo}>
            <HomeOption title={item.title} icon={item.icon} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    padding: 12,
  },
});
