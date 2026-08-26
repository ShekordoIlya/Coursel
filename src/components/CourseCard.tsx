import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { ICourses } from "../api/coursesSlice";
import { RootStackParamList } from "../types/rootStackTypes";

type NavigationProp = StackNavigationProp<RootStackParamList, "Home">;

interface CourseCardProps {
  course: ICourses;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const navigation = useNavigation<NavigationProp>();
  const { title, id, description } = course;

  const handlePress = () => {
    navigation.navigate("CourseDetails", {
      courseId: id.toString(),
      courseName: title,
      courseDescription: description || "Описание отсутствует",
    });
  };

  return (
    <Pressable onPress={handlePress} style={({ pressed }) => [styles.container, { transform: [{ scale: pressed ? 0.97 : 1 }] }]}>
      <View style={styles.iconContainer}>
        <AntDesign name="laptop" size={24} color="#007AFF" />
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <Text style={styles.description} numberOfLines={2}>
          {description || "Нажмите, чтобы узнать подробнее о курсе..."}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#E3F2FD",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  description: {
    fontSize: 13,
    color: "#888",
  },
});

export default CourseCard;
