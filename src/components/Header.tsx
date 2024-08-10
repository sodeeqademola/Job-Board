import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

const Header = () => {
  return (
    <div className="mb-5 mt-2 flex items-center justify-between p-2 shadow-md">
      <div className="flex items-center justify-center">
        <Image
          src={"/laptop.jpg"}
          alt={"laptop"}
          quality={95}
          priority
          width={36}
          height={36}
        />
        <h1 className="text-mmd font-bold">
          <Link href={"/"}> Job Board </Link>
        </h1>
      </div>
      <div>
        <Button className="h-[36px] py-0">
          {" "}
          <Link href={"/postjob"}>Post a job</Link>
        </Button>
      </div>
    </div>
  );
};

export default Header;
