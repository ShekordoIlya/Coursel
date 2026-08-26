import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Pressable, Alert, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigationProp } from "../types/rootStackTypes";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { createCourse } from "../api/coursesSlice";

const AddCourseScreen: React.FC = () => {
  const navigation = useNavigation<RootStackNavigationProp<"AddCourse">>();
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.courses);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleCreate = async () => {
    if (!title.trim() || !description.trim()) {
      Alert.alert("Ошибка", "Заполните все поля");
      return;
    }

    const resultAction = await dispatch(createCourse({ title, description }));

    if (createCourse.fulfilled.match(resultAction)) {
      Alert.alert("Успех", "Курс успешно создан!");
      navigation.goBack();
    } else {
      Alert.alert("Ошибка", "Не удалось создать курс");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Новый курс</Text>

      <TextInput style={styles.input} placeholder="Название курса" value={title} onChangeText={setTitle} />

      <TextInput style={[styles.input, styles.textArea]} placeholder="Описание курса" value={description} onChangeText={setDescription} multiline numberOfLines={4} />

      {error && <Text style={styles.errorText}>{error}</Text>}

      <Pressable style={[styles.button, loading && styles.buttonDisabled]} onPress={handleCreate} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Создать курс</Text>}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    marginBottom: 15,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: "#a0cfff",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
  },
});

export default AddCourseScreen;
