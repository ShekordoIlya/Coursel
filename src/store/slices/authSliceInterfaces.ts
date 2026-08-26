export interface IInitialState {
  isAuthenticated: boolean;
  userName: string | null;
  success: boolean;
  loading: boolean;
  error: string | null;
  token: string | null;
  userId: number | null;
}
