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
          <img src={user.picture} alt="TransitU" height={30} style={{margin: "25px 10px", borderRadius: "50%", border: "1px solid white"}} />
        </>
      )}
    </>
  );
}
