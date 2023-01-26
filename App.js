import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./screens/HomeScreen";
import TeacherRoutine from "./screens/TeacherRoutine";
import StudentTasks from "./screens/StudentTasks";
import ManageCourses from "./screens/ManageCourses";
import ProjectTeams from "./screens/ProjectTeams";
import AboutScreen from "./screens/AboutScreen";
import { GlobalStyles } from "./constants/styles";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="HomeScreen"
          screenOptions={{
            headerStyle: { backgroundColor: GlobalStyles.colors.header },
            headerTintColor: "white",
          }}
        >
          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{
              title: "Home",
            }}
          />
          <Stack.Screen
            name="TeacherRoutine"
            component={TeacherRoutine}
            options={{
              title: "Teacher Routine",
            }}
          />
          <Stack.Screen
            name="StudentTasks"
            component={StudentTasks}
            options={{
              title: "Student Tasks",
            }}
          />
          <Stack.Screen
            name="ManageCourses"
            component={ManageCourses}
            options={{
              title: "Manage Courses",
            }}
          />
          <Stack.Screen
            name="ProjectTeams"
            component={ProjectTeams}
            options={{
              title: "Project Teams",
            }}
          />
          <Stack.Screen
            name="AboutScreen"
            component={AboutScreen}
            options={{
              title: "About",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
