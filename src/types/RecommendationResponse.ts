import { Recommendation } from "./Recommendation";

export interface RecommendationResponseType {
    mood: string;
    films: Recommendation[];
} 