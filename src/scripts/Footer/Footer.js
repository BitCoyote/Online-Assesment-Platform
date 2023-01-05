import FooterMenu from "./Components/FooterMenu";
import FooterLinks from "./Components/FooterLinks";

const Footer = () => {
    return <div className={'bg-[#f0f0f0] relative left-0 top-0 w-full p-6 pt-10 pl-10 z-50'}>
        <FooterMenu/>
        <FooterLinks/>
    </div>
}

export default Footer;