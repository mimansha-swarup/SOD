import SignUpContainer from "@/container/signup";
import React, { Suspense } from "react";

const SignUpPage = () => {
  return (
    <main className="px-4 w-full">
      <Suspense>
        <SignUpContainer />
      </Suspense>
    </main>
  );
};

export default SignUpPage;
