import React from "react";
import { View, Text, StyleSheet, ScrollView, Pressable, Alert } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../types/rootStackTypes";
import AntDesign from "@expo/vector-icons/AntDesign";

type CourseDetailRouteProp = RouteProp<RootStackParamList, "CourseDetails">;

const CourseDetailScreen: React.FC = () => {
  const route = useRoute<CourseDetailRouteProp>();
  const { courseName, courseDescription } = route.params;

  const formattedDate = new Date().toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const handleEnroll = () => {
    Alert.alert("Успех!", `Вы успешно записались на курс "${courseName}"`);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <View style={styles.iconCircle}>
          <AntDesign name="book" size={40} color="#fff" />
        </View>
      </View>

      <View style={styles.body}>
        <Text style={styles.title}>{courseName}</Text>

        <View style={styles.dateContainer}>
          <AntDesign name="code" size={14} color="#888" />
          <Text style={styles.dateText}>Добавлен: {formattedDate}</Text>
        </View>

        <View style={styles.divider} />

        <Text style={styles.sectionTitle}>О курсе</Text>
        <Text style={styles.description}>{courseDescription}</Text>

        <Pressable style={({ pressed }) => [styles.enrollButton, { opacity: pressed ? 0.8 : 1 }]} onPress={handleEnroll}>
          <Text style={styles.enrollButtonText}>Записаться на курс</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  content: {
    paddingBottom: 40,
  },
  header: {
    backgroundColor: "#007AFF",
    paddingVertical: 50,
    alignItems: "center",
    justifyContent: "center",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 8,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  body: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 10,
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  dateText: {
    fontSize: 14,
    color: "#888",
    marginLeft: 5,
  },
  divider: {
    height: 1,
    backgroundColor: "#e0e0e0",
    marginVertical: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "#555",
    lineHeight: 24,
  },
  enrollButton: {
    backgroundColor: "#28a745",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 30,
    shadowColor: "#28a745",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  enrollButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CourseDetailScreen;
