import { useState } from 'react';

export const useFilter = () => {
  const [isTodayTasks, setIsTodaytasks] = useState(false);

  return { isTodayTasks, setIsTodaytasks };
};
