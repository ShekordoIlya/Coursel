import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { RootStackNavigationProp } from "../types/rootStackTypes";
import { useAppSelector, useAppDispatch } from "../store/hooks";

const LoginScreen: React.FC = () => {
  const navigation = useNavigation<RootStackNavigationProp<"Login">>();
  const userName = useAppSelector((state) => state.auth.userName);

  return (
    <View style={styles.container}>
      <Text>Экран авторизации</Text>
      <Text>{userName ? "Вы авторизованы" : "Вы не авторизованы"}</Text>
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
