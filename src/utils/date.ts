export const isToday = (dueDate: string) => {
  const today = new Date();
  const due = new Date(dueDate);
  
  return today.toDateString() === due.toDateString();
};
