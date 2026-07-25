import { Pressable, StyleSheet, Text, View } from "react-native";
import { ICourses } from "../api/coursesSlice";
import { RootStackNavigationProp } from "../types/rootStackTypes";
import { useNavigation } from "@react-navigation/native";

const CourseCard = ({ course }: { course: ICourses }) => {
  const { title, id, userId, body } = course;
  const navigation = useNavigation<RootStackNavigationProp<"CourseDetails">>();

  return (
    <Pressable
      onPress={() => {
        navigation.navigate("CourseDetails", { courseId: id.toString(), courseName: title, courseDescription: body });
      }}
    >
      <View style={styles.container}>
        <Text>Курс по {title}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
  },
});

export default CourseCard;
