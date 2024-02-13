import React from "react";
import { useAuth } from "../hooks/useAuth";

function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="App">
      <h1>{user.givenName}'s Dashboard</h1>
    </div>
  );
}

export default Dashboard;
