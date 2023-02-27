import { View, Text } from "react-native";
import React from "react";
import Todos from "../../components/Todo/Todos";
import { useContext } from "react";
import { TodoContext } from "../../store/todo-context";
import { fetchTodoData } from "../../util/httpTodo";
import { useEffect } from "react";

const UpcomingSevenDaysTodo = () => {
  const TodoCntx = useContext(TodoContext);
  useEffect(() => {
    async function getTodoData() {
      const TodoData = await fetchTodoData();
      TodoCntx.setTodos(TodoData);
    }
    getTodoData();
  }, []);
  const sevenDaystodos = TodoCntx.TodoList.filter((todo) => {
    const today = new Date();
    const day7th = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 7
    );

    return day7th >= todo.date && today <= todo.date;
  });
  return (
    <View>
      <Todos period="7 Days Todos" todoList={sevenDaystodos} />
    </View>
  );
};

export default UpcomingSevenDaysTodo;
