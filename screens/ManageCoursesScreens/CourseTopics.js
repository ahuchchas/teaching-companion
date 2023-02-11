import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GlobalStyles } from "../../constants/styles";
import { CoursesContext } from "../../store/course-context";
import { useContext } from "react";
import TopicItem from "../../components/ManageCourseComponents/TopicItem";

export default function CourseTopics({ navigation, route }) {
  const coursesCtx = useContext(CoursesContext);
  const courseId = route.params.courseId;
  const targetCourse = coursesCtx.courses.find(
    (course) => course.courseId === courseId
  );

  function deleteCourseHandler() {
    coursesCtx.deleteCourse(courseId);
    navigation.goBack();
  }

  function deleteTopicHandler(topicId) {
    coursesCtx.deleteTopic(courseId, topicId);
  }
  function changeTopicHandler(topicId) {
    coursesCtx.markTopic(courseId, topicId);
  }

  return (
    <View style={styles.container}>
      <View style={styles.listContainer}>
        <FlatList
          ListHeaderComponent={
            <>
              <Text style={styles.courseTitle}>{targetCourse.courseTitle}</Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("TopicForm", { courseId: courseId })
                }
              >
                <View style={styles.option}>
                  <Ionicons name="add-circle" size={20} color="#2B5876" />
                  <Text style={styles.title}>ADD NEW TOPIC IN THIS COURSE</Text>
                </View>
              </TouchableOpacity>
            </>
          }
          data={targetCourse.topicList}
          renderItem={({ item }) => (
            <TopicItem
              topicId={item.topicId}
              deleteTopicHandler={deleteTopicHandler}
              changeTopicHandler={changeTopicHandler}
              topicName={item.topicName}
              classNeeded={item.classNeeded}
              isCompleted={item.isCompleted}
            />
          )}
          keyExtractor={(item) => item.topicId}
          ListFooterComponent={
            <>
              <TouchableOpacity onPress={deleteCourseHandler}>
                <View style={styles.delete}>
                  <Ionicons name="trash" size={20} color="tomato" />
                  <Text style={styles.title}>DELETE THIS COURSE</Text>
                </View>
              </TouchableOpacity>
            </>
          }
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
  courseTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 16,
    color: "#2B5876",
  },

  option: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    margin: 24,
    paddingBottom: 8,
    borderBottomColor: "#2B5876",
    borderBottomWidth: 1,
  },
  delete: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 24,
    marginVertical: 12,
    paddingBottom: 8,
    borderBottomColor: "#2B5876",
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 14,
    color: "#2B5876",
    marginLeft: 6,
    //fontWeight: "bold",
  },
  listContainer: {
    flex: 1,
  },
});
