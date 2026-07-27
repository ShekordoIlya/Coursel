import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { RootStackParamList } from "../types/rootStackTypes";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { logout } from "../store/slices/authSlice";
import { clearUser } from "../utils/storage";

const ProfileScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const dispatch = useAppDispatch();
  const userName = useAppSelector((state) => state.auth.userName);

  const signOut = async () => {
    dispatch(logout());
    await clearUser();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textGreeting}>Приветствую, {userName || "Гость"} !</Text>
      <Pressable style={styles.buttonCourses} onPress={() => navigation.navigate("Home")}>
        <Text style={styles.buttonText}>Перейти к курсам</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={signOut}>
        <Text style={styles.buttonText}>Выйти</Text>
      </Pressable>
    </View>
  );
};

const buttonBase = {
  borderRadius: 10,
  marginTop: 15,
  paddingVertical: 15,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    ...buttonBase,
    paddingHorizontal: 100,
    backgroundColor: "#c00",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  textGreeting: {
    fontSize: 16,
  },
  buttonCourses: {
    ...buttonBase,
    paddingHorizontal: 55,
    backgroundColor: "#af9e02",
  },
});

export default ProfileScreen;
