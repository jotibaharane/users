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

const SignUpSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  phone: Yup.string()
    .required("Phone number is required")
    .matches(/^[0-9]+$/, "Phone number is not valid")
    .min(10, "Phone number is too short")
    .max(15, "Phone number is too long"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email address is required"),
  address: Yup.string(),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), undefined], "Passwords must match")
    .required("Confirm Password is required"),
});

export default function SignUp({
  navigation,
}: NativeStackScreenProps<RootNavigatorParamList, "SignUp">) {
  const { signUp } = useContext(AuthContext) as AuthContextProps;
  return (
    <Container>
      <Formik
        initialValues={{
          name: "",
          phone: "",
          email: "",
          address: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={SignUpSchema}
        onSubmit={(values) => signUp(values)}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <ScrollView className="p-5 ">
            <View className="justify-center mt-10">
              <View className="mb-5">
                <Text className="font-bold text-2xl">Create new account.</Text>
                <View className="flex-1 flex-row items-center ">
                  <Text className="text-gray-400">Already a member?</Text>

                  <TouchableOpacity
                    onPress={() => navigation.navigate("SignIn")}
                  >
                    <Text className="text-center  ml-2">Sign in</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View className="mb-4">
                <TextInput
                  placeholder="Name"
                  className="h-12 border border-gray-300 mb-1 p-3"
                  onChangeText={handleChange("name")}
                  onBlur={handleBlur("name")}
                  value={values.name}
                />
                {touched.name && errors.name && (
                  <Text className="text-red-500 ">{errors.name}</Text>
                )}
              </View>
              <View className="mb-4">
                <TextInput
                  placeholder="Phone Number"
                  className="h-12 border border-gray-300 mb-1 p-3"
                  onChangeText={handleChange("phone")}
                  onBlur={handleBlur("phone")}
                  value={values.phone}
                  keyboardType="phone-pad"
                />
                {touched.phone && errors.phone && (
                  <Text className="text-red-500 ">{errors.phone}</Text>
                )}
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
                  <Text className="text-red-500 ">{errors.email}</Text>
                )}
              </View>
              <View className="mb-4">
                <TextInput
                  placeholder="Address"
                  className=" border border-gray-300 mb-1 px-3"
                  onChangeText={handleChange("address")}
                  onBlur={handleBlur("address")}
                  value={values.address}
                  multiline
                  numberOfLines={4}
                  editable
                />
                {touched.address && errors.address && (
                  <Text className="text-red-500 ">{errors.address}</Text>
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
                  <Text className="text-red-500 ">{errors.password}</Text>
                )}
              </View>

              <View className="mb-4">
                <TextInput
                  placeholder="Confirm Password"
                  className="h-12 border border-gray-300 mb-1 p-3"
                  onChangeText={handleChange("confirmPassword")}
                  onBlur={handleBlur("confirmPassword")}
                  value={values.confirmPassword}
                  secureTextEntry
                />
                {touched.confirmPassword && errors.confirmPassword && (
                  <Text className="text-red-500 ">
                    {errors.confirmPassword}
                  </Text>
                )}
              </View>
              <TouchableOpacity
                className="bg-blue-500 p-4 rounded"
                onPress={() => handleSubmit()}
              >
                <Text className="text-white text-center text-lg">Submit</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        )}
      </Formik>
    </Container>
  );
}
