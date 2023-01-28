import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GlobalStyles } from "../constants/styles";
import TaskItem from "../components/TaskItem";
import { useState } from "react";

export default function StudentTasks({ navigation }) {
  const taskList = [
    {
      id: "task1",
      title: "Compiler Assignment",
      description: "Solve the given problems and submit the hardcopy",
      courseTitle: "Compiler Design",
      courseCode: "CSE-3315",
      section: "52",
      deadline: new Date("2023-02-19"),
    },
    {
      id: "task2",
      title: "Compiler Assignment",
      description: "Solve the given problems and submit the hardcopy",
      courseTitle: "Compiler Design",
      courseCode: "CSE-3315",
      section: "52",
      deadline: new Date("2023-02-19"),
    },
    {
      id: "task3",
      title: "Compiler Assignment",
      description: "Solve the given problems and submit the hardcopy",
      courseTitle: "Compiler Design",
      courseCode: "CSE-3315",
      section: "52",
      deadline: new Date("2023-02-19"),
    },
    {
      id: "task4",
      title: "Compiler Assignment",
      description: "Solve the given problems and submit the hardcopy",
      courseTitle: "Compiler Design",
      courseCode: "CSE-3315",
      section: "52",
      deadline: new Date("2023-02-19"),
    },
    {
      id: "task5",
      title: "Compiler Assignment",
      description: "Solve the given problems and submit the hardcopy",
      courseTitle: "Compiler Design",
      courseCode: "CSE-3315",
      section: "52",
      deadline: new Date("2023-02-19"),
    },
    {
      id: "task6",
      title: "Compiler Assignment",
      description: "Solve the given problems and submit the hardcopy",
      courseTitle: "Compiler Design",
      courseCode: "CSE-3315",
      section: "52",
      deadline: new Date("2023-02-19"),
    },
    {
      id: "task7",
      title: "Compiler Assignment",
      description: "Solve the given problems and submit the hardcopy",
      courseTitle: "Compiler Design",
      courseCode: "CSE-3315",
      section: "52",
      deadline: new Date("2023-02-19"),
    },
  ];

  const [tasks, setTasks] = useState(taskList);

  function taskItemPressed() {}
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <View style={styles.option}>
          <Ionicons name="add-circle" size={20} color="darkslategrey" />
          <Text style={styles.title}>ADD NEW TASK</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.taskListContainer}>
        <FlatList
          data={tasks}
          renderItem={({ item }) => (
            <TaskItem title={item.title} deadline={item.deadline} />
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    margin: 12,
    elevation: 4,
    backgroundColor: GlobalStyles.colors.item,
    borderRadius: 8,
  },
  taskListContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    color: "black",
    marginLeft: 6,
    fontWeight: "bold",
  },
});
