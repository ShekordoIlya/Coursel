import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { PieChart } from "react-native-chart-kit";

interface StatisticsChartProps {
  completed: number;
  failed: number;
  enrolled: number;
}

const StatisticsChart: React.FC<StatisticsChartProps> = ({ completed, failed, enrolled }) => {
  const data = [
    {
      name: "Пройдено",
      population: completed,
      color: "#28a745",
      legendFontColor: "#333",
      legendFontSize: 14,
    },
    {
      name: "Провалено",
      population: failed,
      color: "#dc3545",
      legendFontColor: "#333",
      legendFontSize: 14,
    },
    {
      name: "В процессе",
      population: enrolled,
      color: "#007AFF",
      legendFontColor: "#333",
      legendFontSize: 14,
    },
  ];

  const screenWidth = Dimensions.get("window").width;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Статистика обучения</Text>
      <PieChart
        data={data}
        width={screenWidth - 40}
        height={220}
        chartConfig={{
          backgroundColor: "#fff",
          backgroundGradientFrom: "#fff",
          backgroundGradientTo: "#fff",
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
});

export default StatisticsChart;
