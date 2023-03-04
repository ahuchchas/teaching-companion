import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Button,
} from "react-native";
import React from "react";
import { Alert } from "react-native";
import { useState } from "react";
import { TodoContext } from "../../store/todo-context";
import { useContext } from "react";
import { MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Ionicons } from "@expo/vector-icons";
import { deleteTodo, storeTodo, updateTodo } from "../../util/httpTodo";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldPlaySound: true,
      shouldShowAlert: true,
      shouldSetBadge: false,
    };
  },
});
const TodoForm = ({ navigation, route }) => {
  const TodoCntx = useContext(TodoContext);

  const selectedTodoId = route.params?.id;
  const selectedTodo = selectedTodoId
    ? TodoCntx.TodoList.find((todo) => todo.id === selectedTodoId)
    : undefined;

  const isEditing = selectedTodoId ? true : false;
  const [inputs, setInputs] = useState({
    title: {
      value: selectedTodo ? selectedTodo.title.toString() : "",
      isValid: true,
    },
    description: {
      value: selectedTodo ? selectedTodo.description.toString() : "",
      isValid: true,
    },

    date: {
      value: selectedTodo ? selectedTodo.date : new Date(),
      isValid: true,
    },

    remindar: {
      value: selectedTodo ? selectedTodo.remindar : 0,
      isValid: true,
    },
  });

  function inputChangedHandler(inputIdentifier, enteredValue) {
    setInputs((currentInputs) => {
      return {
        ...currentInputs,
        [inputIdentifier]: {
          value: enteredValue,
          isValid: true,
        },
      };
    });
  }

  function cancelHandler() {
    navigation.goBack();
  }

  function deleteHandler() {
    TodoCntx.deleteTodo(selectedTodoId);
    deleteTodo(selectedTodoId);
    navigation.goBack();
  }
  async function submitHandler() {
    const TodoData = {
      title: inputs.title.value,
      description: inputs.description.value,
      date: new Date(inputs.date.value),

      remindar: inputs.remindar.value,
    };

    const TitleIsValid = TodoData.title.trim().length > 0;
    const DescriptionIsValid = TodoData.description.trim().length > 0;

    if (!TitleIsValid || !DescriptionIsValid) {
      Alert.alert("Invalid Input", "Please check your input values");
      setInputs((currentInputValue) => {
        return {
          title: {
            value: currentInputValue.title.value,
            isValid: TitleIsValid,
          },

          date: {
            value: currentInputValue.date.value,
            isValid: true,
          },

          description: {
            value: currentInputValue.description.value,
            isValid: DescriptionIsValid,
          },

          remindar: {
            value: currentInputValue.remindar.value,
            isValid: true,
          },
        };
      });
      return;
    }
    if (isEditing) {
      TodoCntx.updateTodo(selectedTodoId, TodoData);
      await updateTodo(selectedTodoId, TodoData);
    } else {
      const id = await storeTodo(TodoData);
      TodoCntx.addTodo({ ...TodoData, id: id });
    }

    navigation.goBack();
  }
  //Time Picker

  const [showTimePicker, setShowTimePicker] = useState(false);
  // const [date, setDate] = useState("");
  // const [time, setTime] = useState("");
  const [needremindar, setNeedRemindar] = useState(false);

  const [toggle, setToggle] = useState(false);
  //HandleNotification:
  async function SceduleNotificatioHandler(minsBefore) {
    let remindardate = inputs.date.value;
    remindardate.setMinutes(remindardate.getMinutes() - minsBefore);
    console.log(remindardate.toString().slice(0, 24));

    let title = "Reminder for " + inputs.title.value;
    let body = `After ${inputs.remindar.value} mins.`;
    await Notifications.scheduleNotificationAsync({
      content: {
        title: title,
        body: body,
      },
      trigger: {
        date: remindardate,
      },
    });
    Alert.alert(
      "You have successfully set the Remindar!!",
      `You will be notified ${inputs.remindar.value} mins before the ${inputs.title.value}`
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.iconContainar}>
          <AntDesign name="calendar" size={40} color="teal" />
        </View>

        <View>
          <Text style={styles.key}>Title:</Text>
          <TextInput
            style={[styles.value, !inputs.title.isValid && styles.errorStyle]}
            placeholder="Todo Title"
            value={inputs.title.value}
            onChangeText={(enteredValue) =>
              inputChangedHandler("title", enteredValue)
            }
          />
          <Text style={styles.key}>Description:</Text>
          <TextInput
            multiline
            style={[
              styles.value,
              styles.description,
              !inputs.description.isValid && styles.errorStyle,
            ]}
            value={inputs.description.value}
            placeholder="Todo Description"
            onChangeText={(enteredValue) =>
              inputChangedHandler("description", enteredValue)
            }
          />
          <Text style={styles.key}>Todo Date & Time:</Text>
          <View
            style={[
              styles.value,
              { flexDirection: "row", justifyContent: "space-between" },
            ]}
          >
            <TextInput
              value={inputs.date.value.toString().slice(0, 24)}
              placeholder="Todo Date || Time"
            />
            <TouchableOpacity
              onPress={() => setShowTimePicker(!showTimePicker)}
            >
              <FontAwesome5 name="edit" size={24} color="teal" />
            </TouchableOpacity>
          </View>

          <DateTimePickerModal
            isVisible={showTimePicker}
            date={new Date(inputs.date.value)}
            mode={"datetime"}
            onConfirm={(val) => {
              inputChangedHandler("date", val);
              let hours = val.getHours();
              let min = val.getMinutes();
              let timeval = hours + ":" + min;
              setDate(val.toISOString().slice(0, 10));
              setTime(timeval);
              inputChangedHandler("time", timeval);
              setShowTimePicker(!showTimePicker);
            }}
            onCancel={() => setShowTimePicker(!showTimePicker)}
          />

          <TouchableOpacity onPress={() => setNeedRemindar(!needremindar)}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingVertical: 5,
                paddingHorizontal: 10,
                borderWidth: 2,
                borderColor: "#2B5876",
                margin: 8,
              }}
            >
              <Text>Reminder Options</Text>
              <AntDesign name="calendar" size={24} color="black" />
            </View>
          </TouchableOpacity>

          {needremindar && (
            <View>
              <TextInput
                style={styles.value}
                value={inputs.remindar.value}
                onChangeText={(enteredValue) =>
                  inputChangedHandler("remindar", enteredValue)
                }
                placeholder="Before ? min"
              ></TextInput>
              <TouchableOpacity
                style={styles.reminderButtonContainar}
                onPress={() => SceduleNotificatioHandler(inputs.remindar.value)}
              >
                <View style={styles.reminderButton}>
                  <Text style={{ color: "gray", fontWeight: "bold" }}>
                    Set Remindar
                  </Text>
                  <Ionicons name="notifications" size={24} color="teal" />
                </View>
              </TouchableOpacity>
            </View>
          )}
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={submitHandler}>
              <Text
                style={[
                  isEditing ? styles.updateButton : styles.addButton,
                  styles.button,
                ]}
              >
                {isEditing ? "Update" : " Add"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text
                onPress={cancelHandler}
                style={[styles.button, styles.cancelButton]}
              >
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
          {isEditing && (
            <View style={styles.deleteButtonContainar}>
              <TouchableOpacity>
                <MaterialCommunityIcons
                  onPress={deleteHandler}
                  name="delete"
                  size={30}
                  color="tomato"
                />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default TodoForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 12,
  },
  key: {
    fontSize: 16,
    fontWeight: "bold",
    marginHorizontal: 8,
    marginTop: 12,
  },
  value: {
    borderBottomWidth: 1,
    borderBottomColor: "teal",
    borderRadius: 3,
    fontSize: 16,
    padding: 8,
    margin: 8,
    backgroundColor: "#e1f0f7",
  },
  errorStyle: {
    backgroundColor: "#ffd6cc",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginHorizontal: 8,
    marginVertical: 40,
  },

  button: {
    padding: 10,
    margin: 5,
    width: 100,
    textAlign: "center",
    elevation: 2,
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 5,
    color: "white",
  },
  addButton: {
    backgroundColor: "#2B5876",
  },
  selectDateTimeButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  updateButton: {
    backgroundColor: "#2B5876",
  },
  cancelButton: {
    backgroundColor: "teal",
  },
  deleteButtonContainar: {
    alignItems: "center",
  },

  dateTimeinfo: {
    paddingHorizontal: 10,
  },

  iconContainar: {
    alignItems: "center",
  },
  reminderButton: {
    flexDirection: "row",
    borderColor: "teal",
    borderWidth: 2,
    padding: 8,
    width: 200,
    justifyContent: "space-between",
  },
  reminderButtonContainar: {
    alignItems: "center",
    marginHorizontal: 10,
    marginTop: 20,
  },

  selectremindar: {
    backgroundColor: "teal",
    color: "gray",
  },
});
