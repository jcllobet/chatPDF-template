import React from "react";
import Link from "next/link";
import Image from "next/image";
interface LogoProps {
  link?: string;
  text_size?: string;
  logosize?: string;
}

const parseSizeToInt = (size: string): number => {
  const parsedSize = parseInt(size, 10);
  return isNaN(parsedSize) ? 64 : parsedSize; // Default to 64 if NaN
};

export function Logo({
  link = "/",
  text_size = "text-3xl",
  logosize = "64px",
}: LogoProps) {
  const logoWidth = parseSizeToInt(logosize);
  const logoHeight = parseSizeToInt(logosize);

  return (
    <div className="flex gap-4 items-center justify-center cursor-default select-none relative font-mono font-thin text-indigo-400 hover:text-indigo-600">
      <Link href={link}>
        <div className="flex items-center justify-center">
          <div>
            <Image
              src="/sciphi_logo.png"
              alt="SciPhi Logo"
              width={logoWidth}
              height={logoHeight}
            />
          </div>
          <div className={"ml-1 " + text_size}>SciPhi</div>
        </div>
      </Link>
    </div>
  );
}
