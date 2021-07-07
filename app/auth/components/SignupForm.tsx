import { useMutation } from 'blitz';
import { LabeledTextField } from 'app/core/components/LabeledTextField';
import { Form, FORM_ERROR } from 'app/core/components/Form';
import signup from 'app/auth/mutations/signup';
import { Signup } from 'app/auth/validations';
import { Button, Flex, Heading } from '@chakra-ui/react';

type SignupFormProps = {
  onSuccess?: () => void;
};

export const SignupForm = (props: SignupFormProps) => {
  const [signupMutation] = useMutation(signup);

  return (
    <Flex direction={'column'} justifyContent={'center'} alignItems={'center'} mt={10}>
      <Heading mb={10}>Create An Account</Heading>

      <Form
        id="signup-form"
        schema={Signup}
        initialValues={{ email: '', password: '' }}
        onSubmit={async (values) => {
          try {
            await signupMutation(values);
            props.onSuccess?.();
          } catch (error) {
            if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
              // This error comes from Prisma
              return { email: 'This email is already being used' };
            } else {
              return { [FORM_ERROR]: error.toString() };
            }
          }
        }}
      >
        <LabeledTextField name="email" label="Email" placeholder="Email" />
        <LabeledTextField name="password" label="Password" placeholder="Password" type="password" />
        <Flex direction={'column'} alignItems={'center'} mt={8}>
          <Button type={'submit'} form="signup-form">
            Create Account
          </Button>
        </Flex>
      </Form>
    </Flex>
  );
};

export default SignupForm;
