import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function TaskItem({
  id,
  title,
  deadline,
  courseTitle,
  section,
}) {
  const navigation = useNavigation();
  function taskPressHandler() {
    navigation.navigate("TaskDetails", {
      taskId: id,
    });
  }
  return (
    <View style={styles.option}>
      <Pressable
        onPress={taskPressHandler}
        android_ripple={{ color: "black", borderless: true }}
        style={{ padding: 18 }}
      >
        <Text style={styles.title}>Task name: {title}</Text>
        <Text>Course Title: {courseTitle}</Text>
        <Text>Batch and Section: {section}</Text>
        <View style={styles.deadlineBox}>
          <MaterialCommunityIcons
            name="calendar-clock-outline"
            size={24}
            color="brown"
          />
          <Text style={styles.deadline}>
            Deadline: {deadline.toString().slice(0, 16)} |{"  "}
            {deadline.toString().slice(16, 24)}
          </Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  option: {
    margin: 12,
    backgroundColor: "#f1f1f1",
    borderRadius: 8,
    elevation: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
    borderBottomColor: "teal",
    borderBottomWidth: 1,
    paddingBottom: 6,
    marginBottom: 6,
  },
  deadlineBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
    paddingTop: 6,
  },
  deadline: {
    fontSize: 16,
  },
});
