"use client";

import Image from "next/image";

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
          <Image
            src={user.picture as string}
            width={100}
            height={100}
            alt="TransitU"
            style={{
              margin: "25px 10px",
              borderRadius: "50%",
              border: "1px solid white",
              height: "30px",
              width: "30px",
            }}
          />
        </>
      )}
    </>
  );
}
