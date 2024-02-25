"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import LoginButton from "./login-button";
import LogoutButton from "./logout-button";

export default function NavButtons() {
  const { user } = useUser();

  return (
    <>
      {!user && (
        <>
          <LoginButton />
        </>
      )}
      {user && (
        <>
          <LogoutButton />
        </>
      )}
    </>
  );
}
