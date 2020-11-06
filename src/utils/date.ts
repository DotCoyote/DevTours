export const getCurrentDate = () => new Date();
export const getNextWeek = (startDate?: Date) => {
  const today = startDate || getCurrentDate();
  return new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7);
};
