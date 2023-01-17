import {
  Avatar,
  Box,
  Image,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalHeader,
  ModalCloseButton,
  Divider,
  useToast,
  useColorModeValue,
} from '@chakra-ui/react';
import { BaseFormTemplate } from 'components/Form';
import { UploadCloudIcon } from 'components/Icons';
import { UploadImage } from 'components/Image';
import { RegularUserFragment, useUpdateUserMutation } from 'generated/graphql';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UpdateUserFormInput } from 'types';
import { ROUTES_ENUM } from 'utils/constants/routes';
import { setUpdateUserFields } from 'utils/constants/userFormFields';
import { checkImage, convertBase64 } from 'utils/helpers';
import { updateUserValidationSchema } from 'utils/validation/update-user';
import { EditProfileImageModal } from './EditImageModal';

interface Props {
  userInfo: RegularUserFragment;
  isOpen: boolean;
  onCloseProfileModal: () => void;
  bgUrl?: string;
  onOpenProfileModal: () => void;
}

export const EditProfileModal = ({ isOpen, onCloseProfileModal, bgUrl, userInfo, onOpenProfileModal }: Props) => {
  const { avatar, firstName, id } = userInfo;
  const containerBgColor = useColorModeValue('bg.light.primary', 'bg.dark.primary');
  const { isOpen: isOpenImageModal, onOpen: onOpenImageModal, onClose: onCloseImageModal } = useDisclosure();
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(checkImage(avatar));
  const [avatarPrivewFile, setAvatarPreviewFile] = useState<File | null>(null);
  const [updateUser, { loading }] = useUpdateUserMutation();
  const navigate = useNavigate();

  const toast = useToast({
    position: 'top-right',
  });

  const onSetPreview = (url: string) => {
    setPreviewUrl(url);
    onOpenImageModal();
    onCloseProfileModal();
  };

  const handleCloseImageModal = () => {
    setPreviewUrl(checkImage(avatar));
    onCloseImageModal();
    onOpenProfileModal();
  };

  const handleSaveImageToModal = async (image: File) => {
    const url = await convertBase64(image);
    setPreviewUrl(url);
    setAvatarPreviewFile(image);
    onCloseImageModal();
    onOpenProfileModal();
  };

  const handleUpdateUser = async (updateInput: UpdateUserFormInput) => {
    await updateUser({
      variables: {
        updateUserInput: {
          id,
          ...(avatarPrivewFile && { avatar: avatarPrivewFile }),
          ...updateInput,
        },
      },
      onCompleted: ({ updateUser }) => {
        if (updateUser.username === updateInput.username) {
          navigate(ROUTES_ENUM.PROFILE.replace(':username', updateUser.username), { replace: true });
        }
        toast({
          title: 'User was succesfully updated :)',
          status: 'success',
          duration: 2000,
          isClosable: true,
        });
        onCloseProfileModal();
      },
      onError: (e) => {
        toast({
          title: e.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      },
    });
    if (updateInput.avatar) {
      onCloseImageModal();
      return;
    }
  };

  const defaultValues = Object.entries(userInfo).map((item) => ({
    fieldName: item[0],
    value: item[1],
  }));
  const updateUserFormFields = setUpdateUserFields(defaultValues);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onCloseProfileModal} size='2xl'>
        <ModalOverlay />
        <ModalContent overflow='hidden' pb={5} bg={containerBgColor}>
          <ModalHeader>Edit basic info</ModalHeader>
          <Divider />
          <ModalCloseButton />
          <ModalBody px={3} py={5}>
            <Box>
              <Image h='200px' rounded='xl' w='full' src={bgUrl} objectFit='cover' />
              <Box px={10}>
                <Box mt={-10}>
                  <Avatar
                    w={100}
                    h={100}
                    src={previewUrl || undefined}
                    name={firstName}
                    css={{ border: '2px solid white' }}
                  >
                    <Box pos='absolute' right={-2} bottom={-1}>
                      <UploadImage
                        icon={<UploadCloudIcon color='white' />}
                        id='upload-avatar'
                        setImage={onSetPreview}
                        bgColor='white'
                        _hover={{ bg: '#ebedf0' }}
                        _active={{ bg: '#ebedf0' }}
                        borderRadius='3xl'
                        boxShadow='xl'
                      />
                    </Box>
                  </Avatar>
                </Box>
                <BaseFormTemplate
                  fields={updateUserFormFields}
                  validationSchema={updateUserValidationSchema}
                  onSubmit={handleUpdateUser}
                  submitButtonText='Save'
                  error={null}
                  inputSizes='md'
                  useStacks={true}
                  additionalButton={{
                    onClick: onCloseProfileModal,
                    caption: 'Cancel',
                    styles: {
                      color: 'gray.400',
                      colorScheme: 'gray',
                      variant: 'ghost',
                      width: '20',
                    },
                  }}
                />
              </Box>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
      <EditProfileImageModal
        image={previewUrl}
        isOpen={isOpenImageModal}
        onClose={handleCloseImageModal}
        onSubmit={handleSaveImageToModal}
        isLoading={loading}
      />
    </>
  );
};
