import VerifyCodeForm from "@/components/auth/verify-code-form";
import Image from "next/image";
import Link from "next/link";
import React, { Suspense } from "react";

const VerifyCodePage = () => {
  return (
    <div>
      <div className="grid min-h-svh lg:grid-cols-2">
        <div className="flex flex-col gap-4 p-6 md:p-10">
          <div className="flex justify-center gap-2 md:justify-start">
            <Link
              href="/"
              className="relative z-20 mr-4 flex items-center space-x-2 px-2 py-1 text-sm font-normal text-black"
            >
              <Image
                src="/logo-tc.png"
                alt="Logo Tax Center"
                width={150}
                height={50}
                className="block dark:hidden"
                priority
              />
              <Image
                src="/logo-dark-tc.png"
                alt="Logo Tax Center Dark"
                width={150}
                height={50}
                className="hidden dark:block"
                priority
              />
            </Link>
          </div>
          <div className="flex flex-1 items-center justify-center">
            <div className="w-full max-w-xs md:max-w-lg">
              <Suspense>
                <VerifyCodeForm />
              </Suspense>
            </div>
          </div>
        </div>
        <div className="relative hidden bg-muted lg:block">
          <img
            src="/brevet/brevet-4.jpg"
            alt="Image"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default VerifyCodePage;
