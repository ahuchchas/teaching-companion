import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function TaskItem({ id, title, deadline }) {
  const navigation = useNavigation();
  function taskPressHandler() {
    navigation.navigate("TaskDetails", {
      taskId: id,
    });
  }
  return (
    <TouchableOpacity onPress={taskPressHandler}>
      <View style={styles.option}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.deadline}>Deadline: {deadline.toDateString()}</Text>
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

  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#142a38",
  },

  deadline: {
    color: "brown",
    fontSize: 16,
  },
});
