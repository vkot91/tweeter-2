import ResizeTextarea from 'react-textarea-autosize';
import React from 'react';
import { FormControl, Textarea, TextareaProps, useColorModeValue, FormErrorMessage, FormLabel } from '@chakra-ui/react';

interface Props extends TextareaProps {
  minRows?: number;
  error?: string;
  label?: string;
}

export const AutoResizeTextarea = React.forwardRef<HTMLTextAreaElement, Props>((props, ref) => {
  return (
    <FormControl w='full' isInvalid={!!props.error}>
      {props.label && <FormLabel>{props.label}</FormLabel>}
      <Textarea
        minH='unset'
        overflow='hidden'
        w='100%'
        resize='none'
        ref={ref}
        minRows={props.minRows || 2}
        as={ResizeTextarea}
        {...props}
      />
      {props.error && <FormErrorMessage>{props.error}.</FormErrorMessage>}
    </FormControl>
  );
});

AutoResizeTextarea.displayName = 'AutoResizeTextarea';
