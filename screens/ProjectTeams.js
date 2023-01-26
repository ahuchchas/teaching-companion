import { View, Text, StyleSheet } from "react-native";

export default function ProjectTeams() {
  return (
    <View style={styles.container}>
      <Text>Project Teams page</Text>
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
