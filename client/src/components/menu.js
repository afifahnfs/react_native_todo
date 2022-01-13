import React, { useContext } from "react";
import { Menu, HamburgerIcon, Box, Pressable, View, Text } from "native-base";
import { UserContext } from "../context/userContext";
import { TouchableOpacity } from "react-native";

export default function Header({ navigation }) {
  const [state, dispatch] = useContext(UserContext);

  const logout = () => {
    console.log("klik");
    // e.preventDefault();

    // console.log(state);
    dispatch({
      type: "LOGOUT",
    });
    navigation.navigate("Home");
  };
  // console.log(state);

  return (
    <Box h="10%" w="90%" alignItems="flex-end" mt={5}>
      <Menu
        w="190"
        trigger={(triggerProps) => {
          return (
            <Pressable accessibilityLabel="More options menu" {...triggerProps}>
              <HamburgerIcon />
            </Pressable>
          );
        }}
      >
        <Menu.Item>Profile</Menu.Item>

        <Menu.Item>
          <TouchableOpacity onPress={() => logout()}>
            <View>
              <Text>Log Out</Text>
            </View>
          </TouchableOpacity>
        </Menu.Item>
      </Menu>
    </Box>
  );
}
