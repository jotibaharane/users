import Container from "@/components/Container";
import UserListComponent from "@/components/UserList";
import React from "react";
import { ScrollView, View } from "react-native";

const UserList = () => {
  return (
    <Container>
      <View className="flex-1">
        <ScrollView showsVerticalScrollIndicator={false}>
          <UserListComponent />
        </ScrollView>
      </View>
    </Container>
  );
};

export default UserList;
