export const checkImage = (url?: string | null) => {
  return !url || url === null ? undefined : `${process.env.REACT_APP_IMG_URL}/${url}`;
};
