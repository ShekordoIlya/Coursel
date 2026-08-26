import { createStaticNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import CourseDetailScreen from "../screens/CourseDetailScreen";
import LoginScreen from "../screens/LoginScreen";
import ProfileScreen from "../screens/ProfileScreen";
import AddCourseScreen from "../screens/AddCourseScreen";
import { useAppSelector } from "../store/hooks";

const AuthStack = createNativeStackNavigator({
  initialRouteName: "Home",
  screens: {
    Home: {
      screen: HomeScreen,
      options: { title: "Образовательная платформа" },
    },
    CourseDetails: {
      screen: CourseDetailScreen,
      options: { title: "Детали курса" },
    },
    Profile: {
      screen: ProfileScreen,
      options: { title: "Профиль пользователя" },
    },
    AddCourse: {
      screen: AddCourseScreen,
      options: { title: "Добавить курс" },
    },
  },
});

const GuestStack = createNativeStackNavigator({
  initialRouteName: "Login",
  screens: {
    Login: {
      screen: LoginScreen,
      options: {
        title: "Вход",
        headerShown: false,
      },
    },
  },
});

const AuthenticatedNavigation = createStaticNavigation(AuthStack);
const GuestNavigation = createStaticNavigation(GuestStack);

const Navigator: React.FC = () => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  return isAuthenticated ? <AuthenticatedNavigation /> : <GuestNavigation />;
};

export default Navigator;
