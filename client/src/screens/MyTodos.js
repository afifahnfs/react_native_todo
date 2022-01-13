import React, { useState, useEffect, useContext, useRef } from "react";
import {
  HStack,
  Heading,
  Box,
  VStack,
  Fab,
  Icon,
  Text,
  Modal,
  FormControl,
  Input,
  Button,
  View,
} from "native-base";

import { TouchableOpacity } from "react-native";
import { UserContext } from "../context/userContext";
import { Link } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { API } from "../config/api";

import Header from "../components/menu";

export default function MyTodos({ route, navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const [state] = useContext(UserContext);
  // console.log(route.params.id);

  const id = route.params.id;

  const [collection, setCollection] = useState([]);

  const getCollection = async (id) => {
    console.log(id);
    try {
      const response = await API.get("/collection/" + id);
      // Store product data to useState variabel
      setCollection(response.data.collection);

      console.log(response.data.collection);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCollection(id);
  }, []);

  const [newCollection, setNewCollection] = useState({
    title: "",
  });

  const onChangeTitle = (value) => {
    setNewCollection({ ...newCollection, title: value });
  };

  const handleCollection = async (id) => {
    try {
      // e.preventDefault();

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      // convert form data to string
      const body = JSON.stringify(newCollection);

      console.log(body);
      console.log(id);
      // Insert data user to database
      const response = await API.post(`/collection/${id}`, body, config);

      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <VStack space={3} alignItems="center">
        <Header />

        <Heading textAlign="center" mb="5" mt="5">
          My Collection
        </Heading>
        {collection.length !== 0 ? (
          <View>
            {collection?.map((item, index) => (
              <Box w="90%" key={index}>
                <HStack
                  space={3}
                  alignItems="center"
                  bg="teal.400"
                  rounded="md"
                  shadow={3}
                  mb={3}
                >
                  <Icon
                    color="white"
                    as={<Entypo name="documents" />}
                    size="2xl"
                    m={4}
                  />
                  <Box width={210}>
                    <TouchableOpacity
                      onPress={() => navigation.navigate("List-Todos", item)}
                    >
                      <Text
                        color="white"
                        mr={3}
                        fontSize={24}
                        name="title"
                        id="title"
                        aria-label="Close"
                      >
                        {item.title}
                      </Text>
                    </TouchableOpacity>
                  </Box>
                </HStack>
              </Box>
            ))}
          </View>
        ) : (
          <Box w="90%">
            <HStack
              space={3}
              alignItems="center"
              bg="teal.400"
              rounded="md"
              shadow={3}
            >
              <Icon
                color="white"
                as={<Entypo name="documents" />}
                size="2xl"
                m={4}
              />
              <Box width={210}>
                <Link to={{ screen: "ListTodos" }}>
                  <Text color="white" mr={3} fontSize={24}>
                    Empty
                  </Text>
                </Link>
              </Box>
            </HStack>
          </Box>
        )}
      </VStack>
      <Fab
        position="absolute"
        size="sm"
        bg="teal.500"
        onPress={() => {
          setModalVisible(!modalVisible);
        }}
        icon={<Icon color="white" as={<AntDesign name="plus" />} size="sm" />}
      />

      <Modal
        isOpen={modalVisible}
        onClose={() => setModalVisible(false)}
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
      >
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>Add Collection</Modal.Header>
          <Modal.Body>
            <FormControl>
              <FormControl.Label>Title</FormControl.Label>
              <Input
                type="input"
                name="title"
                onChangeText={(value) => onChangeTitle(value)}
              />
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  setModalVisible(false);
                }}
              >
                Cancel
              </Button>
              <Button onPress={(e) => handleCollection(id)}>Save</Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </View>
  );
}
