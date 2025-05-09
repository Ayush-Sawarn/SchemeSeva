import { AVPlaybackStatus } from 'expo-av';

export interface Scheme {
  id: string;
  title: string;
  description: string;
  eligibility_criteria: string;
  benefits: string;
  application_process: string;
  category: string;
  video_url?: string;
}

export interface Category {
  key: string;
  label: string;
  image: any; // TODO: Replace with proper image type
  color: string;
}

export interface SchemeState {
  schemes: Scheme[];
  loading: boolean;
  error: string | null;
  videoStatus: AVPlaybackStatus | null;
}

export type SchemeCategory = 'agriculture' | 'banking' | 'business' | 'education' | 'health';