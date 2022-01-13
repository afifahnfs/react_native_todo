import React, { useState, useEffect, useContext, useRef } from "react";
import { API } from "../config/api";
import {
  Input,
  IconButton,
  Checkbox,
  Text,
  Box,
  VStack,
  HStack,
  Heading,
  Icon,
  Alert,
} from "native-base";
import { Feather, Entypo } from "@expo/vector-icons";

import Header from "../components/menu";

export default function ListTodos({ route }) {
  const id = route.params.id;

  const title = route.params.title;

  const [task, setTask] = useState([]);

  const getTask = async (id) => {
    try {
      const response = await API.get("/task/" + id);
      // Store product data to useState variabel
      setTask(response.data.task);

      // console.log(response.data.task);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTask(id);
  }, []);

  const [newTask, setNewTask] = useState({
    name: "",
  });

  const onChangeTask = (value) => {
    setNewTask({ ...newTask, name: value });
  };

  const handleTask = async (id) => {
    try {
      // e.preventDefault();

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      // convert form data to string
      const body = JSON.stringify(newTask);

      // Insert data user to database
      const response = await API.post(`/task/${id}`, body, config);

      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleStatusChange = async (id) => {
    try {
      // e.preventDefault();

      const data = {
        isDone: "done",
      };

      console.log(data);

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      // Update transaction data
      const response = await API.patch(`/task/${id}`, data, config);

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const [message, setMessage] = useState(null);

  const handleDelete = async (id) => {
    try {
      await API.delete(`/task/${id}`);

      const alert = (
        <Alert variant="success" className="py-1">
          Delete success
        </Alert>
      );
      setMessage(alert);
    } catch (error) {
      const alert = (
        <Alert variant="danger" className="py-1">
          Delete Failed
        </Alert>
      );
      setMessage(alert);
      console.log(error);
    }
  };

  return (
    <>
      <Header />
      <Box m={5}>
        <Heading mb="5" textAlign="center">
          {title}
        </Heading>
        <VStack space={4}>
          <HStack space={2}>
            <Input
              flex={1}
              type="input"
              name="name"
              onChangeText={(value) => onChangeTask(value)}
              placeholder="Add Task"
            />
            <IconButton
              borderRadius="sm"
              variant="solid"
              icon={
                <Icon as={Feather} name="plus" size="sm" color="warmGray.50" />
              }
              onPress={(e) => handleTask(id)}
            />
          </HStack>

          {message && message}

          <VStack space={2}>
            {task.map((item, itemI) => (
              <HStack
                w="100%"
                justifyContent="space-between"
                alignItems="center"
                key={item.name + itemI.toString()}
              >
                {item.isDone === "done" ? (
                  <Checkbox
                    isChecked={true}
                    // onChange={() => handleStatusChange(item.id)}
                    // value={item.isDone}
                  >
                    <Text
                      mx="2"
                      strikeThrough={item.isCompleted}
                      _light={{
                        color: item.isCompleted ? "gray.400" : "coolGray.800",
                      }}
                      _dark={{
                        color: item.isCompleted ? "gray.400" : "coolGray.50",
                      }}
                    >
                      {item.name}
                    </Text>
                  </Checkbox>
                ) : (
                  <Checkbox
                    isChecked={false}
                    onChange={() => handleStatusChange(item.id)}
                  >
                    <Text
                      mx="2"
                      _light={{
                        color: item.name ? "gray.400" : "coolGray.800",
                      }}
                      _dark={{
                        color: item.name ? "gray.400" : "coolGray.50",
                      }}
                    >
                      {item.name}
                    </Text>
                  </Checkbox>
                )}

                <IconButton
                  size="sm"
                  colorScheme="trueGray"
                  icon={
                    <Icon
                      as={Entypo}
                      name="minus"
                      size="xs"
                      color="trueGray.400"
                    />
                  }
                  onPress={() => handleDelete(item.id)}
                />
              </HStack>
            ))}
          </VStack>
        </VStack>
      </Box>
    </>
  );
}
