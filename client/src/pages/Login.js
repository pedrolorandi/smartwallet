import { useAuth } from "../hooks/useAuth";

function Login() {
  const { login } = useAuth();

  return (
    <div className="App">
      <button type="button" onClick={() => login()}>
        Sign In with Google
      </button>
    </div>
  );
}

export default Login;
