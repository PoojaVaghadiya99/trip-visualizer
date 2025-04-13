export interface Trip {
  source: string;
  destination: string;
  level?: number;
  type?: 'continued' | 'non-continued' | 'repeated';
}
