import ScreensNavigator from "@/navigation/routes";
import { NavigationContainer } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import React, { createContext, useEffect, useMemo, useReducer } from "react";
import { Alert, Text } from "react-native";

interface AuthState {
  isLoading: boolean;
  isSignout: boolean;
  userDetails: any | null;
  token: string | null;
}

type AuthAction =
  | { type: "RESTORE_TOKEN"; token: string | null }
  | { type: "SIGN_IN"; token: string }
  | { type: "SIGN_UP"; token: any }
  | { type: "SIGN_OUT" };

export interface AuthContextProps extends AuthState {
  signIn: (data: any) => Promise<void>;
  signOut: () => void;
  signUp: (data: any) => Promise<void>;
}

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);

function authReducer(prevState: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case "RESTORE_TOKEN":
      return {
        ...prevState,
        userDetails: action.token,
        isLoading: false,
      };
    case "SIGN_IN":
      return {
        ...prevState,
        isSignout: false,
        token: action.token,
      };
    case "SIGN_UP":
      return {
        ...prevState,
        isSignout: false,
        userDetails: action.token,
      };
    case "SIGN_OUT":
      return {
        ...prevState,
        isSignout: true,
        userDetails: null,
        token: null,
      };
    default:
      return prevState;
  }
}

const initialAuthState: AuthState = {
  isLoading: true,
  isSignout: false,
  userDetails: null,
  token: null,
};

export default function App(): JSX.Element {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);

  useEffect(() => {
    const bootstrapAsync = async () => {
      let userDetails: string | null = null;

      try {
        userDetails = await SecureStore.getItemAsync("UseDetails");
      } catch (e) {}

      dispatch({ type: "RESTORE_TOKEN", token: userDetails });
    };

    bootstrapAsync();
  }, []);

  const authContext = useMemo(
    () => ({
      signIn: async (data: any) => {
        const datas = await SecureStore.getItemAsync("UseDetails");

        const { email, password } = JSON.parse(datas!);
        if (email === data?.email && password === data?.password) {
          dispatch({ type: "SIGN_IN", token: "dummy-auth-token" });
        } else {
          Alert.alert("Alert", "Please Enter Correct Username And Password", [
            { text: "OK", onPress: () => "" },
          ]);
        }
      },
      signOut: async () => {
        await SecureStore.deleteItemAsync("UseDetails");
        dispatch({ type: "SIGN_OUT" });
      },

      signUp: async (data: any) => {
        await SecureStore.setItemAsync("UseDetails", JSON.stringify(data));
        dispatch({ type: "SIGN_UP", token: data });
      },
    }),
    []
  );

  const contextValue = {
    ...state,
    ...authContext,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      <NavigationContainer fallback={<Text>Loading...</Text>}>
        <ScreensNavigator />
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
