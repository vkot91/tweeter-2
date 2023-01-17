import { Crop, PixelCrop } from 'react-image-crop';

export const transformCrop = (initialValues: Crop): PixelCrop => ({
  unit: 'px',
  y: initialValues.y * 6.34,
  height: initialValues.height * 6.33,
  x: initialValues.x * 5.28,
  width: initialValues.width * 5.28,
});
