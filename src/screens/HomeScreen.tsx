import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { View, Text, StyleSheet, Button, ActivityIndicator, Pressable, RefreshControl } from "react-native";
import { RootStackNavigationProp } from "../types/rootStackTypes";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getCourses } from "../api/coursesSlice";
import { FlatList } from "react-native";
import CourseCard from "../components/CourseCard";
import CourseCardSkeleton from "../components/CourseCardSkeleton";

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<RootStackNavigationProp<"Home">>();
  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector((state) => state.courses);
  const userName = useAppSelector((state) => state.auth.userName);

  useEffect(() => {
    dispatch(getCourses());
  }, [dispatch]);

  const handleRefresh = () => {
    dispatch(getCourses());
  };

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
      <Text style={styles.header}>Домашний экран</Text>
      <Text style={styles.subHeader}>Найдено курсов: {data?.length || 0}</Text>

      {loading && (!data || data.length === 0) ? (
        <View style={styles.skeletonContainer}>
          <CourseCardSkeleton />
          <CourseCardSkeleton />
          <CourseCardSkeleton />
        </View>
      ) : (
        <FlatList style={{ flex: 1, width: "100%" }} data={data || []} keyExtractor={(item) => item.id.toString()} renderItem={({ item }) => <CourseCard course={item} />} contentContainerStyle={styles.coursesContainer} refreshControl={<RefreshControl refreshing={loading} onRefresh={handleRefresh} tintColor="#007AFF" />} />
      )}

      <View style={styles.buttonsContainer}>
        <Text style={styles.buttonsContainerText}>Привет, {userName}!</Text>
        <Pressable style={styles.button} onPress={() => navigation.navigate("Profile")}>
          <Text style={styles.buttonText}>На экран профиля</Text>
        </Pressable>
        <Pressable style={styles.addButton} onPress={() => navigation.navigate("AddCourse")}>
          <Text style={styles.buttonText}>+ Добавить курс</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: 10,
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 10,
  },
  buttonsContainer: {
    paddingVertical: 15,
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
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
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  subHeader: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
  },
  skeletonContainer: {
    flex: 1,
    width: "100%",
    paddingTop: 10,
  },
  addButton: {
    paddingHorizontal: 100,
    paddingVertical: 15,
    backgroundColor: "#28a745",
    borderRadius: 10,
    marginTop: 10,
  },
});

export default HomeScreen;
