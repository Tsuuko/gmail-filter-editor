import {
  Avatar,
  Box,
  ColorProps,
  HStack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import React from 'react';

type UserCardProps = {
  name?: string;
  email?: string;
  imageUrl?: string;
};
export const UserCard: React.VFC<UserCardProps> = React.memo(
  ({ name, email, imageUrl }) => {
    const emailTextColor = useColorModeValue<
      ColorProps['color'],
      ColorProps['color']
    >('blackAlpha.700', 'gray.300');
    return (
      <HStack borderWidth="1px" borderRadius="lg" overflow="hidden" p="3">
        <Avatar boxSize="14" src={imageUrl} />
        <Box>
          <Text fontSize="lg" fontWeight="bold">
            {name}
          </Text>
          <Text color={emailTextColor}>{email}</Text>
        </Box>
      </HStack>
    );
  }
);

UserCard.displayName = 'UserCard';
