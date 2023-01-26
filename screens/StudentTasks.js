import { View, Text, StyleSheet } from "react-native";

export default function StudentTasks() {
  return (
    <View style={styles.container}>
      <Text>Student tasks page</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
