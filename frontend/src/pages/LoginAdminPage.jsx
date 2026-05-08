import { AuthForm } from "../components/authForm/AuthForm";

export function LoginAdminPage() {
  return (
    <>
      <AuthForm
        page="Login"
        switchPage="Don't have an account? "
        title="Admin Login"
      />
    </>
  );
}
