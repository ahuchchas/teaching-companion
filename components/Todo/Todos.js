import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React from "react";

import { Foundation } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Todo = ({ todo }) => {
  const navigation = useNavigation();
  function PressHandler() {
    let id = todo.id;

    navigation.navigate("TodoForm", { id: id });
  }
  return (
    <TouchableOpacity onPress={PressHandler}>
      <View style={styles.containar}>
        <View style={styles.titleContainar}>
          <Foundation name="clipboard-notes" size={20} color="teal" />
          <Text style={styles.title}>{todo.title}</Text>
        </View>

        <View style={styles.description}>
          <Text>Description:{todo.description}</Text>
          <Text>Date:{todo.date.toISOString().slice(0, 10)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const Todos = ({ todoList }) => {
  return (
    <View style={styles.todos}>
      <FlatList
        keyExtractor={(item) => item.id}
        data={todoList}
        renderItem={({ item }) => <Todo todo={item} />}
      />
    </View>
  );
};

export default Todos;

const styles = StyleSheet.create({
  todos: {
    paddingVertical: 30,
    paddingHorizontal: 10,
    marginBottom: 30,
  },
  containar: {
    padding: 20,
    margin: 10,
    elevation: 3,
    backgroundColor: "lightgray",
  },
  title: {
    textAlign: "center",
    color: "teal",
    marginBottom: 5,
  },

  titleContainar: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "teal",
    padding: 5,
  },

  addtodos: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderWidth: 2,
    borderColor: "teal",
    margin: 10,
  },
  todoInput: {
    width: "60%",
  },
});
