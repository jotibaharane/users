import Container from "@/components/Container";
import { RootNavigatorParamList } from "@/navigation/type";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthContext, AuthContextProps } from "App";
import { Formik } from "formik";
import React, { useContext } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as Yup from "yup";

const SignInSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email address is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long"),
});

export default function SignIn({
  navigation,
}: NativeStackScreenProps<RootNavigatorParamList, "SignIn">) {
  const { signIn } = useContext(AuthContext) as AuthContextProps;

  return (
    <Container>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={SignInSchema}
        onSubmit={(values) => signIn(values)}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <ScrollView className="p-5">
            <View className="justify-center mt-10">
              <View className="mb-5">
                <Text className="font-bold text-2xl">Sign In.</Text>
                <View className="flex-1 flex-row items-center ">
                  <Text className="text-gray-400"> New here?</Text>

                  <TouchableOpacity
                    onPress={() => navigation.navigate("SignUp")}
                  >
                    <Text className="text-center  ml-2">Sign up</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View className="mb-4">
                <TextInput
                  placeholder="Email Address"
                  className="h-12 border border-gray-300 mb-1 p-3"
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                  keyboardType="email-address"
                />
                {touched.email && errors.email && (
                  <Text className="text-red-500">{errors.email}</Text>
                )}
              </View>
              <View className="mb-4">
                <TextInput
                  placeholder="Password"
                  className="h-12 border border-gray-300 mb-1 p-3"
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                  secureTextEntry
                />
                {touched.password && errors.password && (
                  <Text className="text-red-500">{errors.password}</Text>
                )}
              </View>
              <TouchableOpacity
                className="bg-blue-500 p-4 rounded"
                onPress={() => handleSubmit()}
              >
                <Text className="text-white text-center text-lg">Sign In</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        )}
      </Formik>
    </Container>
  );
}
