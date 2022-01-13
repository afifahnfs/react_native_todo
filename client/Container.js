import React from "react";

import { AsyncStorage } from "react-native";

// Import Navigation Container
import { NavigationContainer } from "@react-navigation/native";

// Import Stack Navigation
import { createStackNavigator } from "@react-navigation/stack";

import { API, setAuthToken } from "./src/context/userContext";

// import Theme NativeBase
import { useTheme } from "native-base";

// import screens
import Hello from "./src/screens/Hello";
import Login from "./src/screens/Login";
import Register from "./src/screens/Register";
import MyTodos from "./src/screens/MyTodos";
import ListTodos from "./src/screens/ListTodos";

// Init token on axios every time the app is refreshed here ...
// if (localStorage.token) {
//   setAuthToken(localStorage.token);
// }

// Init Stack Navigation
const Stack = createStackNavigator();

export default function Container() {
  // Theme use
  const theme = useTheme();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerMode: "screen",
          headerTintColor: "white",
          headerStyle: { backgroundColor: theme.colors.primary["300"] },
        }}
      >
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            title: "Login",
          }}
        />

        <Stack.Screen
          name="Register"
          component={Register}
          options={{
            title: "Register",
          }}
        />

        <Stack.Screen
          name="Home"
          component={Hello}
          options={{
            title: "Hello",
          }}
        />

        <Stack.Screen
          name="My-Todos"
          component={MyTodos}
          options={{
            title: "My Todos",
          }}
        />

        <Stack.Screen
          name="List-Todos"
          component={ListTodos}
          options={{
            title: "List Todos",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
