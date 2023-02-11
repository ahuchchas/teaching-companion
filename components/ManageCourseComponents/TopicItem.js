import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

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
        </View>
        <View style={{ alignItems: "center" }}>
          <Text style={styles.status}>Status</Text>
          <Text style={{ fontWeight: "bold" }}>
            {isCompleted ? "Done" : "Due"}
          </Text>
        </View>
      </View>
      <View style={styles.rowView}>
        <TouchableOpacity onPress={() => deleteTopicHandler(topicId)}>
          <Text style={styles.delete}>Delete</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => changeTopicHandler(topicId)}>
          <Text style={styles.change}>Change Status</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  option: {
    padding: 16,
    margin: 12,
    backgroundColor: "#9aa6b1",
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
  },
  delete: {
    color: "wheat",
    padding: 8,
    fontWeight: "bold",
    backgroundColor: "#e94957",
    borderRadius: 4,
  },
  change: {
    color: "wheat",
    padding: 8,
    backgroundColor: "teal",
    borderRadius: 4,
  },
});
