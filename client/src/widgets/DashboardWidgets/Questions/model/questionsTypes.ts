export type Question = {
  _id: string;
  name: string;
  group: string;
  subGroup: string;
  link?: string;
  description?: string;
};

export type QuestionsFormData = {
  name: string;
  group: string;
  subGroup: string;
  link?: string;
  description?: string;
};
