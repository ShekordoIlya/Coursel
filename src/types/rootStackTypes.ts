import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Home: undefined;
  CourseDetails: {
    courseId: string;
    courseName: string;
    courseDescription: string;
  };
  Login: undefined;
  Profile: undefined;
  AddCourse: undefined;
};

export interface ICourseDetails {
  courseId: string;
  courseName: string;
  courseDescription: string;
}

export type RootStackNavigationProp<T extends keyof RootStackParamList> = NativeStackNavigationProp<RootStackParamList, T>;
export type RootStackRouteProp<T extends keyof RootStackParamList> = RouteProp<RootStackParamList, T>;
