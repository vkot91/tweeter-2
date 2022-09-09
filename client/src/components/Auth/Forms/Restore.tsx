import { BaseFormTemplate } from 'components/Form';
import { useRegisterMutation } from 'generated/graphql';

import { RegisterFormInput } from 'types';
import { restorePasswordFields } from 'utils/constants/authFormFields';

import { restorePasswordValidationSchema } from 'utils/validation/restore-password';

interface Props {
  defaultEmail: string | null;
}

export const RestorePasswordForm = ({ defaultEmail }: Props) => {
  const [register, { error }] = useRegisterMutation();

  const onSubmit = async (values: RegisterFormInput) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordConfirm: _, ...createUserInput } = values;
    try {
      await register({
        variables: {
          createUserInput,
        },
      });
    } catch (e: unknown) {
      // console.log(error?.message);
    }
  };

  return (
    <BaseFormTemplate
      fields={restorePasswordFields.map((field) => {
        if (field.name === 'email') {
          field.defaultValue = defaultEmail || '';
        }
        return field;
      })}
      validationSchema={restorePasswordValidationSchema}
      onSubmit={onSubmit}
      submitButtonText='Submit'
      error={
        error?.message
          ? {
              key: 'email',
              message: error.message,
            }
          : undefined
      }
    />
  );
};
