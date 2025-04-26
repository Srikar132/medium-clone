import React from "react";
import { Button } from "./ui/button";
import { BsSend } from "react-icons/bs";
import Link from "next/link";

const JoinUsbtn = () => {

  return (
    <Link href={"/login"} className="cursor-pointer signup_write-btn" >
        <BsSend className="text-white" />
        <span className="font-semibold text-white">Join us</span>
    </Link>
  );
};

export default JoinUsbtn;
