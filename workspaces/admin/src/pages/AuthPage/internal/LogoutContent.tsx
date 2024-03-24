import { Box, Button, Heading, Spacer, Stack } from '@chakra-ui/react';
import { useFormik } from 'formik';

import { useLogout } from '../../../features/auth/hooks/useLogout';

export const LogoutContent: React.FC = () => {
  const logout = useLogout();

  const formik = useFormik({
    initialValues: {},
    async onSubmit() {
      logout.mutate();
    },
  });

  return (
    <Box
      aria-labelledby="logoutContent"
      as="form"
      bg="gray.100"
      borderRadius={8}
      onSubmit={formik.handleSubmit}
      p={6}
      w="100%"
    >
      <Stack spacing={4}>
        <Heading as="h1" fontSize="xl" fontWeight="bold" id="logoutContent">
          ログアウト
        </Heading>
        <Spacer />
        <Button colorScheme="teal" type="submit" variant="solid">
          ログアウト
        </Button>
      </Stack>
    </Box>
  );
};
