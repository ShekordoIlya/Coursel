import React from "react";
import { View, StyleSheet } from "react-native";

const CourseCardSkeleton: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.iconPlaceholder} />
      <View style={styles.textPlaceholder} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 15,
    alignItems: "center",
    gap: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  iconPlaceholder: {
    width: 40,
    height: 40,
    backgroundColor: "#e0e0e0",
    borderRadius: 8,
  },
  textPlaceholder: {
    flex: 1,
    height: 20,
    backgroundColor: "#e0e0e0",
    borderRadius: 4,
  },
});

export default CourseCardSkeleton;
