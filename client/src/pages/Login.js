import React from "react";

function Login() {
  return (
    <div className="App">
      <button type="button" onClick={() => auth()}>
        Sign In with Google
      </button>
    </div>
  );
}

export default Login;
