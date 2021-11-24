import React from "react";
import { StyleSheet, Text, View, Linking } from "react-native";

import { Card, Button, Icon } from "react-native-elements";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { COLORS } from "../lib/config";
import ENV from "../ENV";

import SettingsService from "../advanced/lib/SettingsService";

import BackgroundGeolocation from "../react-native-background-geolocation";

const HomeView = ({ route, navigation }) => {
  const [org, setOrg] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [deviceModel, setDeviceModel] = React.useState("");

  const settingsService = SettingsService.getInstance();

  React.useEffect(() => {
    if (route.params) {
      setOrg(route.params.org);
      setUsername(route.params.username);
    }
  }, [route, navigation]);

  React.useLayoutEffect(() => {
    // Restore org/username from AsyncStorage.
    AsyncStorage.getItem("@transistorsoft:org").then((value) => {
      if (value != null) {
        setOrg(value);
      }
    });

    AsyncStorage.getItem("@transistorsoft:username").then((value) => {
      if (value != null) {
        setUsername(value);
      }
    });

    // Set DeviceModel.
    BackgroundGeolocation.getDeviceInfo().then((deviceInfo) => {
      setDeviceModel(deviceInfo.model);
    });
  }, [navigation]);

  const onClickNavigate = async (route: string) => {
    settingsService.playSound("OPEN");
    navigation.navigate(route, {
      screen: route,
    });
  };

  return (
    <View
      style={{
        flexDirection: "column",
        flex: 1,
        backgroundColor: "#111",
      }}
    >
      <View
        style={{
          padding: 20,
          flex: 1,
          flexDirection: "column",
          justifyContent: "space-around",
        }}
      >
        <Button
          buttonStyle={{ backgroundColor: COLORS.gold }}
          titleStyle={{ color: COLORS.black }}
          title="Advanced App"
          onPress={() => onClickNavigate("AdvancedApp")}
        />
      </View>
    </View>
  );
};

export default HomeView;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});
