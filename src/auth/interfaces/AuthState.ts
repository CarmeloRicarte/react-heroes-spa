export interface AuthState {
  logged: boolean;
  user?: {
    id: string;
    name: string;
  };
}
