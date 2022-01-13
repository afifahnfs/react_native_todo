import React, { useState, useContext } from "react";
import { UserContext } from "../context/userContext";
import { API } from "../config/api";
import {
  Box,
  Text,
  Heading,
  VStack,
  FormControl,
  Input,
  View,
  HStack,
  Center,
  Alert,
} from "native-base";

import { TouchableOpacity } from "react-native";

import { Link } from "@react-navigation/native";

export default function Login({ navigation }) {
  const [state, dispatch] = useContext(UserContext);

  const [message, setMessage] = useState(null);

  // store data with useState
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const onChangeEmail = (value) => {
    setUser({ ...user, email: value });
  };

  const onChangePassword = (value) => {
    setUser({ ...user, password: value });
  };

  const [profile, setProfile] = useState({});

  const handleLogin = async (a) => {
    try {
      a.preventDefault();

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      // convert form data to string
      const body = JSON.stringify(user);

      console.log(body);
      // Insert data user to database
      const response = await API.post("/login", body, config);

      setProfile(response.data.data.user);

      console.log(profile);

      navigation.navigate("My-Todos", { id: response.data.data.user.id });

      if (response?.status == 200) {
        // Send data to useContext
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: response.data.data.user,
        });

        const alert = (
          <Alert variant="success" className="py-1">
            Login success
          </Alert>
        );
        setMessage(alert);
      }
    } catch (error) {
      const alert = (
        <Alert variant="danger" className="py-1">
          Failed
        </Alert>
      );
      setMessage(alert);
      console.log(error);
    }
  };

  return (
    <Center flex={1} width="100%" bg="teal.50">
      <Box safeArea p="2" w="90%" py="8">
        <Heading
          textAlign="center"
          fontFamily="body"
          fontWeight={800}
          fontSize={30}
          mb={10}
          color="#14b8a6"
        >
          Login
        </Heading>
        {message && message}
        <VStack space={3} mt="5">
          <FormControl>
            <FormControl.Label>Email </FormControl.Label>
            <Input
              type="email"
              name="email"
              onChangeText={(value) => onChangeEmail(value)}
            />
          </FormControl>
          <FormControl>
            <FormControl.Label>Password</FormControl.Label>
            <Input
              type="password"
              name="password"
              onChangeText={(value) => onChangePassword(value)}
            />
          </FormControl>

          <TouchableOpacity onPress={(e) => handleLogin(e)}>
            <View
              style={{
                backgroundColor: "#14b8a6",
                padding: 15,
                borderRadius: 5,
                marginTop: 15,
              }}
            >
              <Text style={{ color: "white", textAlign: "center" }}>
                Sign in
              </Text>
            </View>
          </TouchableOpacity>
          <HStack mt="6" justifyContent="center">
            <Text
              fontSize="sm"
              color="coolGray.600"
              _dark={{
                color: "warmGray.200",
              }}
            >
              I'm a new user.{" "}
            </Text>
            <Link
              _text={{
                color: "indigo.500",
                fontWeight: "medium",
                fontSize: "sm",
              }}
              to={{ screen: "Register" }}
            >
              Sign Up
            </Link>
          </HStack>
        </VStack>
      </Box>
    </Center>
  );
}
