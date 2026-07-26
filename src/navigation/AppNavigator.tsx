import { createStaticNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import CourseDetailScreen from "../screens/CourseDetailScreen";
import LoginScreen from "../screens/LoginScreen";
import ProfileScreen from "../screens/ProfileScreen";
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
    Login: {
      screen: LoginScreen,
      options: { title: "Вход" },
    },
    Profile: {
      screen: ProfileScreen,
      options: { title: "Экран профиля" },
    },
  },
});

const GuestStack = createNativeStackNavigator({
  initialRouteName: "Login",
  screens: {
    Login: { screen: LoginScreen, options: { title: "Вход" } },
  },
});

const AuthenticatedNavigation = createStaticNavigation(AuthStack);
const GuestNavigation = createStaticNavigation(GuestStack);

const Navigator = () => {
  const isAuth = useAppSelector((state) => state.auth.isAuthenticated);

  return isAuth ? <AuthenticatedNavigation /> : <GuestNavigation />;
};

export default Navigator;
