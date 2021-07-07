import { BlitzPage, useMutation } from 'blitz';
import Layout from 'app/core/layouts/Layout';
import { LabeledTextField } from 'app/core/components/LabeledTextField';
import { Form, FORM_ERROR } from 'app/core/components/Form';
import { ForgotPassword } from 'app/auth/validations';
import forgotPassword from 'app/auth/mutations/forgotPassword';
import { Button, Flex, Heading } from '@chakra-ui/react';

const ForgotPasswordPage: BlitzPage = () => {
  const [forgotPasswordMutation, { isSuccess }] = useMutation(forgotPassword);

  return (
    <Flex direction={'column'} justifyContent={'center'} alignItems={'center'} mt={10}>
      <Heading mb={10}>Forgot your password?</Heading>

      {isSuccess ? (
        <div>
          <h2>Request Submitted</h2>
          <p>
            If your email is in our system, you will receive instructions to reset your password
            shortly.
          </p>
        </div>
      ) : (
        <Form
          id="forgot-password-form"
          schema={ForgotPassword}
          initialValues={{ email: '' }}
          onSubmit={async (values) => {
            try {
              await forgotPasswordMutation(values);
            } catch (error) {
              return {
                [FORM_ERROR]: 'Sorry, we had an unexpected error. Please try again.',
              };
            }
          }}
        >
          <LabeledTextField name="email" label="Email" placeholder="Email" />
          <Flex direction={'column'} alignItems={'center'}>
            <Button type={'submit'} form="forgot-password-form">
              Send Reset Password Instructions
            </Button>
          </Flex>
        </Form>
      )}
    </Flex>
  );
};

ForgotPasswordPage.redirectAuthenticatedTo = '/';
ForgotPasswordPage.getLayout = (page) => <Layout title="Forgot Your Password?">{page}</Layout>;

export default ForgotPasswordPage;
