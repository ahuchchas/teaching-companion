import { View, Text, Button, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import Todos from "../../components/Todo/Todos";
import { useEffect, useState, useContext } from "react";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { TodoContext } from "../../store/todo-context";
import { fetchTodoData } from "../../util/httpTodo";
import LoadingOverlay from "../../components/UI/LoadingOverlay";

const AllTodos = () => {
  const TodoCntx = useContext(TodoContext);
  const navigation = useNavigation();

  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    async function getTodoData() {
      setIsFetching(true);
      const TodoData = await fetchTodoData();
      TodoCntx.setTodos(TodoData);
      setIsFetching(false);
    }
    getTodoData();
  }, []);

  if (isFetching) {
    return <LoadingOverlay message="Loading Todos..." />;
  }

  return (
    <View>
      <View style={styles.buttoncontainar}>
        <View>
          <TouchableOpacity
            onPress={() => navigation.navigate("TodaysTodos")}
            style={styles.button}
          >
            <Text style={{ textAlign: "center", color: "white" }}>
              Today's To-dos
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => navigation.navigate("UpcomingSevenDaysTodo")}
            style={styles.button}
          >
            <Text style={{ textAlign: "center", color: "white" }}>
              Next 7 Day's To-dos
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <TouchableOpacity onPress={() => navigation.navigate("TodoForm")}>
          <View style={styles.option}>
            <Ionicons name="add-circle" size={20} color="teal" />
            <Text style={styles.title}>ADD NEW TODO</Text>
          </View>
        </TouchableOpacity>
      </View>
      <Todos period="All Todos" todoList={TodoCntx.TodoList} />
    </View>
  );
};

export default AllTodos;

const styles = StyleSheet.create({
  button: {
    padding: 10,
    margin: 5,
    backgroundColor: "teal",
    textAlign: "center",
    elevation: 2,
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 10,
    color: "white",
    width: 150,
    flexDirection: "row",
    justifyContent: "center",
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },

  buttoncontainar: {
    alignItems: "center",
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "center",
  },
});
