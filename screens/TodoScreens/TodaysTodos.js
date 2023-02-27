import { View, Text } from "react-native";

import Todos from "../../components/Todo/Todos";
import { TodoContext } from "../../store/todo-context";
import { useContext } from "react";
import { fetchTodoData } from "../../util/httpTodo";
import { useEffect } from "react";
const TodaysTodos = () => {
  const TodoCntx = useContext(TodoContext);

  useEffect(() => {
    async function getTodoData() {
      const TodoData = await fetchTodoData();
      TodoCntx.setTodos(TodoData);
    }
    getTodoData();
  }, []);

  const todaystodos = TodoCntx.TodoList.filter((todo) => {
    const today = new Date();
    // console.log(todaystodos);
    return (
      todo.date.getFullYear() === today.getFullYear() &&
      todo.date.getMonth() === today.getMonth() &&
      todo.date.getDate() === today.getDate()
    );
  });

  return (
    <View>
      <Todos period="Today Todos" todoList={todaystodos} />
    </View>
  );
};

export default TodaysTodos;
