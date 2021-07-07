import { BlitzPage, Link, Routes, useMutation, useRouterQuery } from 'blitz';
import Layout from 'app/core/layouts/Layout';
import { LabeledTextField } from 'app/core/components/LabeledTextField';
import { Form, FORM_ERROR } from 'app/core/components/Form';
import { ResetPassword } from 'app/auth/validations';
import resetPassword from 'app/auth/mutations/resetPassword';
import { Button, Flex, Heading } from '@chakra-ui/react';

const ResetPasswordPage: BlitzPage = () => {
  const query = useRouterQuery();
  const [resetPasswordMutation, { isSuccess }] = useMutation(resetPassword);

  return (
    <Flex direction={'column'} justifyContent={'center'} alignItems={'center'} mt={10}>
      <Heading mb={10}>Set a New Password</Heading>

      {isSuccess ? (
        <div>
          <h2>Password Reset Successfully</h2>
          <p>
            Go to the <Link href={Routes.Home()}>homepage</Link>
          </p>
        </div>
      ) : (
        <Form
          id="reset-password-form"
          schema={ResetPassword}
          initialValues={{ password: '', passwordConfirmation: '', token: query.token as string }}
          onSubmit={async (values) => {
            try {
              await resetPasswordMutation(values);
            } catch (error) {
              if (error.name === 'ResetPasswordError') {
                return {
                  [FORM_ERROR]: error.message,
                };
              } else {
                return {
                  [FORM_ERROR]: 'Sorry, we had an unexpected error. Please try again.',
                };
              }
            }
          }}
        >
          <LabeledTextField name="password" label="New Password" type="password" />
          <LabeledTextField
            name="passwordConfirmation"
            label="Confirm New Password"
            type="password"
          />
          <Flex direction={'column'} alignItems={'center'} mt={8}>
            <Button type={'submit'} form="reset-password-form">
              Reset Password
            </Button>
          </Flex>
        </Form>
      )}
    </Flex>
  );
};

ResetPasswordPage.redirectAuthenticatedTo = '/';
ResetPasswordPage.getLayout = (page) => <Layout title="Reset Your Password">{page}</Layout>;

export default ResetPasswordPage;
