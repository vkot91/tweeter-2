import ResizeTextarea from 'react-textarea-autosize';
import React from 'react';
import { FormControl, Textarea, TextareaProps, useColorModeValue, FormErrorMessage } from '@chakra-ui/react';

interface Props extends TextareaProps {
  minRows?: number;
  error?: string;
}

export const AutoResizeTextarea = React.forwardRef<HTMLTextAreaElement, Props>((props, ref) => {
  const placeholderColor = useColorModeValue('gray.700', 'gray.300');
  return (
    <FormControl w='full' isInvalid={!!props.error}>
      <Textarea
        minH='unset'
        overflow='hidden'
        w='100%'
        resize='none'
        ref={ref}
        minRows={props.minRows || 2}
        as={ResizeTextarea}
        _placeholder={{ color: placeholderColor }}
        {...props}
      />
      {props.error && <FormErrorMessage>{props.error}.</FormErrorMessage>}
    </FormControl>
  );
});

AutoResizeTextarea.displayName = 'AutoResizeTextarea';
