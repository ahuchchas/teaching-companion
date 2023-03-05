import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text,
} from "react-native";
import HomeOption from "../components/HomeOption";
import { GlobalStyles } from "../constants/styles";

export default function HomeScreen({ navigation }) {
  const homeOptionList = [
    {
      id: "homeOp2",
      title: "Tasks for students",
      icon: "clipboard-outline",
      navigateTo: () => navigation.navigate("StudentTasksScreens"),
    },
    {
      id: "homeOp3",
      title: "Manage Courses",
      icon: "newspaper-outline",
      navigateTo: () => navigation.navigate("ManageCoursesScreens"),
    },
    {
      id: "homeOp4",
      title: "To-do",
      icon: "calendar-outline",
      navigateTo: () => navigation.navigate("TodoScreens"),
    },
    {
      id: "homeOp5",
      title: "Project Teams",
      icon: "people-outline",
      navigateTo: () => navigation.navigate("ProjectTeamsScreens"),
    },
    {
      id: "homeOp6",
      title: "About the app",
      icon: "information-circle-outline",
      navigateTo: () => navigation.navigate("AboutScreen"),
    },
  ];

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <>
            <View style={styles.textBox}>
              <Text style={styles.text1}>Welcome</Text>
              <Text style={styles.text2}></Text>
              <Text style={styles.text3}>
                Please select your desired service from below.
              </Text>
            </View>
          </>
        }
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
  textBox: {
    marginTop: 20,
    marginLeft: 8,
    marginBottom: 36,
    height: 130,
    width: 200,
    borderBottomWidth: 1,
    borderBottomColor: "teal",
  },
  text1: {
    fontSize: 28,
    marginBottom: 12,
  },
  text2: {
    fontSize: 18,
  },
  text3: {},
});
