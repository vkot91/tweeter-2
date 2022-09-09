export const checkImage = (url: string) => {
  return `${process.env.REACT_APP_IMG_URL}/${url}`;
};
