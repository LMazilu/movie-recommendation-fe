import { Recommendation } from "./Recommendation";

export interface AuthContextType {
  isLoggedIn: boolean;
  user: any;
  login: (token: string) => void;
  logout: () => void;
  deleteUser: () => Promise<void>;
  fetchRecommendations: () => Promise<Recommendation[]>;
}