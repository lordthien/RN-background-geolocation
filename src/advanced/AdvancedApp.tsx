import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Button, Icon } from "react-native-elements";

import BackgroundGeolocation from "../react-native-background-geolocation";

import HomeView from "./HomeView";
import SettingsView from "./SettingsView";
import GeofenceView from "./GeofenceView";

const Stack = createNativeStackNavigator();

const AdvancedApp = ({ route, navigation }) => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        title: "Run",
        headerStyle: {
          backgroundColor: "#fedd1e",
        },
        headerLeft: () => (
          <Button
            type="clear"
            onPress={() => {
              navigation.goBack();
            }}
            icon={<Icon name="home-sharp" type="ionicon" />}
          />
        ),
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeView}
        initialParams={route.params}
      />
    </Stack.Navigator>
  );
};

export default AdvancedApp;
