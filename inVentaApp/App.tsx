import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "./src/screens/HomeScreen";
import { CategoriaForm } from "./src/components/forms/CategoriaForm";

export type RootStackParamList = {
  Home: undefined;
  CategoriaForm: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
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
