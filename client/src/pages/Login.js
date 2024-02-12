import React from "react";
import axios from "axios";

const NODE_BASE_URL = process.env.REACT_APP_API_BASE_URL;

// TODO: Move this function to a separate file
function navigate(url) {
  window.location.href = url;
}

async function auth() {
  const response = await axios.post(`${NODE_BASE_URL}/request`);
  navigate(response.data.url);
}

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
