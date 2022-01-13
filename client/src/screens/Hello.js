import * as React from "react";
import { Text, Box, Pressable, Menu, Button, Avatar, Image } from "native-base";

import { Link } from "@react-navigation/native";

import user from "../images/user.jpg";
import list from "../images/list.svg";

export default function Hello({ navigation }) {
  const [shouldOverlapWithTrigger] = React.useState(false);
  const [position, setPosition] = React.useState("auto");

  return (
    <Box bg="blueGray.50" flex={1} alignItems="center" justifyContent="center">
      <Image source={list} alt="Alternate Text" size="xl" mb={10} />
      <Text
        fontFamily="body"
        fontWeight={800}
        fontStyle="italic"
        fontSize={30}
        mb={10}
        color="#14b8a6"
      >
        My Todo App
      </Text>

      <Pressable
        onPress={() => navigation.navigate("Login")}
        style={{
          backgroundColor: "#14b8a6",
          height: 40,
          width: "80%",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 10,
          marginTop: 20,
        }}
      >
        <Text color={{ color: "white" }}>Login</Text>
      </Pressable>

      <Pressable
        onPress={() => navigation.navigate("Register")}
        style={{
          backgroundColor: "#14b8a6",
          height: 40,
          width: "80%",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 10,
          marginTop: 10,
        }}
      >
        <Text color={{ color: "white" }}>Register</Text>
      </Pressable>
    </Box>
  );
}
