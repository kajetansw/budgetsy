import { BlitzPage, Routes, useMutation } from 'blitz';
import Layout from 'app/core/layouts/Layout';
import { Flex, Heading } from '@chakra-ui/react';
import StyledLink from '../core/components/StyledLink';
import { useCurrentUser } from '../core/hooks/useCurrentUser';
import logout from '../auth/mutations/logout';

const AuthenticationMenu = () => {
  const currentUser = useCurrentUser();
  const [logoutMutation] = useMutation(logout);

  if (currentUser) {
    return (
      <StyledLink
        onClick={async () => {
          await logoutMutation();
        }}
        href={'/'}
        mr={12}
        fontSize={28}
        textDecoration="underline"
      >
        Logout
      </StyledLink>
    );
  } else {
    return (
      <>
        <StyledLink href={Routes.SignupPage()} mr={12} fontSize={28} textDecoration="underline">
          Sign up
        </StyledLink>
        <StyledLink href={Routes.LoginPage()} ml={12} fontSize={28} textDecoration="underline">
          Login
        </StyledLink>
      </>
    );
  }
};

const Home: BlitzPage = () => {
  return (
    <>
      <Heading textAlign="center" mt={48} fontSize={150}>
        Budgetsy 🏠💰
      </Heading>
      <Heading size="lg" textAlign="center" mt={8}>
        Your home budgets made easy.
      </Heading>
      <Flex justifyContent="center" mt={20}>
        <AuthenticationMenu />
      </Flex>
    </>
  );
};

Home.suppressFirstRenderFlicker = true;
Home.getLayout = (page) => <Layout title="Home">{page}</Layout>;

export default Home;
