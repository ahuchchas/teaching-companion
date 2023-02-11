import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { CoursesContext } from "../../store/course-context";
import { useContext } from "react";

export default function CourseItem({ courseId, courseTitle, courseCode }) {
  const coursesCtx = useContext(CoursesContext);
  const targetCourse = coursesCtx.courses.find(
    (course) => course.courseId === courseId
  );
  let topicCompleted = 0;
  let requiredClasses = 0;
  targetCourse.topicList.map((topic) => {
    if (topic.isCompleted) topicCompleted++;
    else requiredClasses += topic.classNeeded;
  });
  let progress = (topicCompleted / targetCourse.topicList.length) * 100;
  if (targetCourse.topicList.length < 1) progress = 0;

  const navigation = useNavigation();
  function coursePressHandler() {
    navigation.navigate("CourseTopics", { courseId: courseId });
  }
  return (
    <TouchableOpacity onPress={coursePressHandler}>
      <View style={styles.option}>
        <View style={styles.rowView}>
          <View style={{ maxWidth: 200 }}>
            <Text style={styles.courseTitle}>{courseTitle}</Text>
            <Text style={styles.courseCode}>{courseCode}</Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <Text style={styles.progress}>Progress</Text>
            <Text style={{ fontWeight: "bold" }}>{progress.toFixed(2)}%</Text>
          </View>
        </View>
        <View>
          <Text>Required classes for the course: {requiredClasses}</Text>
        </View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("CourseForm", { courseId: courseId })
          }
        >
          <Text style={styles.editBtn}>Edit Course</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  option: {
    padding: 18,
    margin: 12,
    backgroundColor: "#9aa6b1",
    borderRadius: 8,
  },
  rowView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  progress: {
    fontSize: 16,
    paddingBottom: 6,
    marginBottom: 6,
    borderBottomColor: "teal",
    borderBottomWidth: 1,
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },

  courseCode: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333333",
  },

  editBtn: {
    color: "teal",
    marginTop: 8,
    paddingTop: 8,
    textAlign: "center",
    borderTopColor: "gray",
    borderTopWidth: 1,
  },
});
