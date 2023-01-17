import { Modal, ModalOverlay, ModalContent, ModalBody, ModalHeader, ModalCloseButton, Divider } from '@chakra-ui/react';
import { ImageEditor } from 'components/Image';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  image?: string;
  isLoading: boolean;
  onSubmit: (image: File) => void;
}

export const EditProfileImageModal = ({ isOpen, onClose, image, isLoading, onSubmit }: Props) => {
  const handleImageSubmit = (image: File) => {
    onSubmit(image);
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} size='md' blockScrollOnMount={false}>
      <ModalOverlay />
      <ModalContent overflow='hidden' pb={5}>
        <ModalHeader>Edit photo</ModalHeader>
        <Divider />
        <ModalCloseButton />
        <ModalBody>
          <ImageEditor isLoading={isLoading} onSubmit={handleImageSubmit} defaultImg={image} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
