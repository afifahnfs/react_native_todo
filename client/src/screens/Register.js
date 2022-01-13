import React, { useState } from "react";
import { API } from "../config/api";
import {
  Box,
  Heading,
  VStack,
  HStack,
  FormControl,
  Input,
  Text,
  Center,
  Alert,
  View,
} from "native-base";

import { TouchableOpacity } from "react-native";

import { Link } from "@react-navigation/native";

export default function Register() {
  const [message, setMessage] = useState(null);

  // store data with useState
  const [user, setUser] = useState({
    email: "",
    password: "",
    fullName: "",
  });

  const onChangeEmail = (value) => {
    setUser({ ...user, email: value });
  };

  const onChangeFullName = (value) => {
    setUser({ ...user, fullName: value });
  };

  const onChangePassword = (value) => {
    setUser({ ...user, password: value });
  };

  const [loading, setLoading] = useState(false);

  // console.log(user);

  const handleSubmit = async (e) => {
    try {
      console.log("klik");
      setLoading(true);

      e.preventDefault();

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      // convert form data to string
      const body = JSON.stringify(user);
      console.log(body);

      // Insert data user to database
      const response = await API.post("/register", body, config);

      console.log(response);

      setLoading(false);

      // Notification
      if (response.data.status === "success") {
        const alert = (
          <Alert variant="success" className="py-1">
            Success Register
          </Alert>
        );
        setMessage(alert);
      } else {
        const alert = (
          <Alert variant="danger" className="py-1">
            Failed Register
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
          Register
        </Heading>
        {message && message}
        <VStack space={3} mt="5">
          <FormControl>
            <FormControl.Label>Email</FormControl.Label>
            <Input
              type="email"
              name="email"
              onChangeText={(value) => onChangeEmail(value)}
            />
            <FormControl.Label mt="5">Name</FormControl.Label>
            <Input
              type="input"
              name="fullName"
              onChangeText={(value) => onChangeFullName(value)}
            />
            <FormControl.Label mt="5">Password</FormControl.Label>
            <Input
              type="password"
              name="password"
              onChangeText={(value) => onChangePassword(value)}
            />

            <TouchableOpacity onPress={(e) => handleSubmit(e)}>
              <View
                style={{
                  backgroundColor: "#14b8a6",
                  padding: 15,
                  borderRadius: 5,
                  marginTop: 15,
                }}
              >
                <Text style={{ color: "white", textAlign: "center" }}>
                  Sign up
                </Text>
              </View>
            </TouchableOpacity>
          </FormControl>

          <HStack mt="6" justifyContent="center">
            <Text
              fontSize="sm"
              color="coolGray.600"
              _dark={{
                color: "warmGray.200",
              }}
            >
              Already have an account.{" "}
            </Text>
            <Link
              _text={{
                color: "indigo.500",
                fontWeight: "medium",
                fontSize: "sm",
              }}
              to={{ screen: "Login" }}
            >
              Sign In
            </Link>
          </HStack>
        </VStack>
      </Box>
    </Center>
  );
}
