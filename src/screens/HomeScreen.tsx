import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { View, Text, StyleSheet, Button, ActivityIndicator, Pressable } from "react-native";
import { RootStackNavigationProp } from "../types/rootStackTypes";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getCourses } from "../api/coursesSlice";
import { FlatList } from "react-native";
import CourseCard from "../components/CourseCard";

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<RootStackNavigationProp<"Home">>();
  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector((state) => state.courses);
  const userName = useAppSelector((state) => state.auth.userName);

  useEffect(() => {
    dispatch(getCourses());
  }, [dispatch]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Загрузка курсов...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={{ color: "red" }}>Ошибка: {error}</Text>
        <Button title="Попробовать снова" onPress={() => dispatch(getCourses())} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>Домашний экран</Text>
      <Text>Найдено курсов: {data?.length || 0}</Text>

      <FlatList style={{ flex: 1, width: "100%" }} data={data || []} keyExtractor={(item) => item.id.toString()} renderItem={({ item }) => <CourseCard course={item} />} contentContainerStyle={styles.coursesContainer}></FlatList>

      <View style={styles.buttonsContainer}>
        <Text style={styles.buttonsContainerText}>Привет, {userName}!</Text>
        <Pressable style={styles.button} onPress={() => navigation.navigate("Profile")}>
          <Text style={styles.buttonText}>На экран профиля</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: 50,
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 20,
  },
  buttonsContainer: {
    paddingVertical: 30,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  buttonsContainerText: {
    fontSize: 16,
  },
  coursesContainer: {
    paddingVertical: 10,
    gap: 15,
  },
  button: {
    paddingHorizontal: 100,
    paddingVertical: 15,
    backgroundColor: "#c00",
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default HomeScreen;
