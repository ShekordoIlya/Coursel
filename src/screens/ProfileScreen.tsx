import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { RootStackNavigationProp } from "../types/rootStackTypes";

const ProfileScreen: React.FC = () => {
  const navigation = useNavigation<RootStackNavigationProp<"Profile">>();

  return (
    <View style={styles.container}>
      <Text>Профиль пользователя</Text>
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

export default ProfileScreen;
