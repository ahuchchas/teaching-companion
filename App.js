import { useContext } from "react";
import { StatusBar } from "expo-status-bar";

import { TouchableOpacity, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";

import HomeScreen from "./screens/HomeScreen";

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
import { GlobalStyles, Colors } from "./constants/styles";
import TasksContextProvider from "./store/task-context";
import CoursesContextProvider from "./store/course-context";
import ProjectContextProvider from "./store/project-team-context";
import AuthContextProvider from "./store/auth-context";
import { AuthContext } from "./store/auth-context";

import TodoContextProvider from "./store/todo-context";
import AllTodos from "./screens/TodoScreens/AllTodos";
import TodaysTodos from "./screens/TodoScreens/TodaysTodos";
import UpcomingSevenDaysTodo from "./screens/TodoScreens/UpcomingSevenDaysTodo";
import TodoForm from "./screens/TodoScreens/TodoForm";

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

function TodoScreens() {
  return (
    <TodoContextProvider>
      <Stack.Navigator
        initialRouteName="AllTodos"
        screenOptions={{
          headerStyle: { backgroundColor: GlobalStyles.colors.header },
          headerTintColor: "white",
        }}
      >
        <Stack.Screen
          name="AllTodos"
          component={AllTodos}
          options={{
            title: "All Todos",
          }}
        />
        <Stack.Screen
          name="TodaysTodos"
          component={TodaysTodos}
          options={{
            title: "Todays Todos",
          }}
        />

        <Stack.Screen
          name="UpcomingSevenDaysTodo"
          component={UpcomingSevenDaysTodo}
          options={{
            title: "UpComing 7 days Todo",
          }}
        />

        <Stack.Screen
          name="TodoForm"
          component={TodoForm}
          options={{
            title: "Todo Form",
          }}
        />
      </Stack.Navigator>
    </TodoContextProvider>
  );
}
// Authentication part

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: GlobalStyles.colors.header },
        headerTintColor: "white",
        contentStyle: { backgroundColor: "white" },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  const authCtx = useContext(AuthContext);
  return (
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
          headerRight: ({ tintColor }) => (
            <TouchableOpacity onPress={authCtx.logout}>
              <Text
                style={{
                  color: tintColor,
                  fontWeight: "bold",
                  borderColor: "white",
                  borderWidth: 1,
                  borderRadius: 4,
                  padding: 6,
                }}
              >
                Logout
              </Text>
            </TouchableOpacity>
          ),
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
        name="TodoScreens"
        component={TodoScreens}
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
  );
}

function Navigation() {
  const authCtx = useContext(AuthContext);

  return (
    <NavigationContainer>
      {!authCtx.isAuthenticated && <AuthStack />}
      {authCtx.isAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <AuthContextProvider>
        <Navigation />
      </AuthContextProvider>
    </>
  );
}
