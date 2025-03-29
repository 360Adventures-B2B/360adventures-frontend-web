export const createFormData = (data: any) => {
  const formData = new FormData();
  Object.keys(data).forEach((key) => {
    // Jika data adalah array, loop dan tambahkan satu per satu
    if (Array.isArray(data[key])) {
      data[key].forEach((item) => formData.append(`${key}[]`, item));
    } else {
      formData.append(key, data[key]);
    }
  });
  return formData;
};
