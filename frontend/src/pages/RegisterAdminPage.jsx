import { AuthForm } from "../components/authForm/AuthForm";

export function RegisterAdminPage() {
  return (
    <>
      <AuthForm
        page="Register"
        switchPage="Already have an account? "
        title="Register Admin"
      />
    </>
  );
}
