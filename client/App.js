// Import RN-Gesture-handler
// import "react-native-gesture-handler";

import React from "react";
import {
  HStack,
  Switch,
  useColorMode,
  NativeBaseProvider,
  extendTheme,
  StatusBar,
} from "native-base";

import { UserContextProvider } from "./src/context/userContext";

import Contain from "./Container";

// Define the config
const config = {
  useSystemColorMode: false,
  initialColorMode: "dark",
};

// extend the theme
export const theme = extendTheme({
  config,
});

// Color Switch Component
function ToggleDarkMode() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <HStack mr={5} alignSelf="flex-end">
      <Switch
        isChecked={colorMode === "light" ? true : false}
        onToggle={toggleColorMode}
        aria-label={
          colorMode === "light" ? "switch to dark mode" : "switch to light mode"
        }
      />
    </HStack>
  );
}

export const BarStatus = () => {
  return <StatusBar />;
};

export default function App() {
  return (
    <UserContextProvider>
      <NativeBaseProvider>
        {/* <Container
        _dark={{ bg: "blueGray.900" }}
        _light={{ bg: "blueGray.50" }}
        flex={1}
        maxWidth="100%"
      >
        <BarStatus />
        <ToggleDarkMode /> */}
        <Contain />
        {/* </Container> */}
      </NativeBaseProvider>
    </UserContextProvider>
  );
}
