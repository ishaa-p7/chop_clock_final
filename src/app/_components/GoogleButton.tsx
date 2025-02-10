import React from 'react'
import { SessionProvider, signIn, useSession } from "next-auth/react";

function GoogleButton() {
    const { data: session } = useSession();
  return (
    <button onClick={() => signIn("google")} className="bg-blue-500 text-white px-4 py-2 rounded">
    Sign in with Google
  </button>
  )
}

export default GoogleButton