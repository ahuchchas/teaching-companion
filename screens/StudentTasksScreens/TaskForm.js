import {
  Text,
  TextInput,
  View,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
} from "react-native";
import Button from "../../components/UI/Button";
import { useContext, useState } from "react";
import { TasksContext } from "../../store/task-context";
import { storeTask, updateTask } from "../../util/httpStudentTask";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Feather } from "@expo/vector-icons";

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
      value: selectedTask ? selectedTask.deadline : new Date(),
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

  async function submitHandler() {
    const taskData = {
      title: inputs.title.value,
      description: inputs.description.value,
      courseTitle: inputs.courseTitle.value,
      courseCode: inputs.courseCode.value,
      section: inputs.section.value,
      deadline: inputs.deadline.value,
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
      Alert.alert(
        "Invalid input",
        "Please check your input values. Make sure that no field is empty."
      );
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
      await updateTask(selectedTaskId, taskData);
    } else {
      const id = await storeTask(taskData);
      tasksCtx.addTask({ id: id, ...taskData });
    }
    navigation.goBack();
  }

  const [showPicker, setShowPicker] = useState(false);

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.key}>Task title:</Text>
        <TextInput
          style={[styles.value, !inputs.title.isValid && styles.errorStyle]}
          value={inputs.title.value}
          onChangeText={(enteredValue) =>
            inputChangedHandler("title", enteredValue)
          }
        />

        <Text style={styles.key}>Task description:</Text>
        <TextInput
          multiline
          style={[
            styles.value,
            !inputs.description.isValid && styles.errorStyle,
          ]}
          value={inputs.description.value}
          onChangeText={(enteredValue) =>
            inputChangedHandler("description", enteredValue)
          }
        />

        <Text style={styles.key}>Course title:</Text>
        <TextInput
          style={[
            styles.value,
            !inputs.courseTitle.isValid && styles.errorStyle,
          ]}
          value={inputs.courseTitle.value}
          onChangeText={(enteredValue) =>
            inputChangedHandler("courseTitle", enteredValue)
          }
        />

        <Text style={styles.key}>Course code:</Text>
        <TextInput
          style={[
            styles.value,
            !inputs.courseCode.isValid && styles.errorStyle,
          ]}
          value={inputs.courseCode.value}
          onChangeText={(enteredValue) =>
            inputChangedHandler("courseCode", enteredValue)
          }
        />

        <Text style={styles.key}>Batch and section:</Text>
        <TextInput
          style={[styles.value, !inputs.section.isValid && styles.errorStyle]}
          value={inputs.section.value}
          onChangeText={(enteredValue) =>
            inputChangedHandler("section", enteredValue)
          }
        />

        <Text style={styles.key}>Submission deadline:</Text>
        <View
          style={[
            styles.value,
            { flexDirection: "row", justifyContent: "space-between" },
          ]}
        >
          <Text>{inputs.deadline.value.toString().slice(0, 24)}</Text>
          <TouchableOpacity
            onPress={() => {
              setShowPicker(!showPicker);
            }}
          >
            <Feather name="edit" size={24} color="teal" />
          </TouchableOpacity>
        </View>

        <DateTimePickerModal
          isVisible={showPicker}
          mode={"datetime"}
          date={new Date(inputs.deadline.value)}
          //timeZoneOffsetInMinutes={60 * 6}
          onConfirm={(date) => {
            //console.log(date.getTimezoneOffset());
            const enteredValue = date;
            inputChangedHandler("deadline", enteredValue);
            setShowPicker(!showPicker);
          }}
          onCancel={() => {
            setShowPicker(!showPicker);
          }}
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
    borderBottomWidth: 1,
    borderBottomColor: "darkcyan",
    backgroundColor: "#f2f2f2",
    fontSize: 16,
    padding: 8,
    margin: 4,
  },
  errorStyle: {
    backgroundColor: "#ffd6cc",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 4,
    marginVertical: 24,
  },
});
