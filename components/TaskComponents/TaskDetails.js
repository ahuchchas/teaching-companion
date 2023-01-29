import { StyleSheet, View, Text, ScrollView } from "react-native";
import Button from "../UI/Button";
import { useContext } from "react";
import { TasksContext } from "../../store/task-context";

export default function TaskDetails({ navigation, route }) {
  const tasksCtx = useContext(TasksContext);

  const selectedTaskId = route.params.taskId;
  const selectedTask = tasksCtx.tasks.find(
    (task) => task.id === selectedTaskId
  );

  function deletePressHandler() {
    tasksCtx.deleteTask(selectedTaskId);
    navigation.goBack();
  }
  function editPressHandler() {
    navigation.navigate("TaskForm", { taskId: selectedTaskId });
  }
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.key}>Task title:</Text>
        <Text style={styles.value}>{selectedTask.title}</Text>

        <Text style={styles.key}>Task description:</Text>
        <Text style={styles.value}>{selectedTask.description}</Text>

        <Text style={styles.key}>Course title:</Text>
        <Text style={styles.value}>{selectedTask.courseTitle}</Text>

        <Text style={styles.key}>Course code:</Text>
        <Text style={styles.value}>{selectedTask.courseCode}</Text>

        <Text style={styles.key}>Batch and section:</Text>
        <Text style={styles.value}>{selectedTask.section}</Text>

        <Text style={styles.key}>Submission deadline:</Text>
        <Text style={styles.value}>
          {selectedTask.deadline.toISOString().slice(0, 10)}
        </Text>

        <View style={styles.buttonContainer}>
          <Button title="Edit" color="darkcyan" onPress={editPressHandler} />
          <Button title="Delete" color="salmon" onPress={deletePressHandler} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 12,
  },
  key: {
    fontSize: 16,
    fontWeight: "bold",
    margin: 4,
    marginTop: 12,
  },
  value: {
    backgroundColor: "lightgray",
    borderRadius: 4,
    fontSize: 16,
    padding: 8,
    margin: 4,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 24,
    marginVertical: 24,
  },
});
