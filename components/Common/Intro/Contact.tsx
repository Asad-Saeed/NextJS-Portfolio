import { CONTACTS } from "../../../constants/constants";
import Link from "next/link";

const Contact = () => {
  return (
    <div className="flex flex-col space-y-2 py-5 border-b border-SlateGray">
      <div className="flex flex-col">
        <span className="text-Snow text-xs font-bold">Email Address</span>

        <span className="text-xs text-LightGray">
          <Link href={`mailto:${CONTACTS.EMAIL}`}>{CONTACTS.EMAIL}</Link>
        </span>
      </div>
      <div className="flex flex-col">
        <span className="text-Snow text-xs font-bold">Phone</span>
        <span className="text-xs text-LightGray">{CONTACTS.PHONE}</span>
      </div>
    </div>
  );
};

export default Contact;
