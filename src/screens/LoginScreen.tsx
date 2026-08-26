import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable, Alert, TextInput, ActivityIndicator, KeyboardAvoidingView, Platform } from "react-native";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { initializeAuth, login, register } from "../store/slices/authSlice";
import { saveToken, saveUserData } from "../utils/storage";

const LoginScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);

  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  const handleSubmit = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Ошибка", "Email и пароль обязательны");
      return;
    }
    if (!isLogin && !name.trim()) {
      Alert.alert("Ошибка", "Имя обязательно");
      return;
    }
    if (password.length < 6) {
      Alert.alert("Ошибка", "Пароль должен быть не менее 6 символов");
      return;
    }

    try {
      let resultAction;
      if (isLogin) {
        resultAction = await dispatch(login({ email, password }));
      } else {
        resultAction = await dispatch(register({ name, email, password }));
      }

      if ((isLogin ? login : register).fulfilled.match(resultAction)) {
        const { token, user } = resultAction.payload!;
        await saveToken(token);
        await saveUserData(user);
      } else {
        Alert.alert("Ошибка", resultAction.payload || "Неизвестная ошибка");
      }
    } catch (e) {
      Alert.alert("Ошибка", "Произошла непредвиденная ошибка");
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <Text style={styles.title}>{isLogin ? "Вход в систему" : "Регистрация"}</Text>

      {!isLogin && <TextInput style={styles.input} placeholder="Ваше имя" value={name} onChangeText={setName} autoCapitalize="words" />}

      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />

      <TextInput style={styles.input} placeholder="Пароль (мин. 6 символов)" value={password} onChangeText={setPassword} secureTextEntry />

      {error && <Text style={styles.errorText}>{error}</Text>}

      <Pressable style={styles.button} onPress={handleSubmit} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>{isLogin ? "Войти" : "Зарегистрироваться"}</Text>}
      </Pressable>

      <Pressable
        onPress={() => {
          setIsLogin(!isLogin);
          setName("");
          setEmail("");
          setPassword("");
        }}
        style={styles.switchButton}
      >
        <Text style={styles.switchText}>{isLogin ? "Нет аккаунта? Зарегистрироваться" : "Уже есть аккаунт? Войти"}</Text>
      </Pressable>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20, backgroundColor: "#f5f5f5" },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 30, color: "#333", textAlign: "center" },
  input: { width: "100%", height: 50, backgroundColor: "#fff", borderWidth: 1, borderColor: "#ddd", borderRadius: 8, paddingHorizontal: 15, fontSize: 16, marginBottom: 15 },
  button: { width: "100%", paddingVertical: 15, backgroundColor: "#007AFF", borderRadius: 8, alignItems: "center", marginTop: 10 },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  switchButton: { marginTop: 20, alignItems: "center" },
  switchText: { color: "#007AFF", fontSize: 14 },
  errorText: { color: "red", textAlign: "center", marginBottom: 10 },
});

export default LoginScreen;
