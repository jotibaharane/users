import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "App";
import React, { useContext, useEffect } from "react";
import { Text, View } from "react-native";

const Splash = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    return null;
  }

  const { token } = authContext;
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      navigation.reset({
        routes: [{ name: token === "dummy-auth-token" ? "home" : "SignIn" }],
      });
    }, 2100);
  }, [navigation]);
  return (
    <View className="flex-1 items-center justify-center bg-[#90ee90]">
      <Text className="text-6xl font-bold text-green-700">Users</Text>
    </View>
  );
};

export default Splash;
