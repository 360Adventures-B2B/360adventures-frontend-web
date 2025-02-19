export const formatDateString = (date: Date | null): string => {
  if (date) {
    return date.toISOString().split("T")[0];
  }
  return "";
};
