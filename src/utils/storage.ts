import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveUser = async (userName: string): Promise<void> => {
  try {
    await AsyncStorage.setItem("@user_name", userName);
  } catch (e) {
    console.error("Ошибка сохранения", e);
  }
};

export const loadUser = async (): Promise<string | null> => {
  try {
    const userName = await AsyncStorage.getItem("@user_name");
    return userName ? userName : null;
  } catch (e) {
    console.error("Ошибка получения пользователя", e);
    return null;
  }
};

export const clearUser = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem("@user_name");
  } catch (e) {
    console.error("Ошибка удаления пользователя", e);
  }
};
