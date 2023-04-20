export type Task = {
  _id: string;
  title: string;
  shortDescription?: string;
  description: string;
};

export type TasksFormData = {
  title: string;
  shortDescription?: string;
  description: string;
};
