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
import CourseItem from "../../components/ManageCourseComponents/CourseItem";

export default function ManageCourses({ navigation }) {
  const coursesCtx = useContext(CoursesContext);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate("CourseForm")}>
        <View style={styles.option}>
          <Ionicons name="add-circle" size={20} color="#2B5876" />
          <Text style={styles.title}>ADD NEW COURSE</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.courseListContainer}>
        <FlatList
          data={coursesCtx.courses}
          renderItem={({ item }) => (
            <CourseItem
              courseId={item.courseId}
              courseTitle={item.courseTitle}
              courseCode={item.courseCode}
            />
          )}
          keyExtractor={(item) => item.courseId}
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
    margin: 24,
  },
  title: {
    fontSize: 16,
    color: "#2B5876",
    marginLeft: 6,
    fontWeight: "bold",
  },
  courseListContainer: {
    flex: 1,
  },
});
