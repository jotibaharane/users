// ScreensNavigator.tsx
import Home from "@/screens/home";
import SignIn from "@/screens/sign-in";
import SignUp from "@/screens/sign-up";
import Splash from "@/screens/splash";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthContext } from "App";
import React, { useContext } from "react";
import { RootNavigatorParamList } from "./type";

const Stack = createNativeStackNavigator<RootNavigatorParamList>();

const ScreensNavigator: React.FC = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    return null; // or handle the error appropriately
  }

  const { token } = authContext;

  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="Splash"
        component={Splash}
      />
      {token === "dummy-auth-token" ? (
        <React.Fragment>
          <Stack.Screen name="home" component={Home} />
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
