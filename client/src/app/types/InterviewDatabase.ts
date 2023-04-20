export type InterviewDatabaseResponse = {
  _id: string;
  name: string;
  group: string;
  subGroup: string;
  link?: string;
  description?: string;
};

export type InterviewDBFormData = {
  name: string;
  group: string;
  subGroup: string;
  link?: string;
  description?: string;
};
