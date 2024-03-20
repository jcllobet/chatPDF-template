import React from "react";
import Link from "next/link";
import Image from "next/image";
interface LogoProps {
  link?: string;
  text_size?: string;
  logosize?: string;
}

export function Logo({
  link = "/",
  text_size = "text-3xl",
  logosize = "64px",
}: LogoProps) {
  return (
    <div className="flex gap-4 items-center justify-center cursor-default select-none relative font-mono font-thin text-indigo-400 hover:text-indigo-600">
      <Link href={link}>
        <div className="flex items-center justify-center">
          <div>
            <Image
              src="/sciphi_logo.png"
              style={{ width: logosize, height: logosize }}
              alt="SciPhi Logo"
              width={+logosize}
              height={+logosize}
            />
          </div>
          <div className={"ml-1 " + text_size}>SciPhi</div>
        </div>
      </Link>
    </div>
  );
}
