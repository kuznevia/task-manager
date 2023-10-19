import { useEffect, useState } from 'react';
import QuestionsApi from 'widgets/DashboardWidgets/Questions/api/questionsApiSlice';
import { Question } from 'widgets/DashboardWidgets/Questions/model/questionsTypes';

export const useQuestions = () => {
  const [data, setData] = useState<Question[]>([]);
  const [deletingId, setDeletingId] = useState('');
  const [editingQuestion, setEditingQuestion] = useState<Question>();

  useEffect(() => {
    dataFetch();
  }, []);

  const dataFetch = async () => {
    const response = await QuestionsApi.getAll();
    if (response.status === 200) {
      const data: Question[] = await response.json();
      setData(data);
    }
  };

  return {
    data,
    deletingId,
    editingQuestion,
    setDeletingId,
    setEditingQuestion,
    dataFetch,
  };
};
