import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function TaskItem({ title, deadline }) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.navigate("TaskDetails")}>
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
    margin: 8,
    elevation: 4,
    backgroundColor: "darkslategrey",
    borderRadius: 8,
  },

  title: {
    fontSize: 20,
    color: "azure",
  },

  deadline: {
    color: "coral",
  },
});
