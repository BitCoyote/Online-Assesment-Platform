import FooterMenu from "./Components/FooterMenu";
import FooterLinks from "./Components/FooterLinks";

const Footer = () => {
    return <div className={'bg-[#f0f0f0] relative left-0 top-0 w-full px-8 py-10 z-50'}>
        <FooterMenu/>
        <FooterLinks/>
    </div>
}

export default Footer;