import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "./src/screens/HomeScreen";
import { CategoriaForm } from "./src/components/forms/CategoriaForm";
import { inicializarBaseDeDatos } from "./src/services/database";

export type RootStackParamList = {
  Home: undefined;
  CategoriaForm: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  useEffect(() => {
    inicializarBaseDeDatos().catch((err) => {
      console.error("Error al inicializar la base de datos al arrancar la app:", err);
    });
  }, []);

  return (
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
  );
}
