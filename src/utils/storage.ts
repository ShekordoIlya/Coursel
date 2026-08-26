import AsyncStorage from "@react-native-async-storage/async-storage";

const TOKEN_KEY = "@auth_token";
const USER_KEY = "@user_data";

export const saveToken = async (token: string): Promise<void> => {
  try {
    await AsyncStorage.setItem(TOKEN_KEY, token);
  } catch (e) {
    console.error("Ошибка сохранения токена", e);
  }
};

export const getToken = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(TOKEN_KEY);
  } catch (e) {
    console.error("Ошибка получения токена", e);
    return null;
  }
};

export const saveUserData = async (user: { id: number; name: string; email: string }): Promise<void> => {
  try {
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
  } catch (e) {
    console.error("Ошибка сохранения пользователя", e);
  }
};

export const getUserData = async (): Promise<{ id: number; name: string; email: string } | null> => {
  try {
    const data = await AsyncStorage.getItem(USER_KEY);
    return data ? JSON.parse(data) : null;
  } catch (e) {
    console.error("Ошибка получения пользователя", e);
    return null;
  }
};

export const clearAuth = async (): Promise<void> => {
  try {
    await AsyncStorage.multiRemove([TOKEN_KEY, USER_KEY]);
  } catch (e) {
    console.error("Ошибка очистки авторизации", e);
  }
};
