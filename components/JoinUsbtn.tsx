import Link from 'next/link';
import { BsSend } from 'react-icons/bs';

const JoinUsbtn = () => {
  return (
    <Link href={'/login'} className="cursor-pointer whitespace-nowrap signup_write-btn">
      <BsSend className="text-white" />
      <span className="font-semibold text-white">Join us</span>
    </Link>
  );
};

export default JoinUsbtn;
