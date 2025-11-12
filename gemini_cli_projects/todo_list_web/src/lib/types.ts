interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
}

interface Theme {
  name: string;
  background: string;
  text: string;
  primary: string;
  secondary: string;
  accent: string;
}

export type { Task, Theme };
