import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable, Alert } from "react-native";
import { RootStackNavigationProp } from "../types/rootStackTypes";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { TextInput } from "react-native";
import { initializeAuth, login } from "../store/slices/authSlice";
import { saveUser } from "../utils/storage";

const LoginScreen: React.FC = () => {
  // const navigation = useNavigation<RootStackNavigationProp<"Login">>();
  const userName = useAppSelector((state) => state.auth.userName);
  const [input, setInput] = useState("");
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  const pressableHandler = async () => {
    if (input === "") {
      Alert.alert("Ошибка", "Поле не может быть пустым!");
      return;
    }

    dispatch(login(input));
    await saveUser(input);
    setInput("");
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 16 }}>Вы не авторизованы</Text>
      <Text style={{ fontSize: 16, marginTop: 10 }}>Введите имяпользователя</Text>
      <TextInput style={styles.input} placeholder="Введите имя" value={input} onChangeText={setInput}></TextInput>
      <Pressable onPress={pressableHandler} style={styles.button}>
        <Text style={styles.buttonText}>Войти</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
    width: 300,
    marginTop: 20,
  },
  button: {
    marginTop: 20,
    paddingHorizontal: 130,
    paddingVertical: 15,
    backgroundColor: "#c00",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default LoginScreen;
