import { DeleteIcon } from '@chakra-ui/icons';
import {
  IconButton,
  Menu,
  MenuButton,
  useDisclosure,
  MenuList,
  MenuItem,
  Text,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
  AlertDialogCloseButton,
} from '@chakra-ui/react';
import { DotsIcon, EditIcon } from 'components/Icons';
import { Maybe } from 'graphql/jsutils/Maybe';
import { useRef, useState } from 'react';
import { PostForm } from './Form';

interface Props {
  handleDelete: () => void;
  loading: boolean;
  ownerId: number;
  formValues: {
    image?: Maybe<string>;
    description: string;
    id: number;
  };
}

export const PostActions = ({ handleDelete, ownerId, formValues }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);

  const [dialogContent, setDialogContent] = useState<{
    type: 'remove' | 'edit';
    title: string;
    body: string | JSX.Element;
    submitButton?: {
      caption: string;
      onClick: typeof handleDelete;
    };
  }>();

  const handleOpenModal = (action: 'edit' | 'remove') => {
    if (action === 'remove') {
      setDialogContent({
        type: 'remove',
        title: 'Delete Post',
        body: "Are you sure? You can't undo this action afterwards.",
        submitButton: {
          caption: 'Delete',
          onClick: handleDelete,
        },
      });
    }
    if (action === 'edit') {
      setDialogContent({
        type: 'edit',
        title: 'Edit Post',
        body: (
          <PostForm
            helperFunc={onClose}
            ownerId={ownerId}
            boxShadow='none'
            p={0}
            defaultValues={{
              ...formValues,
              file: formValues?.image as string | undefined,
            }}
          />
        ),
      });
    }

    onOpen();
  };

  return (
    <>
      <Menu>
        <MenuButton as={IconButton} ml='auto !important' variant='ghost' colorScheme='gray'>
          <DotsIcon />
        </MenuButton>
        <MenuList>
          <MenuItem onClick={() => handleOpenModal('edit')}>
            <EditIcon mr={2} />
            <Text>Edit</Text>
          </MenuItem>
          <MenuItem onClick={() => handleOpenModal('remove')}>
            <DeleteIcon color='red.300' mr={2} />
            <Text>Delete</Text>
          </MenuItem>
        </MenuList>
      </Menu>
      <AlertDialog size='xl' isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              {dialogContent?.title}
            </AlertDialogHeader>
            {dialogContent?.type === 'edit' && <AlertDialogCloseButton />}
            <AlertDialogBody>{dialogContent?.body}</AlertDialogBody>
            <AlertDialogFooter>
              {dialogContent?.type === 'remove' && (
                <Button ref={cancelRef} onClick={onClose}>
                  Cancel
                </Button>
              )}
              {dialogContent?.submitButton && (
                <Button colorScheme='red' onClick={dialogContent.submitButton.onClick} ml={3}>
                  {dialogContent.submitButton.caption}
                </Button>
              )}
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};
