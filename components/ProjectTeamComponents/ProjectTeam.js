import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TouchableHighlight,
} from "react-native";
import React from "react";
import { useState } from "react";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import email from "react-native-email";
import { useNavigation } from "@react-navigation/native";
function sendMail(mailAddress, msg) {
  email(mailAddress, {
    bcc: "tahsinchowdhuryupoma@gmail.com",
    subject: "about progress of projet",
    body: msg,
  }).catch(console.error);
}

export default function ProjectTeam({ info }) {
  const [showTeamMebers, setShowTeamMembers] = useState(false);
  const [showMsgOption, setShowMsgOption] = useState(false);
  const [msg, setMsg] = useState("Meet Asap");
  const [msgcolor, setmsgColor] = useState("silver");
  const [messages, setMessages] = useState([
    { id: "m1", title: "Meet Asap" },
    { id: "m2", title: "Submit Your Work" },
    { id: "m3", title: "What is your progress?" },
    { id: "m4", title: "Meet Asap" },
    { id: "m5", title: "Submit Your Work" },
    { id: "m6", title: "Meet Asap" },
  ]);
  const navigation = useNavigation();
  function PressHandler() {
    let id = info.id;
    //console.log(id)
    navigation.navigate("ProjectTeamForm", { id: id });
  }

  return (
    <TouchableOpacity onPress={PressHandler}>
      <View style={Styles.containar}>
        <View>
          <Text style={Styles.title}>Team Name: {info.name}</Text>
          <Text>Batch:{info.Batch}</Text>
          <Text>Email:{info.Email}</Text>
        </View>
        <View>
          <TouchableOpacity onPress={() => setShowTeamMembers(!showTeamMebers)}>
            <View style={Styles.OptionContainaer}>
              <MaterialCommunityIcons
                name="account-group"
                size={20}
                color="#2B5876"
                onPress={() => sendMail(msg)}
              />
              <Text>
                {!showTeamMebers ? "Show Team Members:" : "Team Members"}
              </Text>
              <AntDesign
                name={!showTeamMebers ? "downcircle" : "upcircle"}
                size={14}
                color="#2B5876"
              />
            </View>
          </TouchableOpacity>

          {showTeamMebers && (
            <View style={Styles.members}>
              <Text style={{ color: "white" }}>{info.TeamMemberOne}</Text>
              <Text style={{ color: "white" }}>{info.TeamMemberTwo}</Text>
              <Text style={{ color: "white" }}>{info.TeamMemberThree}</Text>
            </View>
          )}
          <TouchableOpacity onPress={() => setShowMsgOption(!showMsgOption)}>
            <View style={Styles.OptionContainaer}>
              <MaterialCommunityIcons
                name="email"
                size={20}
                color="#2B5876"
                onPress={() => sendMail(info.Email, msg)}
              />
              <Text>Send Mail </Text>
              <AntDesign
                name={!showMsgOption ? "downcircle" : "upcircle"}
                size={14}
                color="#2B5876"
              />
            </View>
          </TouchableOpacity>
          {showMsgOption && (
            <View style={Styles.members}>
              <Text style={{ color: "white", marginBottom: 6 }}>
                Press on a message & then press send button
              </Text>
              <FlatList
                keyExtractor={(item) => item.id}
                data={messages}
                renderItem={({ item }) => (
                  <TouchableHighlight
                    activeOpacity={0.5}
                    underlayColor="white"
                    onPress={() => {
                      setMsg(item.title);
                    }}
                  >
                    <View style={Styles.msg}>
                      <Text
                        style={{
                          backgroundColor: { msgcolor },
                          color: "wheat",
                        }}
                      >
                        {item.title}
                      </Text>
                      <MaterialCommunityIcons
                        name="send"
                        size={20}
                        color="silver"
                        onPress={() => sendMail(info.Email, msg)}
                      />
                    </View>
                  </TouchableHighlight>
                )}
              />
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const Styles = StyleSheet.create({
  containar: {
    minWidth: "90%",
    backgroundColor: "#dfe4f2",
    padding: 30,
    marginBottom: 10,
    borderRadius: 5,
  },
  title: {
    color: "#2B5876",
    fontSize: 14,
  },

  OptionContainaer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 2,
    borderColor: "#2B5876",
    padding: 5,
    marginVertical: 8,
    borderRadius: 8,
  },
  members: {
    padding: 10,
    backgroundColor: "#2B5876",
    borderRadius: 5,
  },

  Message: {
    height: 40,
  },
  msg: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: "silver",
  },
});
