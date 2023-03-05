import { View, Text, StyleSheet } from "react-native";

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 12 }}>
        Teaching Companion
      </Text>
      <Text style={{ marginBottom: 36 }}>Version: 1.0.0</Text>
      <View style={{ maxWidth: "85%" }}>
        <Text style={{ fontSize: 18, marginBottom: 20 }}>
          The app is developed to make teaching activities more managable. With
          this app you can:
        </Text>
        <Text style={{ fontSize: 16 }}>
          - keep track of the tasks assigned for your student. Get notification
          before deadline.
        </Text>
        <Text style={{ fontSize: 16 }}>
          - keep track of the courses. See the percentage of topics completed.
        </Text>
        <Text style={{ fontSize: 16 }}>
          - Add todos, set and get reminder for the todos.
        </Text>
        <Text style={{ fontSize: 16 }}>
          - Store information about the project teams under your supervision.
          And mail them instantly.
        </Text>
      </View>
      <Text style={{ marginTop: 48 }}>Developed by: </Text>
      <Text>Abu Hurayra Uchchas</Text>
      <Text>Thasin Chowdhury Upoma</Text>
      <Text>Tarek Aziz</Text>
      <Text style={{ marginTop: 28 }}>Contact us:</Text>
      <Text>abuhurayrauchchas@gmail.com</Text>
      <Text>tahsinchowdhuryupoma@gmail.com</Text>
      <Text>tarekcse.lus@gmail.com</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 24,
    alignItems: "center",
    backgroundColor: "#fff",
  },
});
