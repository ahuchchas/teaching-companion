import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
} from "react-native";
import React from "react";
import { useContext, useState } from "react";
import { ProjectContext } from "../../store/project-team-context";
import { AntDesign, Feather } from "@expo/vector-icons";
import { storeProjectTeams } from "../../util/httpProjectTeam";
import {
  updateProjectTeams,
  deleteProjectTeams,
} from "../../util/httpProjectTeam";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const ProjectTeamForm = ({ route, navigation }) => {
  const ProjectTeamCntx = useContext(ProjectContext);
  const selectedTeamId = route.params?.id;
  const selectedTeam = ProjectTeamCntx.projectTeams.find(
    (team) => selectedTeamId === team.id
  );
  const isEditing = selectedTeamId ? true : false;

  const [showTeamMembers, setShowTeamMembers] = useState(true);
  const [inputs, setInputs] = useState({
    Batch: {
      value: selectedTeam ? selectedTeam.Batch.toString() : "",
      isValid: true,
    },
    name: {
      value: selectedTeam ? selectedTeam.name.toString() : "",
      isValid: true,
    },
    TeamMemberOne: {
      value: selectedTeam ? selectedTeam.TeamMemberOne.toString() : "",
      isValid: true,
    },
    TeamMemberTwo: {
      value: selectedTeam ? selectedTeam.TeamMemberTwo.toString() : "",
      isValid: true,
    },
    TeamMemberThree: {
      value: selectedTeam ? selectedTeam.TeamMemberThree.toString() : "",
      isValid: true,
    },
    Email: {
      value: selectedTeam ? selectedTeam.Email.toString() : "",
      isValid: true,
    },

    appoinment: {
      value: selectedTeam ? selectedTeam.appoinment : new Date(),
      isValid: true,
    },
  });

  function inputChangedHandler(inputIdentifier, enteredValue) {
    setInputs((currentInputValue) => {
      return {
        ...currentInputValue,
        [inputIdentifier]: {
          value: enteredValue,
          isValid: true,
        },
      };
    });
  }

  function deleteHandler() {
    deleteProjectTeams(selectedTeamId);
    ProjectTeamCntx.deleteTeam(selectedTeamId);
    navigation.goBack();
  }
  /*  function cancelHandler() {
    navigation.goBack();
  }
*/
  async function submitHandler() {
    const Teamdata = {
      Batch: inputs.Batch.value,
      name: inputs.name.value,
      TeamMemberOne: inputs.TeamMemberOne.value,
      TeamMemberTwo: inputs.TeamMemberTwo.value,
      TeamMemberThree: inputs.TeamMemberThree.value,
      Email: inputs.Email.value,
      appoinment: new Date(inputs.appoinment.value),
    };

    const BatchIsValid = Teamdata.Batch.trim().length > 0;
    const NameIsValid = Teamdata.name.trim().length > 0;
    const TeamMemberOneIsValid = Teamdata.TeamMemberOne.trim().length > 0;
    //const TeamMemberTwoIsValid = Teamdata.TeamMemberTwo.trim().length > 0;
    //const TeamMemberThreeIsValid = Teamdata.TeamMemberThree.trim().length > 0;
    const EmailIsValid = Teamdata.Email.trim().length > 0;
    const appoinmentIsValid = Teamdata.appoinment.toString() !== "Invalid Date";

    if (
      !BatchIsValid ||
      !NameIsValid ||
      !TeamMemberOneIsValid ||
      !EmailIsValid ||
      !appoinmentIsValid
    ) {
      Alert.alert("Invalid Input", "Please check your input values");
      setInputs((currentInputValue) => {
        return {
          Batch: {
            value: currentInputValue.Batch.value,
            isValid: BatchIsValid,
          },
          name: {
            value: currentInputValue.name.value,
            isValid: NameIsValid,
          },
          TeamMemberOne: {
            value: currentInputValue.TeamMemberOne.value,
            isValid: TeamMemberOneIsValid,
          },
          TeamMemberTwo: {
            value: currentInputValue.TeamMemberTwo.value,
            isValid: true,
          },
          TeamMemberThree: {
            value: currentInputValue.TeamMemberThree.value,
            isValid: true,
          },
          Email: {
            value: currentInputValue.Email.value,
            isValid: EmailIsValid,
          },

          appoinment: {
            value: currentInputValue.appoinment.value,
            isValid: appoinmentIsValid,
          },
        };
      });
      return;
    }

    if (isEditing) {
      ProjectTeamCntx.updateTeam(selectedTeamId, Teamdata);
      await updateProjectTeams(selectedTeamId, Teamdata);
    } else {
      const id = await storeProjectTeams(Teamdata);
      ProjectTeamCntx.addTeam({ ...Teamdata, id: id });
    }
    navigation.goBack();
  }
  const [showPicker, setShowPicker] = useState(false);
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.key}>Project Team Name :</Text>
        <TextInput
          style={[styles.value, !inputs.name.isValid && styles.errorStyle]}
          onChangeText={(enteredValue) => {
            inputChangedHandler("name", enteredValue);
          }}
          value={inputs.name.value}
        />

        <Text style={styles.key}>Email Address:</Text>
        <TextInput
          style={[styles.value, !inputs.Email.isValid && styles.errorStyle]}
          onChangeText={(enteredValue) => {
            inputChangedHandler("Email", enteredValue);
          }}
          value={inputs.Email.value}
        />

        <Text style={styles.key}>Appointment Date:</Text>
        <View
          style={[
            styles.value,
            { flexDirection: "row", justifyContent: "space-between" },
          ]}
        >
          <Text>{inputs.appoinment.value.toString().slice(0, 24)}</Text>
          <TouchableOpacity
            onPress={() => {
              setShowPicker(!showPicker);
            }}
          >
            <Feather name="edit" size={24} color="teal" />
          </TouchableOpacity>
        </View>

        <DateTimePickerModal
          isVisible={showPicker}
          mode={"datetime"}
          date={new Date(inputs.appoinment.value)}
          //timeZoneOffsetInMinutes={60 * 6}
          onConfirm={(date) => {
            //console.log(date.getTimezoneOffset());
            const enteredValue = date;
            inputChangedHandler("appoinment", enteredValue);
            setShowPicker(!showPicker);
          }}
          onCancel={() => {
            setShowPicker(!showPicker);
          }}
        />

        <Text style={styles.key}>Batch :</Text>
        <TextInput
          style={[styles.value, !inputs.Batch.isValid && styles.errorStyle]}
          onChangeText={(enteredValue) => {
            inputChangedHandler("Batch", enteredValue);
          }}
          value={inputs.Batch.value}
        />

        <TouchableOpacity
          onPress={() =>
            showTeamMembers
              ? setShowTeamMembers(false)
              : setShowTeamMembers(true)
          }
        >
          <View style={styles.teamContainar}>
            <Text style={styles.key}>Team Members Name:</Text>
            <AntDesign
              name={!showTeamMembers ? "downcircle" : "upcircle"}
              size={16}
              color="black"
            />
          </View>
        </TouchableOpacity>

        {showTeamMembers && (
          <View>
            <TextInput
              placeholder="1"
              style={[
                styles.value,
                !inputs.TeamMemberOne.isValid && styles.errorStyle,
              ]}
              onChangeText={(enteredValue) => {
                inputChangedHandler("TeamMemberOne", enteredValue);
              }}
              value={inputs.TeamMemberOne.value}
            />
            <TextInput
              placeholder={"2."}
              style={styles.value}
              onChangeText={(enteredValue) => {
                inputChangedHandler("TeamMemberTwo", enteredValue);
              }}
              value={inputs.TeamMemberTwo.value}
            />
            <TextInput
              placeholder={"3."}
              style={styles.value}
              onChangeText={(enteredValue) => {
                inputChangedHandler("TeamMemberThree", enteredValue);
              }}
              value={inputs.TeamMemberThree.value}
            />
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

          {isEditing && (
            <TouchableOpacity onPress={deleteHandler}>
              <Text style={[styles.button, styles.deleteButton]}>Delete</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default ProjectTeamForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 12,
  },
  key: {
    fontSize: 16,
    fontWeight: "bold",
    margin: 4,
    marginTop: 12,
  },
  value: {
    borderWidth: 1,
    borderColor: "#2B5876",
    borderRadius: 4,
    fontSize: 16,
    padding: 8,
    margin: 4,
  },
  errorStyle: {
    backgroundColor: "#ffd6cc",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    marginHorizontal: 4,
    marginVertical: 24,
  },
  teamContainar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
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

  updateButton: {
    backgroundColor: "teal",
  },

  deleteButton: {
    backgroundColor: "#c4495f",
  },
});
