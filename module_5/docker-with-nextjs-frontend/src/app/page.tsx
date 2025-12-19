/* eslint-disable @typescript-eslint/no-explicit-any */
// app/page.tsx (or wherever your main component is)

import UserManagement from "./components/UserManagement";

const Home = async () => {
  // Fetch user data
  const users = await fetch(`http://localhost:5000/api/v1/users`, {
    // const users = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users`, {
    headers: {
      "Content-Type": "application/json",
    },
    next: {
      tags: ["users"],
    },
  });
  const { data } = await users.json();

  return <UserManagement users={data} />;
};

export default Home;
