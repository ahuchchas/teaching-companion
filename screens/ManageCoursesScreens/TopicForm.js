import {
  Text,
  TextInput,
  View,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import Button from "../../components/UI/Button";
import { useContext, useState } from "react";
import { CoursesContext } from "../../store/course-context";
import { updateCourse } from "../../util/httpCourse";
import { arrayToObject } from "../../util/converter";

export default function TopicForm({ navigation, route }) {
  const coursesCtx = useContext(CoursesContext);

  const courseId = route.params.courseId;

  const [inputs, setInputs] = useState({
    topicName: {
      value: "",
      isValid: true,
    },
    classNeeded: {
      value: "",
      isValid: true,
    },
    isCompleted: {
      value: false,
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
    const topicData = {
      topicName: inputs.topicName.value,
      classNeeded: inputs.classNeeded.value,
      isCompleted: inputs.isCompleted.value,
    };

    const topicNameIsValid = topicData.topicName.trim().length > 0;
    const classNeededIsValid =
      !isNaN(topicData.classNeeded) && topicData.classNeeded.trim().length > 0;

    if (!topicNameIsValid || !classNeededIsValid) {
      Alert.alert(
        "Invalid input",
        "Please check your input values. Make sure that no field is empty and required class field input is a number"
      );
      setInputs((currentInputs) => {
        return {
          topicName: {
            value: currentInputs.topicName.value,
            isValid: topicNameIsValid,
          },
          classNeeded: {
            value: currentInputs.classNeeded.value,
            isValid: classNeededIsValid,
          },
          isCompleted: {
            value: currentInputs.isCompleted.value,
          },
        };
      });

      return;
    }

    await coursesCtx.addTopic(courseId, topicData);

    let courseData = coursesCtx.courses.find((c) => c.courseId === courseId);
    //console.log(courseData);

    const newTopicList = arrayToObject(courseData.topicList);
    //console.log(newTopicList);
    courseData = { ...courseData, topicList: newTopicList };
    //console.log(courseData);

    await updateCourse(courseId, courseData);

    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.key}>Topic Name:</Text>
        <TextInput
          style={[styles.value, !inputs.topicName.isValid && styles.errorStyle]}
          value={inputs.topicName.value}
          onChangeText={(enteredValue) =>
            inputChangedHandler("topicName", enteredValue)
          }
        />

        <Text style={styles.key}>Required classes to complete the topic:</Text>
        <TextInput
          style={[
            styles.value,
            !inputs.classNeeded.isValid && styles.errorStyle,
          ]}
          value={inputs.classNeeded.value}
          onChangeText={(enteredValue) =>
            inputChangedHandler("classNeeded", enteredValue)
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
