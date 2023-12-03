export const readFileToBase64 = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (!(file instanceof File)) {
      reject(new Error('File is not an instance of File'));
    }

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};
