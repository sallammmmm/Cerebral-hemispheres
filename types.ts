export interface Disease {
  name: string;
  description: string;
  hemisphere: 'Left' | 'Right' | 'Bilateral';
  symptoms: string[];
}

export interface CaseStudy {
  id: string;
  scenario: string;
  question: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
}

export enum LoadingState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}