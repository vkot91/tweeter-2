export const convertBase64 = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      if (fileReader.result) {
        resolve(fileReader.result as string);
      }
    };

    fileReader.onerror = (error: unknown) => {
      reject(error);
    };
  });
};
