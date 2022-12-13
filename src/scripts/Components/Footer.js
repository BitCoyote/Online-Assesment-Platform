import Logo from '../../assets/header/logo.png';

const Footer = () => {
    return <div className={'relative bg-[#f0f0f0] w-screen text-center p-6 mt-8'}>
        <div>
            <div className={'mb-12'}>
                <img src={Logo} alt={'logo'} className={'inline-block'}/>
            </div>
            <div className={'px-36 pb-4'}>
                <div className={'inline-block text-left w-1/2'}>
                    Copyright © 2022 NGen
                </div>
                <div className={'inline-block w-1/2 text-right float-right'}>
                    Developed by KnowMeQ
                </div>
            </div>
        </div>
    </div>
}

export default Footer;