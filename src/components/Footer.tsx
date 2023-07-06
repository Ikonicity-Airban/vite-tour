import { Footer } from "flowbite-react";
import LogoComponent from "./LogoComponent";
// import logo from "../assets/logo.svg";

export default function FooterComponent() {
  return (
    <Footer container className="text-sm bg-[#003355] z-10 text-white relative">
      <div className="w-full">
        <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
          <div className="pb-10">
            <LogoComponent />
          </div>
          <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6 ">
            <div className="">
              <Footer.Title title="about" className="" />
              <Footer.LinkGroup col>
                <Footer.Link href="#">Services</Footer.Link>
                <Footer.Link href="#">Sites</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Follow us" />
              <Footer.LinkGroup col>
                <Footer.Link href="#">Facebook</Footer.Link>
                <Footer.Link href="#">LinkedIn</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Legal" />
              <Footer.LinkGroup col>
                <Footer.Link href="#">Privacy Policy</Footer.Link>
                <Footer.Link href="#">Terms & Conditions</Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright by="Ikoncity Airban™" href="#" year={2022} />
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center"></div>
        </div>
      </div>
    </Footer>
  );
}
