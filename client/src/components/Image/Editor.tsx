import {
  Box,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Image,
  HStack,
  Button,
  Badge,
  IconButton,
} from '@chakra-ui/react';

import { MinusRoundedIcon, PlusRoundedIcon } from 'components/Icons';

import { useState, useRef } from 'react';
import ReactCrop, { centerCrop, Crop, makeAspectCrop } from 'react-image-crop';
import { canvasPreview } from './helpers/img-preview';
import 'react-image-crop/dist/ReactCrop.css';
import CropperStyles from './helpers/Styles';
import { transformCrop } from './helpers/transform-crop';

function centerAspectCrop(mediaWidth: number, mediaHeight: number, aspect: number) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        width: 30,
      },
      aspect,
      mediaWidth,
      mediaHeight,
    ),
    mediaWidth,
    mediaHeight,
  );
}

interface Props {
  cropParams?: Crop;
}

interface Props {
  defaultImg?: string;
  onSubmit: (image: File) => void;
  isLoading: boolean;
}
export function ImageEditor({ defaultImg, onSubmit, isLoading }: Props) {
  const imgRef = useRef<HTMLImageElement>(null);

  const [crop, setCrop] = useState<Crop>({
    width: 30,
    height: 30,
    y: 35,
    x: 35,
    unit: '%',
  });
  const [scale, setScale] = useState(1);
  const [aspect] = useState<number | undefined>(16 / 9);
  const { current: containerCls } = useRef(`cropper-${Math.ceil(new Date().getTime() * Math.random())}`);

  const handleCropChange = (newCrop: Crop) => {
    setCrop({
      width: crop.width,
      height: crop.height,
      unit: newCrop!.unit,
      x: newCrop!.x,
      y: newCrop!.y,
    });
  };

  const handleChangeSlider = (value: number) => {
    setScale(Number(value.toFixed(1)));
  };
  // const handleSubmit = async () => {
  //   const completedCrop = transformCrop(crop);
  //   if (completedCrop && imgRef.current) {
  //     const res = await canvasPreview(imgRef.current, completedCrop, scale);
  //     const newImage = new File([res], 'name', { type: res.type });
  //     onSubmit(newImage);
  //   }
  // };

  return (
    <Box>
      <CropperStyles containerCls={containerCls} />
      <Box className={containerCls}>
        <ReactCrop
          crop={crop}
          onChange={(_, percentCrop) => handleCropChange(percentCrop)}
          aspect={aspect}
          circularCrop
          maxWidth={30}
          maxHeight={30}
        >
          <Image
            objectFit='contain'
            ref={imgRef}
            alt='Crop me'
            src={defaultImg}
            style={{ transform: `scale(${scale})` }}
          />
        </ReactCrop>
      </Box>
      <HStack mt={3} position='relative'>
        <IconButton
          disabled={scale === 1}
          aria-label='slider'
          variant='ghost'
          colorScheme={'gray'}
          mr={1}
          onClick={() => handleChangeSlider(scale - 0.1)}
        >
          <MinusRoundedIcon w={4} h={4} />
        </IconButton>
        <Slider
          width='250px'
          aria-label='slider'
          step={0.1}
          min={1}
          max={10}
          value={scale}
          onChange={(value) => {
            handleChangeSlider(value);
          }}
        >
          <SliderTrack bg='gray.400'>
            <SliderFilledTrack bg='gray.700' />
          </SliderTrack>
          <SliderThumb bg='gray.700' />
        </Slider>
        <IconButton
          disabled={scale === 10}
          aria-label='slider'
          variant='ghost'
          colorScheme={'gray'}
          onClick={() => handleChangeSlider(scale + 0.1)}
        >
          <PlusRoundedIcon w={4} h={4} />
        </IconButton>
        <Badge bg='none'>{scale * 10}%</Badge>
        {/* <Button px={8} ml='auto !important' onClick={handleSubmit} isLoading={isLoading}>
          Save
        </Button> */}
      </HStack>
    </Box>
  );
}
