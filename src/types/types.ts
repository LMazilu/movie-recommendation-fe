export interface User {
  id: string;
  email: string;
}

export interface Movie {
  id: string;
  title: string;
  posterUrl: string;
  description: string;
  cast: string;
  duration: string;
  year: number;
}

export interface UserResponses {
  topic: string;
  era: string;
  mood: string;
  contentType: string;
  genre: string;
}
