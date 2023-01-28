import { StyleSheet, View, Text } from "react-native";

export default function TaskDetails({ navigation, route }) {
  return (
    <View style={styles.container}>
      <Text>Task title</Text>
      <Text>Task description</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
