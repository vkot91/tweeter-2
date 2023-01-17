import React, { useRef } from 'react';
import { Button, ButtonProps, IconButton, Input } from '@chakra-ui/react';
import { convertBase64 } from 'utils/helpers/convert-image';
import { ImageUploadIcon } from 'components/Icons';

interface Props extends Omit<ButtonProps, 'onChange' | 'value'> {
  id: string;
  setImage: (result: string) => void;
  onChange?: (file: File) => void;
  icon?: JSX.Element;
  text?: string;
}

export const UploadImage = React.forwardRef<HTMLInputElement, Props>(
  ({ id, setImage, onChange, icon = <ImageUploadIcon w={5} h={5} color='inherit' />, text, ...props }, ref) => {
    const inputRef = useRef<HTMLInputElement>(ref as unknown as HTMLInputElement);
    return (
      <label htmlFor={`${id}-file`}>
        <Input
          sx={{ display: 'none' }}
          id={`${id}-file`}
          type='file'
          ref={inputRef}
          accept='image/*'
          name='image'
          onChange={(event: React.FormEvent) => {
            const input = event.target as HTMLInputElement;
            if (!input.files?.length) {
              return;
            }
            const file = input.files[0];
            if (onChange) {
              onChange(file);
            }
            convertBase64(file).then((result) => setImage(result));
          }}
        />

        {text ? (
          <Button
            onClick={() => inputRef?.current?.click()}
            aria-label='upload picture'
            leftIcon={icon}
            type='button'
            variant='ghost'
          >
            {text}
          </Button>
        ) : (
          <IconButton onClick={() => inputRef?.current?.click()} aria-label='upload picture' {...props}>
            {icon}
          </IconButton>
        )}
      </label>
    );
  },
);

UploadImage.displayName = 'UploadImage';
