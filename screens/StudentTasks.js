import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GlobalStyles } from "../constants/styles";
import { TasksContext } from "../store/task-context";
import { useContext } from "react";
import TaskItem from "../components/TaskComponents/TaskItem";

export default function StudentTasks({ navigation }) {
  const tasksCtx = useContext(TasksContext);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate("TaskForm")}>
        <View style={styles.option}>
          <Ionicons name="add-circle" size={20} color="darkslategrey" />
          <Text style={styles.title}>ADD NEW TASK</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.taskListContainer}>
        <FlatList
          data={tasksCtx.tasks}
          renderItem={({ item }) => (
            <TaskItem
              id={item.id}
              title={item.title}
              deadline={item.deadline}
            />
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
