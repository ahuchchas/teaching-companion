import {
  Text,
  TextInput,
  View,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import Button from "../UI/Button";
import { useContext, useState } from "react";
import { TasksContext } from "../../store/task-context";

export default function TaskForm({ navigation, route }) {
  const tasksCtx = useContext(TasksContext);

  const selectedTaskId = route.params?.taskId;
  const selectedTask = selectedTaskId
    ? tasksCtx.tasks.find((task) => task.id === selectedTaskId)
    : undefined;
  const isEditing = selectedTaskId ? true : false;

  const [inputs, setInputs] = useState({
    title: {
      value: selectedTask ? selectedTask.title.toString() : "",
      isValid: true,
    },
    description: {
      value: selectedTask ? selectedTask.description.toString() : "",
      isValid: true,
    },
    courseTitle: {
      value: selectedTask ? selectedTask.courseTitle.toString() : "",
      isValid: true,
    },
    courseCode: {
      value: selectedTask ? selectedTask.courseCode.toString() : "",
      isValid: true,
    },
    section: {
      value: selectedTask ? selectedTask.section.toString() : "",
      isValid: true,
    },
    deadline: {
      value: selectedTask
        ? selectedTask.deadline.toISOString().slice(0, 10)
        : "",
      isValid: true,
    },
  });

  function inputChangedHandler(inputIdentifier, enteredValue) {
    setInputs((currentInputs) => {
      return {
        ...currentInputs,
        [inputIdentifier]: {
          value: enteredValue,
          isValid: true,
        },
      };
    });
  }

  function submitHandler() {
    const taskData = {
      title: inputs.title.value,
      description: inputs.description.value,
      courseTitle: inputs.courseTitle.value,
      courseCode: inputs.courseCode.value,
      section: inputs.section.value,
      deadline: new Date(inputs.deadline.value),
    };

    const titleIsValid = taskData.title.trim().length > 0;
    const descriptionIsValid = taskData.description.trim().length > 0;
    const courseTitleIsValid = taskData.courseTitle.trim().length > 0;
    const courseCodeIsValid = taskData.courseCode.trim().length > 0;
    const sectionIsValid = taskData.section.trim().length > 0;

    const deadlineIsValid = taskData.deadline.toString() !== "Invalid Date";

    if (
      !titleIsValid ||
      !descriptionIsValid ||
      !courseTitleIsValid ||
      !courseCodeIsValid ||
      !sectionIsValid ||
      !deadlineIsValid
    ) {
      Alert.alert("Invalid input", "Please check your input values");
      setInputs((currentInputs) => {
        return {
          title: {
            value: currentInputs.title.value,
            isValid: titleIsValid,
          },
          description: {
            value: currentInputs.description.value,
            isValid: descriptionIsValid,
          },
          courseTitle: {
            value: currentInputs.courseTitle.value,
            isValid: courseCodeIsValid,
          },
          courseCode: {
            value: currentInputs.courseCode.value,
            isValid: courseCodeIsValid,
          },
          section: {
            value: currentInputs.section.value,
            isValid: sectionIsValid,
          },
          deadline: {
            value: currentInputs.deadline.value,
            isValid: deadlineIsValid,
          },
        };
      });

      return;
    }

    if (isEditing) {
      tasksCtx.updateTask(selectedTaskId, taskData);
    } else {
      tasksCtx.addTask(taskData);
    }
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.key}>Task title:</Text>
        <TextInput
          style={styles.value}
          value={inputs.title.value}
          onChangeText={(enteredValue) =>
            inputChangedHandler("title", enteredValue)
          }
        />

        <Text style={styles.key}>Task description:</Text>
        <TextInput
          multiline
          style={styles.value}
          value={inputs.description.value}
          onChangeText={(enteredValue) =>
            inputChangedHandler("description", enteredValue)
          }
        />

        <Text style={styles.key}>Course title:</Text>
        <TextInput
          style={styles.value}
          value={inputs.courseTitle.value}
          onChangeText={(enteredValue) =>
            inputChangedHandler("courseTitle", enteredValue)
          }
        />

        <Text style={styles.key}>Course code:</Text>
        <TextInput
          style={styles.value}
          value={inputs.courseCode.value}
          onChangeText={(enteredValue) =>
            inputChangedHandler("courseCode", enteredValue)
          }
        />

        <Text style={styles.key}>Batch and section:</Text>
        <TextInput
          style={styles.value}
          value={inputs.section.value}
          onChangeText={(enteredValue) =>
            inputChangedHandler("section", enteredValue)
          }
        />

        <Text style={styles.key}>Submission deadline:</Text>
        <TextInput
          style={styles.value}
          placeholder="YYYY-MM-DD"
          value={inputs.deadline.value}
          onChangeText={(enteredValue) =>
            inputChangedHandler("deadline", enteredValue)
          }
        />

        <View style={styles.buttonContainer}>
          <Button title="Save" color="darkcyan" onPress={submitHandler} />
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
    borderWidth: 1,
    borderColor: "darkcyan",
    borderRadius: 4,
    fontSize: 16,
    padding: 8,
    margin: 4,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 4,
    marginVertical: 24,
  },
});
