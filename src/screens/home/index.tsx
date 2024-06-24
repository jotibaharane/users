import { RootNavigatorParamList } from "@/navigation/type";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthContext, AuthContextProps } from "App";
import * as Location from "expo-location";
import React, { useContext, useEffect, useState } from "react";
import { Alert, Button, Text, View } from "react-native";
const Home = ({
  navigation,
}: NativeStackScreenProps<RootNavigatorParamList, "home">) => {
  const [location, setLocation] = useState<any>({});
  const { signUp, userDetails } = useContext(AuthContext) as AuthContextProps;
  const getLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        Alert.alert("", "Location is Required", [
          { text: "OK", onPress: () => getLocation() },
        ]);
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    } catch (error) {
      console.error("Error requesting location permission:", error);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <View className="flex-1 gap-2 p-5 ">
      <View className="gap-1 flex-row ">
        <Text className="font-bold text-2xl">User Name:</Text>
        <Text className="font-semibold text-2xl text-blue-600">
          {JSON.parse(userDetails)?.name}
        </Text>
      </View>
      <View className="gap-1 flex-row ">
        <Text className="font-bold text-2xl">longitude:</Text>
        <Text className="font-semibold text-2xl text-blue-600">
          {location?.coords?.longitude}
        </Text>
      </View>
      <View className="gap-1 flex-row ">
        <Text className="font-bold text-2xl">latitude:</Text>
        <Text className="font-semibold text-2xl text-blue-600">
          {location?.coords?.latitude}
        </Text>
      </View>
      <View className="items-center justify-center  pt-10">
        <Button
          onPress={() => navigation.navigate("user-list")}
          title="Users List"
        />
      </View>
    </View>
  );
};

export default Home;
