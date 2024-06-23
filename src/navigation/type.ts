import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootNavigatorParamList = {
  SignUp?: undefined;
  SignIn?: undefined;
  Splash?: undefined;
  home?: undefined;
};

export type RootStackScreenProps<T extends keyof RootNavigatorParamList> =
  NativeStackScreenProps<RootNavigatorParamList, T>;

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace ReactNavigation {
    interface RootParamList extends RootNavigatorParamList {}
  }
}
