import { View, Text, StyleSheet, Button } from "react-native";
import StudentList from "../util/StudentList";

export default function AboutScreen() {
  const pressHandler = (logtext) => {
    console.log(logtext);
  };

  return (
    <View style={styles.container}>
      <Text>About screen</Text>
      <StudentList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});
