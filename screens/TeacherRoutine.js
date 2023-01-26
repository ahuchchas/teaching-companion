import { View, Text, StyleSheet } from "react-native";

export default function TeacherRoutine() {
  return (
    <View style={styles.container}>
      <Text>Teacher Routine page</Text>
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
