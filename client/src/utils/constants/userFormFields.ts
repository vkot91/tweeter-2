import { BaseFieldsType, UpdateUserFormInput } from 'types';

export const updateUserFields: BaseFieldsType<UpdateUserFormInput>[] = [
  {
    name: 'firstName',
    type: 'text',
    label: 'First Name',
    placeholder: 'John',
  },
  {
    name: 'secondName',
    type: 'text',
    label: 'Last Name',
    placeholder: 'Smith',
  },
  {
    name: 'username',
    type: 'text',
    label: 'Username',
    placeholder: 'username123',
  },
  {
    name: 'location',
    type: 'text',
    label: 'Location',
    placeholder: 'Brooklyn, NY',
  },
  {
    name: 'bio',
    type: 'textarea',
    label: 'Bio',

    placeholder: 'UI designer..',
  },
  {
    name: 'email',
    type: 'email',
    label: 'Email',
    placeholder: 'email@domain.com',
  },
  {
    name: 'phone',
    type: 'phone',
    label: 'Phone number',
    placeholder: '0992550012',
  },
];

export const setUpdateUserFields = (
  fieldsDefaultValues: {
    fieldName: string;
    value: string | boolean | number | null;
  }[],
) => {
  fieldsDefaultValues.forEach(({ fieldName, value }) => {
    const oldValue = updateUserFields.find((field) => field.name === fieldName);
    if (oldValue) {
      Object.assign(oldValue, {
        defaultValue: value,
      });
    }
  });
  return updateUserFields;
};
