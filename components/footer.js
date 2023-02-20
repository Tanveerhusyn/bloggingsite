import Container from "@components/container";
import ThemeSwitch from "@components/themeSwitch";
import Image from "next/image";
import { myLoader } from "@utils/all";
import VercelLogo from "../public/img/vercel.svg";

export default function Footer(props) {
  return (
    <Container className="mt-10 border-t border-gray-100 dark:border-gray-800">
      <div className="text-sm text-center">
        Copyright © Tanveer Hussain
      </div>
 
      <div className="flex items-center justify-between mt-2">
       
        {/* <ThemeSwitch /> */}
      </div>
    </Container>
  );
}
