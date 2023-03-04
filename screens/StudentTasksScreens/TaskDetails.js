import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Alert,
  TextInput,
} from "react-native";
import Button from "../../components/UI/Button";
import { useContext, useState } from "react";
import { TasksContext } from "../../store/task-context";
import { deleteTask } from "../../util/httpStudentTask";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function TaskDetails({ navigation, route }) {
  const tasksCtx = useContext(TasksContext);

  const selectedTaskId = route.params.taskId;
  const selectedTask = tasksCtx.tasks.find(
    (task) => task.id === selectedTaskId
  );

  async function scheduledNotificationHandler(mins) {
    let date = selectedTask.deadline;
    date.setMinutes(date.getMinutes() - mins);
    let title = selectedTask.title + " for " + selectedTask.section;
    let body = "Deadline is : " + selectedTask.deadline.toString().slice(0, 16);
    await Notifications.scheduleNotificationAsync({
      content: {
        title: title,
        body: body,
        //sound: "mySoundFile.wav", // Provide ONLY the base filename
      },
      trigger: {
        date: date,
      },
    });
    Alert.alert(
      "Done",
      `You will be notified ${mins} minutes before the deadline`
    );
  }

  async function deletePressHandler() {
    tasksCtx.deleteTask(selectedTaskId);
    navigation.goBack();
    await deleteTask(selectedTaskId);
  }
  function editPressHandler() {
    navigation.navigate("TaskForm", { taskId: selectedTaskId });
  }

  const [mins, setMins] = useState(0);

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
          {selectedTask.deadline.toString().slice(0, 16)} |{"  "}
          {selectedTask.deadline.toString().slice(16, 24)}
        </Text>

        <Text style={styles.key}>Get reminder before ? minutes:</Text>
        <TextInput
          style={{
            borderColor: "teal",
            borderWidth: 1,
            borderRadius: 4,
            marginBottom: 12,
            paddingHorizontal: 6,
          }}
          onChangeText={(val) => setMins(val)}
        />

        <Button
          title="Set reminder"
          color={"darkcyan"}
          onPress={() => scheduledNotificationHandler(mins)}
        />

        <View style={styles.buttonContainer}>
          <Button title="Edit" color="darkcyan" onPress={editPressHandler} />
          <Button title="Delete" color="brown" onPress={deletePressHandler} />
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
    backgroundColor: "#f2f2f2",
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
