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

export const formatDateTime = (date: Date | string) => {
  const dateObj = typeof date === "string" ? new Date(date) : date;

  if (dateObj instanceof Date && !isNaN(dateObj.getTime())) {
    const day = dateObj.getDate(); // Day of the month (numeric)
    const month = dateObj.toLocaleString("default", { month: "long" }); // Full month name
    const year = dateObj.getFullYear().toString().slice(-2); // Last two digits of the year
    const hours = dateObj.getHours().toString().padStart(2, "0"); // Hour (2 digits)
    const minutes = dateObj.getMinutes().toString().padStart(2, "0"); // Minute (2 digits)

    // Return the formatted string: "DD Month YY HH:mm"
    return `${day} ${month} ${year} ${hours}:${minutes}`;
  }

  return "";
};
