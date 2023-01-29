import { View, Text, StyleSheet, FlatList } from "react-native";
import { useState } from "react";

import ProjectTeam from "../../components/ProjectTeam";

export default function ProjectTeams() {
  const [TeamList, setTeamList] = useState([
    {
      id: "Team1",
      Batch: "52",
      TeamMembers: {
        Member1: "Md. Abu Hurayra Uchchas",
        Member2: "Thasin Chowdhury Upoma",
        Member3: "Tarek Aziz",
      },
      Email: "tahsinchowdhuryupoma@gmail.com",
    },
    {
      id: "Team2",
      Batch: "52",
      TeamMembers: {
        Member1: "Md. Shahinur Rahman",
        Member2: "Taslima Hussain Enas",
        Member3: "Amira Mostofa Chowdhury",
      },
      Email: "cse_1932020044@lus.ac.bd",
    },
    {
      id: "Team3",
      Batch: "52",
      TeamMembers: {
        Member1: "Md. Abu Hurayre Uchchas",
        Member2: "Thasin Chowdhury Upoma",
        Member3: "Tarek Aziz",
      },
      Email: "tahsinchowdhuryupoma@gmail.com",
    },
    {
      id: "Team4",
      Batch: "52",
      TeamMembers: {
        Member1: "Md. Shahinur Rahman",
        Member2: "Taslima Hussain Enas",
        Member3: "Amira Mostofa Chowdhury",
      },
      Email: "cse_1932020044@lus.ac.bd",
    },

    {
      id: "Team5",
      Batch: "52",
      TeamMembers: {
        Member1: "Md. Abu Hurayre Uchchas",
        Member2: "Thasin Chowdhury Upoma",
        Member3: "Tarek Aziz",
      },
      Email: "tahsinchowdhuryupoma@gmail.com",
    },
    {
      id: "Team6",
      Batch: "52",
      TeamMembers: {
        Member1: "Md. Shahinur Rahman",
        Member2: "Taslima Hussain Enas",
        Member3: "Amira Mostofa Chowdhury",
      },
      Email: "cse_1932020044@lus.ac.bd",
    },
  ]);
  return (
    <View style={styles.container}>
      <Text
        style={{
          textAlign: "center",
          color: "teal",
          fontSize: 20,
          padding: 20,
        }}
      >
        Project Teams{" "}
      </Text>
      <FlatList
        data={TeamList}
        renderItem={({ item }) => <ProjectTeam info={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
