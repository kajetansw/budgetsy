import { AuthenticationError, Routes, useMutation } from 'blitz';
import { LabeledTextField } from 'app/core/components/LabeledTextField';
import { Form, FORM_ERROR } from 'app/core/components/Form';
import login from 'app/auth/mutations/login';
import { Login } from 'app/auth/validations';
import { Button, Flex, Heading } from '@chakra-ui/react';
import StyledLink from '../../core/components/StyledLink';

type LoginFormProps = {
  onSuccess?: () => void;
};

export const LoginForm = (props: LoginFormProps) => {
  const [loginMutation] = useMutation(login);

  return (
    <Flex direction={'column'} justifyContent={'center'} alignItems={'center'} mt={10}>
      <Heading mb={10}>Login</Heading>

      <Form
        id="login-form"
        schema={Login}
        initialValues={{ email: '', password: '' }}
        onSubmit={async (values) => {
          try {
            await loginMutation(values);
            props.onSuccess?.();
          } catch (error) {
            if (error instanceof AuthenticationError) {
              return { [FORM_ERROR]: 'Sorry, those credentials are invalid' };
            } else {
              return {
                [FORM_ERROR]:
                  'Sorry, we had an unexpected error. Please try again. - ' + error.toString(),
              };
            }
          }
        }}
      >
        <LabeledTextField name="email" label="Email" placeholder="Email" />
        <LabeledTextField name="password" label="Password" placeholder="Password" type="password" />
        <Flex direction={'column'} alignItems={'center'}>
          <Button type={'submit'} form="login-form">
            Login
          </Button>
          <StyledLink href={Routes.ForgotPasswordPage()} textDecoration={'underline'} mt={4}>
            Forgot your password?
          </StyledLink>
        </Flex>
      </Form>

      <StyledLink href={Routes.SignupPage()} textDecoration={'underline'} mt={8}>
        Or Sign Up
      </StyledLink>
    </Flex>
  );
};

export default LoginForm;
