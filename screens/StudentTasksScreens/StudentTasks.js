import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { TasksContext } from "../../store/task-context";
import { useContext, useEffect, useState } from "react";
import TaskItem from "../../components/TaskComponents/TaskItem";
import { fetchTasks } from "../../util/httpStudentTask";
import LoadingOverlay from "../../components/UI/LoadingOverlay";

export default function StudentTasks({ navigation }) {
  const tasksCtx = useContext(TasksContext);

  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    async function getTasks() {
      setIsFetching(true);
      const tasks = await fetchTasks();
      tasksCtx.setTasks(tasks);
      setIsFetching(false);
    }

    getTasks();
  }, []);

  if (isFetching) {
    return <LoadingOverlay message="Loading Student Tasks..." />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.taskListContainer}>
        <FlatList
          ListHeaderComponent={
            <>
              <View style={styles.taskIconContainer}>
                <FontAwesome name="tasks" size={36} color="teal" />
              </View>
              <TouchableOpacity onPress={() => navigation.navigate("TaskForm")}>
                <View style={styles.addBtn}>
                  <MaterialIcons name="add-task" size={24} color="teal" />
                  <Text style={styles.addTask}>ADD NEW TASK</Text>
                </View>
              </TouchableOpacity>
            </>
          }
          data={tasksCtx.tasks}
          renderItem={({ item }) => (
            <TaskItem
              id={item.id}
              title={item.title}
              deadline={item.deadline}
              courseTitle={item.courseTitle}
              section={item.section}
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
  addBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    margin: 20,
    paddingVertical: 8,
    borderColor: "teal",
    borderWidth: 1,
    backgroundColor: "#e6e6e6",
    borderRadius: 8,
  },
  addTask: {
    fontSize: 16,
    color: "teal",
    marginLeft: 6,
    fontWeight: "bold",
  },
  taskListContainer: {
    flex: 1,
  },
  taskIconContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: 60,
    alignSelf: "center",
    marginTop: 12,
  },
});
