import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { RootStackNavigationProp } from "../types/rootStackTypes";

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<RootStackNavigationProp<"Home">>();

  return (
    <View style={styles.container}>
      <Text>Домашний экран</Text>
      <Button onPress={() => navigation.navigate("Login")} title="Custom button" />
      <Button title="Second button" />
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

export default HomeScreen;
