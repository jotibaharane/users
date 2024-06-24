import { User } from "@/types";
import React, { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

export default function UserListComponent() {
  const [userArray, setUserArray] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "https://randomuser.me/api/?results=100&inc=name"
        );
        const data = await response.json();
        setUserArray(data.results || []);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <View className=" bg-white">
      {userArray.length > 0 && (
        <FlatList
          nestedScrollEnabled={true}
          scrollEnabled={false}
          data={userArray}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item?.name?.first + item?.name?.last}
          renderItem={({ item }) => (
            <TouchableOpacity
              className="mb-4 mx-4 space-y-1"
              key={item?.name?.first + item?.name?.last}
            >
              <View className="flex-row justify-start w-full shadow-sm">
                <View className="w-full px-8 py-2 justify-start items-start flex-row bg-slate-300">
                  <Text className="text-xs font-bold text-gray-900 pr-1">
                    {item?.name?.title}.
                  </Text>
                  <Text className="text-xs font-bold text-gray-900">
                    {item?.name?.first}
                  </Text>
                  <Text className="text-xs font-bold text-gray-900">
                    {item?.name?.last}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}
