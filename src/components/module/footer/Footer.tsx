import Logo from "@/components/shared/logo/Logo";

import FooterContacts from "./FooterContacts";
import FooterCopyright from "./FooterCopyright";
import FooterInfo from "./FooterInfo";
import FooterNav from "./FooterNav";
import FooterSocials from "./FooterSocials";

const Footer = () => {
  return (
    <footer className="bg-dark pb-10 pl-8 pt-16 text-light xl:px-[50px] xl:pb-11 xl:pt-[78px]">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-16 flex flex-col gap-10 xl:mb-[50px] xl:flex-row xl:items-start xl:justify-between">
          <div className="mb-9">
            <Logo className="h-auto w-6 xl:w-10" variant="light" />
          </div>
          <div className="flex flex-col max-md:gap-10 md:flex-row md:justify-around xl:justify-between xl:gap-[138px]">
            <FooterNav />
            <FooterInfo />
          </div>
          <div className="flex flex-col gap-10 md:flex-row md:justify-around xl:flex-col">
            <FooterContacts />
            <FooterSocials />
          </div>
        </div>

        <FooterCopyright />
      </div>
    </footer>
  );
};

export default Footer;
