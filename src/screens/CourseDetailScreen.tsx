import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { RootStackNavigationProp, RootStackRouteProp } from "../types/rootStackTypes";

const CourseDetailScreen: React.FC = () => {
  const navigation = useNavigation<RootStackNavigationProp<"CourseDetails">>();
  const route = useRoute<RootStackRouteProp<"CourseDetails">>();
  const routeParams = route.params;

  return (
    <View style={styles.container}>
      <Text>Детали курса</Text>
      <Text>{routeParams.courseName}</Text>
      <Text>{routeParams.courseDescription}</Text>
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

export default CourseDetailScreen;
