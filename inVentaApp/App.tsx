import React, { Suspense } from "react";
import { View, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SQLiteProvider } from "expo-sqlite";
import { HomeScreen } from "./src/screens/HomeScreen";
import { CategoriaForm } from "./src/components/forms/CategoriaForm";
import { DATABASE_NAME, migraciones } from "./src/services/database";

export type RootStackParamList = {
  Home: undefined;
  CategoriaForm: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <SQLiteProvider
      databaseName={DATABASE_NAME}
      onInit={migraciones}
      useSuspense
    >
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="CategoriaForm"
            component={CategoriaForm}
            options={{ title: "Agregar una categoría" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SQLiteProvider>
  );
}
