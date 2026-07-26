import { Pressable, StyleSheet, Text, View } from "react-native";
import { ICourses } from "../api/coursesSlice";
import { RootStackParamList } from "../types/rootStackTypes";
import { useNavigation } from "@react-navigation/native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type CourseCardNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const CourseCard = ({ course }: { course: ICourses }) => {
  const { title, id, userId, body } = course;
  const navigation = useNavigation<CourseCardNavigationProp>();

  return (
    <Pressable
      onPress={() => {
        navigation.navigate("CourseDetails", { courseId: id.toString(), courseName: title, courseDescription: body });
      }}
    >
      <View style={styles.container}>
        <View style={styles.wrapperContainer}>
          <AntDesign name="laptop" size={24} color="black" />
          <Text style={{ flex: 1, fontSize: 16 }}>Курс по {title}</Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginHorizontal: 16,
    justifyContent: "center",
    alignItems: "center",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  wrapperContainer: {
    flex: 1,
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    justifyContent: "flex-start",
  },
});

export default CourseCard;
