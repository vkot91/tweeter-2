import { Controller, useForm, FieldValues, Path, PathValue, DeepPartial } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  FormControl,
  FormErrorMessage,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Checkbox,
  HStack,
  useColorModeValue,
  Grid,
  GridItem,
  FormLabel,
  ButtonProps,
  VStack,
} from '@chakra-ui/react';
import { PasswordControl } from 'components/Form';
import { AutoResizeTextarea } from './AutoResizeTextArea';
import { BaseFieldsType } from 'types';
import { ObjectSchema } from 'yup';
import { useEffect } from 'react';

interface Props<T> {
  validationSchema: ObjectSchema<FieldValues>;
  fields: BaseFieldsType<T>[];
  onSubmit: (values: T) => void;
  submitButtonText: string;
  children?: JSX.Element;
  inputSizes?: 'lg' | 'md' | 'xs';
  additionalButton?: {
    styles: ButtonProps;
    onClick: () => void;
    caption: string;
  };
  useStacks?: boolean;
  error?: {
    key: string;
    message: string | undefined;
  } | null;
}

export const BaseFormTemplate = <T extends FieldValues>({
  validationSchema,
  fields,
  onSubmit,
  submitButtonText,
  error,
  children,
  inputSizes = 'lg',
  useStacks = false,
  additionalButton,
}: Props<T>) => {
  const defaultValues = fields.reduce(
    (o, key) => Object.assign(o, { [key.name]: key.defaultValue || '' }),
    {},
  ) as DeepPartial<T>;

  const iconColor = useColorModeValue('gray.700', 'white');
  const {
    handleSubmit,
    register,
    control,
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
  } = useForm<T>({ resolver: yupResolver(validationSchema), defaultValues, mode: 'onBlur' });
  useEffect(() => {
    if (error) {
      setError(
        error.key as Path<T>,
        {
          type: 'manual',
          message: error.message,
        },
        {
          shouldFocus: true,
        },
      );
    }
  }, [error, setError]);
  const Container = useStacks ? Grid : VStack;

  const onFormSubmit = (values: T) => {
    onSubmit(values);
    clearErrors();
  };
  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      <Container mt={4} gap={4} w='full' sx={{ ...(useStacks && { templateColumns: 'repeat(2, 1fr)' }) }}>
        {fields.map((field) => {
          const fieldName = field.name as Path<T>;
          if (fieldName === 'password' || fieldName === 'passwordConfirm') {
            return (
              <GridItem key={fieldName} w='full'>
                <Controller
                  key={fieldName}
                  name={fieldName as Path<T>}
                  control={control}
                  defaultValue={'' as PathValue<T, Path<T>>}
                  rules={{ required: true }}
                  render={({ field: formField }) => (
                    <PasswordControl
                      {...formField}
                      errorMessage={errors[field.name]?.message as string}
                      placeholder={field.placeholder}
                      icon={field.icon}
                    />
                  )}
                />
              </GridItem>
            );
          } else if (field.type === 'checkbox') {
            return (
              <HStack key={fieldName} w='full' justifyContent='space-between'>
                <Controller
                  control={control}
                  name={fieldName as Path<T>}
                  render={({ field: formField }) => (
                    <Checkbox isChecked={formField.value} onChange={formField.onChange}>
                      {field.placeholder}
                    </Checkbox>
                  )}
                />
                {children}
              </HStack>
            );
          } else if (field.type === 'textarea') {
            return (
              <GridItem key={fieldName} colSpan={2} w='full'>
                <Controller
                  control={control}
                  name={fieldName as Path<T>}
                  render={({ field: formField }) => (
                    <AutoResizeTextarea
                      defaultValue={field.defaultValue as string}
                      label={field?.label}
                      onChange={formField.onChange}
                      placeholder={field.placeholder}
                    />
                  )}
                />
              </GridItem>
            );
          } else {
            return (
              <GridItem key={fieldName} w='full'>
                <FormControl key={fieldName} isInvalid={!!errors[field.name]}>
                  {field.label && <FormLabel>{field.label}</FormLabel>}
                  <InputGroup size={inputSizes}>
                    {field.icon && <InputLeftElement color={iconColor}>{field.icon}</InputLeftElement>}
                    <Input
                      bg='transparent'
                      {...register(fieldName)}
                      id={fieldName}
                      type={field.type}
                      placeholder={field.placeholder}
                      disabled={field.disabled}
                    />
                  </InputGroup>
                  <FormErrorMessage>{errors[field.name] && (errors[field.name]?.message as string)}</FormErrorMessage>
                </FormControl>
              </GridItem>
            );
          }
        })}
        <GridItem w='full' colSpan={2} display='flex' justifyContent='flex-end'>
          {additionalButton && (
            <Button mr={4} onClick={additionalButton.onClick} {...additionalButton.styles}>
              {additionalButton.caption}
            </Button>
          )}
          <Button
            width={additionalButton ? additionalButton.styles.width : 'full'}
            variant='solid'
            isLoading={isSubmitting}
            type='submit'
            disabled={Object.keys(errors).length > 0}
          >
            {submitButtonText}
          </Button>
        </GridItem>
      </Container>
    </form>
  );
};
