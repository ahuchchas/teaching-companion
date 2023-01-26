import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GlobalStyles } from "../../constants/styles";

export default function HomeOption(props) {
  return (
    <View style={styles.option}>
      <View style={styles.iconContent}>
        <Ionicons name={props.icon} size={24} color="white" />
        <Text style={styles.title}>{props.title}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  option: {
    padding: 18,
    marginVertical: 8,
    elevation: 4,
    backgroundColor: GlobalStyles.colors.item,
    borderRadius: 8,
  },

  title: {
    fontSize: 20,
    color: "white",
  },
});
