import { useEffect } from "react";
import { View, Text } from "react-native";

let sheet_id = "1u3Qb4VIS93Bc9nXaW8HNXvcZzIN55RXKPjDXcoZ9zt4";
let sheet_title = "Student_List";
let sheet_range = "A1:B5";

let full_url =
  "https://docs.google.com/spreadsheets/d/" +
  sheet_id +
  "/gviz/tq?sheet=" +
  sheet_title +
  "&range=" +
  sheet_range;

export default function StudentList() {
  const studentList = [];
  useEffect(() => {
    fetch(full_url)
      .then((res) => res.text())
      .then((rep) => {
        let data = JSON.parse(rep.substr(47).slice(0, -2));
        let len = data.table.rows.length;

        for (let i = 0; i < len; i++) {
          const stdObj = {
            id: data.table.rows[i].c[0].v.toString(),
            name: data.table.rows[i].c[1].v,
          };

          studentList.push(stdObj);
        }

        console.log(studentList);
      });
  }, []);

  return (
    <View>
      <Text>New Student list</Text>
    </View>
  );
}
