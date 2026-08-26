import React, { useEffect } from "react";
import { View, Text, StyleSheet, Pressable, ScrollView, Alert, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { logout } from "../store/slices/authSlice";
import { clearUser } from "../utils/storage";
import { getEnrollments, updateEnrollmentStatus, getStatistics } from "../api/enrollmentsSlice";
import StatisticsChart from "../components/StatisticsChart";
import { RootStackParamList } from "../types/rootStackTypes";

const ProfileScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const dispatch = useAppDispatch();
  const userName = useAppSelector((state) => state.auth.userName);
  const { enrollments, statistics, loading } = useAppSelector((state) => state.enrollments);

  useEffect(() => {
    dispatch(getEnrollments());
    dispatch(getStatistics());
  }, [dispatch]);

  const signOut = async () => {
    dispatch(logout());
    await clearUser();
  };

  const handleStatusChange = (enrollmentId: number, newStatus: string) => {
    dispatch(updateEnrollmentStatus({ id: enrollmentId, status: newStatus }));
    Alert.alert("Статус обновлён", `Курс отмечен как "${newStatus === "completed" ? "пройденный" : "проваленный"}"`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "#28a745";
      case "failed":
        return "#dc3545";
      default:
        return "#007AFF";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "Пройден";
      case "failed":
        return "Провален";
      default:
        return "В процессе";
    }
  };

  if (loading && enrollments.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.greeting}>Приветствую, {userName}!</Text>

      {statistics && <StatisticsChart completed={statistics.completed} failed={statistics.failed} enrolled={statistics.enrolled} />}

      <Text style={styles.sectionTitle}>Мои курсы</Text>

      {enrollments.length === 0 ? (
        <Text style={styles.emptyText}>Вы ещё не записались ни на один курс</Text>
      ) : (
        enrollments.map((enrollment) => (
          <View key={enrollment.id} style={styles.enrollmentCard}>
            <View style={styles.enrollmentHeader}>
              <Text style={styles.courseTitle}>{enrollment.course.title}</Text>
              <View style={[styles.statusBadge, { backgroundColor: getStatusColor(enrollment.status) }]}>
                <Text style={styles.statusText}>{getStatusText(enrollment.status)}</Text>
              </View>
            </View>

            {enrollment.status === "enrolled" && (
              <View style={styles.actions}>
                <Pressable style={[styles.actionButton, styles.completeButton]} onPress={() => handleStatusChange(enrollment.id, "completed")}>
                  <Text style={styles.actionButtonText}>✓ Пройден</Text>
                </Pressable>
                <Pressable style={[styles.actionButton, styles.failButton]} onPress={() => handleStatusChange(enrollment.id, "failed")}>
                  <Text style={styles.actionButtonText}>✗ Провален</Text>
                </Pressable>
              </View>
            )}
          </View>
        ))
      )}

      <View style={styles.buttonsContainer}>
        <Pressable style={styles.button} onPress={() => navigation.navigate("Home")}>
          <Text style={styles.buttonText}>К списку курсов</Text>
        </Pressable>
        <Pressable style={[styles.button, styles.logoutButton]} onPress={signOut}>
          <Text style={styles.buttonText}>Выйти</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f9fa" },
  content: { padding: 20, paddingBottom: 40 },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  greeting: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  sectionTitle: { fontSize: 20, fontWeight: "bold", marginTop: 20, marginBottom: 10 },
  emptyText: { textAlign: "center", color: "#888", marginTop: 20 },
  enrollmentCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  enrollmentHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 },
  courseTitle: { fontSize: 16, fontWeight: "600", flex: 1, marginRight: 10 },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 12 },
  statusText: { color: "#fff", fontSize: 12, fontWeight: "bold" },
  actions: { flexDirection: "row", gap: 10, marginTop: 10 },
  actionButton: { flex: 1, paddingVertical: 10, borderRadius: 8, alignItems: "center" },
  completeButton: { backgroundColor: "#28a745" },
  failButton: { backgroundColor: "#dc3545" },
  actionButtonText: { color: "#fff", fontSize: 14, fontWeight: "bold" },
  buttonsContainer: { marginTop: 30, gap: 15 },
  button: { backgroundColor: "#007AFF", paddingVertical: 15, borderRadius: 12, alignItems: "center" },
  logoutButton: { backgroundColor: "#dc3545" },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});

export default ProfileScreen;
