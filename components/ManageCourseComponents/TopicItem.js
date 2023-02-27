import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Entypo, AntDesign, MaterialIcons } from "@expo/vector-icons";

export default function TopicItem({
  topicId,
  deleteTopicHandler,
  changeTopicHandler,
  topicName,
  classNeeded,
  isCompleted,
}) {
  return (
    <View style={styles.option}>
      <View style={styles.rowView}>
        <View style={{ maxWidth: 200 }}>
          <Text style={styles.topicName}>{topicName}</Text>
          <Text style={styles.classNeeded}>Reuired classes: {classNeeded}</Text>
          <TouchableOpacity onPress={() => deleteTopicHandler(topicId)}>
            <MaterialIcons name="delete" size={24} color="tomato" />
          </TouchableOpacity>
        </View>
        <View style={{ alignItems: "center" }}>
          <Text style={styles.status}>Status</Text>
          <Text style={{ fontWeight: "bold", marginBottom: 12 }}>
            {isCompleted ? "Done" : "Due"}
          </Text>
          <TouchableOpacity onPress={() => changeTopicHandler(topicId)}>
            {isCompleted ? (
              <AntDesign name="checkcircle" size={24} color="#00B761" />
            ) : (
              <Entypo name="circle" size={24} color="#00B761" />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  option: {
    padding: 16,
    margin: 12,
    backgroundColor: "#f1f1f1",
    borderRadius: 8,
  },
  rowView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginTop: 4,
  },
  status: {
    fontSize: 16,
    paddingBottom: 4,
    marginBottom: 4,
    borderBottomColor: "teal",
    borderBottomWidth: 1,
  },
  topicName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },

  classNeeded: {
    fontSize: 16,
    color: "#333333",
    marginBottom: 12,
  },
});
