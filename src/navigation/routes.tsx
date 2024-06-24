import Home from "@/screens/home";
import SignIn from "@/screens/sign-in";
import SignUp from "@/screens/sign-up";
import Splash from "@/screens/splash";
import UserList from "@/screens/user-list";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthContext } from "App";
import React, { useContext } from "react";
import { Button } from "react-native";
import { RootNavigatorParamList } from "./type";

const Stack = createNativeStackNavigator<RootNavigatorParamList>();

const ScreensNavigator: React.FC = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    return null;
  }

  const { token, signOut } = authContext;

  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="Splash"
        component={Splash}
      />
      {token === "dummy-auth-token" ? (
        <React.Fragment>
          <Stack.Screen
            name="home"
            component={Home}
            options={{
              headerRight: () => (
                <Button title="Logout" onPress={() => signOut()} />
              ),
              title: "User Locations",
            }}
          />
          <Stack.Screen
            name="user-list"
            component={UserList}
            options={{
              headerRight: () => (
                <Button title="Logout" onPress={() => signOut()} />
              ),
              title: "Users List",
            }}
          />
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Stack.Screen
            options={{ headerShown: false }}
            name="SignIn"
            component={SignIn}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="SignUp"
            component={SignUp}
          />
        </React.Fragment>
      )}
    </Stack.Navigator>
  );
};

export default ScreensNavigator;
