import {
  Avatar,
  Flex,
  Text,
  FlexProps,
  IconButton,
  InputGroup,
  useColorMode,
  InputLeftElement,
  Spacer,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';
import { BurgerMenuIcon, SearchIcon } from 'components/Icons';
import { Input } from '@chakra-ui/react';
import { useAuth } from 'context/authed-user-context';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

interface MobileProps extends FlexProps {
  onOpen: () => void;
}

export const Header = ({ onOpen, ...rest }: MobileProps) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = useColorModeValue('bg.light.primary', 'bg.dark.primary');

  const { authedUser } = useAuth();
  return (
    <Flex
      pos='fixed'
      w={{ base: 'full', md: 'calc(100% - 240px)' }}
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 0 }}
      height='80px'
      bg={bg}
      alignItems='center'
      zIndex={3}
      borderBottom='1px solid'
      borderColor='gray.300'
      justifyContent={{ base: 'space-between', md: 'flex-start' }}
      spacing={3}
      {...rest}
    >
      <Flex w='100%' pr={4} alignItems='center' gap={3}>
        <IconButton
          display={{ base: 'flex', md: 'none' }}
          onClick={onOpen}
          variant='outline'
          aria-label='open menu'
          icon={<BurgerMenuIcon />}
        />

        <InputGroup maxW='xl'>
          <Input type='text' borderColor='gray.400' placeholder='Search for something here...' />
          <InputLeftElement pointerEvents='none'>
            <SearchIcon />
          </InputLeftElement>
        </InputGroup>
        <Spacer />
        <Button variant='ghost' onClick={toggleColorMode}>
          {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
        </Button>
        <Text fontWeight='semibold' display={{ base: 'none', md: 'block' }} mr={4}>
          {authedUser?.firstName} {authedUser?.secondName}
        </Text>
        <Avatar
          borderRadius={8}
          size={'md'}
          src={
            'https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
          }
        />
      </Flex>
    </Flex>
  );
};
