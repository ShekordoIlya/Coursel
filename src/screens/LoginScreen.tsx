import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { RootStackNavigationProp } from "../types/rootStackTypes";

const LoginScreen: React.FC = () => {
  const navigation = useNavigation<RootStackNavigationProp<"Login">>();

  return (
    <View style={styles.container}>
      <Text>Экран авторизации</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default LoginScreen;
