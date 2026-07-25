import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { View, Text, StyleSheet, Button, ActivityIndicator } from "react-native";
import { RootStackNavigationProp } from "../types/rootStackTypes";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getCourses } from "../api/coursesSlice";
import { FlatList } from "react-native";
import CourseCard from "../components/CourseCard";

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<RootStackNavigationProp<"Home">>();
  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector((state) => state.courses);

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
        <Button onPress={() => navigation.navigate("Login")} title="На экран Login" />
        {/* <Button onPress={() => navigation.navigate("CourseDetails", { courseId: "1", courseName: "React Native для начинающих", courseDescription: body })} title="Детали курса" /> */}
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
    paddingVertical: 20,
    gap: 10,
  },
  coursesContainer: {
    paddingVertical: 10,
    gap: 15,
  },
});

export default HomeScreen;
