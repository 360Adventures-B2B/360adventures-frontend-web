export const formatDateString = (date: Date | string | null): string => {
  if (date) {
    const dateObj = typeof date === "string" ? new Date(date) : date;

    const year = dateObj.getFullYear();
    const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
    const day = dateObj.getDate().toString().padStart(2, "0");

    return `${year}-${month}-${day}`;
  }
  return "";
};

export const formatDate = (date: Date | string) => {
  const dateObj = typeof date === "string" ? new Date(date) : date;

  const options: Intl.DateTimeFormatOptions = {
    month: "long",
    day: "numeric",
    year: "numeric",
  };

  return dateObj instanceof Date && !isNaN(dateObj.getTime()) ? dateObj.toLocaleDateString("en-US", options) : "";
};
