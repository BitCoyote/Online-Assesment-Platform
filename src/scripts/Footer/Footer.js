import FooterMenu from "./Components/FooterMenu";
import FooterLinks from "./Components/FooterLinks";

const Footer = ({/*opened, setOpened*/}) => {
    return <div className={'bg-[#f0f0f0] relative left-0 top-0 w-full px-7.5 py-10 z-50'}>
        <FooterMenu/>
        <FooterLinks /*opened={opened} setOpened={setOpened}*//>
    </div>
}

export default Footer;