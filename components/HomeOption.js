import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export default function HomeOption({ icon, title }) {
  return (
    // <LinearGradient colors={["#2B5876", "#4E4376"]} style={styles.option}>
    //   <Ionicons name={icon} size={24} color="#fff" />
    //   <Text style={styles.title}>{title}</Text>
    // </LinearGradient>
    <View style={styles.option}>
      <Ionicons name={icon} size={24} color="#1b394b" />
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  option: {
    padding: 18,
    marginVertical: 8,
    borderRadius: 8,
    backgroundColor: "#f3f3f3",
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#142a38",
  },
});
