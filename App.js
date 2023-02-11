import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./screens/HomeScreen";
import TeacherRoutine from "./screens/TeacherRoutine";

import StudentTasks from "./screens/StudentTasksScreens/StudentTasks";
import TaskDetails from "./screens/StudentTasksScreens/TaskDetails";
import TaskForm from "./screens/StudentTasksScreens/TaskForm";

import ManageCourses from "./screens/ManageCoursesScreens/ManageCourses";
import CourseTopics from "./screens/ManageCoursesScreens/CourseTopics";
import CourseForm from "./screens/ManageCoursesScreens/CourseForm";
import TopicForm from "./screens/ManageCoursesScreens/TopicForm";

import ProjectTeams from "./screens/ProjectTeamsScreens/ProjectTeams";
import ProjectTeamForm from "./screens/ProjectTeamsScreens/ProjectTeamForm";
import AboutScreen from "./screens/AboutScreen";
import { GlobalStyles } from "./constants/styles";
import TasksContextProvider from "./store/task-context";
import CoursesContextProvider from "./store/course-context";
import ProjectContextProvider from "./store/project-team-context";

const Stack = createNativeStackNavigator();

function StudentTasksScreens() {
  return (
    <TasksContextProvider>
      <Stack.Navigator
        initialRouteName="StudentTasks"
        screenOptions={{
          headerStyle: { backgroundColor: GlobalStyles.colors.header },
          headerTintColor: "white",
        }}
      >
        <Stack.Screen
          name="StudentTasks"
          component={StudentTasks}
          options={{
            title: "Student Tasks",
          }}
        />
        <Stack.Screen
          name="TaskDetails"
          component={TaskDetails}
          options={{
            title: "Task Details",
          }}
        />
        <Stack.Screen
          name="TaskForm"
          component={TaskForm}
          options={{
            title: "Task Form",
          }}
        />
      </Stack.Navigator>
    </TasksContextProvider>
  );
}

function ManageCoursesScreens() {
  return (
    <CoursesContextProvider>
      <Stack.Navigator
        initialRouteName="ManageCourses"
        screenOptions={{
          headerStyle: { backgroundColor: GlobalStyles.colors.header },
          headerTintColor: "white",
        }}
      >
        <Stack.Screen
          name="ManageCourses"
          component={ManageCourses}
          options={{
            title: "Manage Courses",
          }}
        />
        <Stack.Screen
          name="CourseTopics"
          component={CourseTopics}
          options={{
            title: "Course Topics",
          }}
        />
        <Stack.Screen
          name="CourseForm"
          component={CourseForm}
          options={{
            title: "Course Details",
          }}
        />
        <Stack.Screen
          name="TopicForm"
          component={TopicForm}
          options={{
            title: "Topic Details",
          }}
        />
      </Stack.Navigator>
    </CoursesContextProvider>
  );
}

function ProjectTeamsScreens() {
  return (
    <ProjectContextProvider>
      <Stack.Navigator
        initialRouteName="ProjectTeams"
        screenOptions={{
          headerStyle: { backgroundColor: GlobalStyles.colors.header },
          headerTintColor: "white",
        }}
      >
        <Stack.Screen
          name="ProjectTeams"
          component={ProjectTeams}
          options={{
            title: "Project Teams",
          }}
        />
        <Stack.Screen
          name="ProjectTeamForm"
          component={ProjectTeamForm}
          options={{
            title: "Team Form",
          }}
        />
      </Stack.Navigator>
    </ProjectContextProvider>
  );
}
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
              headerStyle: { backgroundColor: GlobalStyles.colors.header },
              headerTintColor: "white",
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
            name="StudentTasksScreens"
            component={StudentTasksScreens}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ManageCoursesScreens"
            component={ManageCoursesScreens}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ProjectTeamsScreens"
            component={ProjectTeamsScreens}
            options={{ headerShown: false }}
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
