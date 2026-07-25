import { StyleSheet, Text, View } from "react-native";
import { ICourses } from "../api/coursesSlice";

const CourseCard = ({ course }: { course: ICourses }) => {
  const { title } = course;

  return (
    <View style={styles.container}>
      <Text>Курс по {title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CourseCard;
