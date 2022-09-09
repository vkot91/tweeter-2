import { Controller, useForm, FieldValues, Path, PathValue, DeepPartial } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import {
  FormControl,
  FormErrorMessage,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  VStack,
  Checkbox,
  HStack,
  useColorModeValue,
} from '@chakra-ui/react';
import { PasswordControl } from 'components/Form';
import { BaseFieldsType } from 'utils/constants/authFormFields';
import { ObjectSchema } from 'yup';
import { useEffect } from 'react';

interface Props<T> {
  validationSchema: ObjectSchema<FieldValues>;
  fields: BaseFieldsType<T>[];
  onSubmit: (values: T) => void;
  submitButtonText: string;
  children?: JSX.Element;
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
  } = useForm<T>({ resolver: yupResolver(validationSchema), defaultValues });
  // console.log(error);
  useEffect(() => {
    if (error) {
      setError(error.key as Path<T>, {
        type: 'manual',
        message: error.message,
      });
    }
  }, [error, setError]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack mt={4} spacing={5}>
        {fields.map((field) => {
          const fieldName = field.name as Path<T>;
          if (fieldName === 'password' || fieldName === 'passwordConfirm') {
            return (
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
          } else {
            return (
              <FormControl key={fieldName} isInvalid={!!errors[field.name]}>
                <InputGroup size='lg'>
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
            );
          }
        })}
        <Button w='100%' size='lg' mt={4} variant='solid' isLoading={isSubmitting} type='submit'>
          {submitButtonText}
        </Button>
      </VStack>
    </form>
  );
};
