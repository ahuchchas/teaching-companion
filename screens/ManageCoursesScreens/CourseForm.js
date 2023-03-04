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
import { storeCourse, updateCourse } from "../../util/httpCourse";
import { arrayToObject } from "../../util/converter";

export default function CourseForm({ navigation, route }) {
  const coursesCtx = useContext(CoursesContext);

  const selectedCourseId = route.params?.courseId;
  const selectedCourse = selectedCourseId
    ? coursesCtx.courses.find((course) => course.courseId === selectedCourseId)
    : undefined;
  const isEditing = selectedCourseId ? true : false;

  const [inputs, setInputs] = useState({
    courseTitle: {
      value: selectedCourse ? selectedCourse.courseTitle.toString() : "",
      isValid: true,
    },
    courseCode: {
      value: selectedCourse ? selectedCourse.courseCode.toString() : "",
      isValid: true,
    },
    topicList: {
      value: selectedCourse ? selectedCourse.topicList : [],
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
    const courseData = {
      courseTitle: inputs.courseTitle.value,
      courseCode: inputs.courseCode.value,
      topicList: inputs.topicList.value,
    };

    const courseTitleIsValid = courseData.courseTitle.trim().length > 0;
    const courseCodeIsValid = courseData.courseCode.trim().length > 0;

    if (!courseTitleIsValid || !courseCodeIsValid) {
      Alert.alert(
        "Invalid input",
        "Please check your input values. Make sure that no field is empty"
      );
      setInputs((currentInputs) => {
        return {
          courseTitle: {
            value: currentInputs.courseTitle.value,
            isValid: courseTitleIsValid,
          },
          courseCode: {
            value: currentInputs.courseCode.value,
            isValid: courseCodeIsValid,
          },
          topicList: {
            value: currentInputs.topicList.value,
          },
        };
      });

      return;
    }

    if (isEditing) {
      coursesCtx.updateCourse(selectedCourseId, courseData);
      const newTopicList = arrayToObject(courseData.topicList);
      await updateCourse(selectedCourseId, {
        ...courseData,
        topicList: newTopicList,
      });
    } else {
      const newTopicList = arrayToObject(courseData.topicList);
      const courseId = await storeCourse({
        ...courseData,
        topicList: newTopicList,
      });
      //console.log(courseId);
      coursesCtx.addCourse({ courseId: courseId, ...courseData });
    }
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <ScrollView>
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
