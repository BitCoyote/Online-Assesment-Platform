import { ButtonKMQ } from "../KMQComponents/ButtonKMQ";
import MainImg from '../../assets/login/login_main.png';
import InputKMQ from "../KMQComponents/InputKMQ";
import { useState } from "react";
import { loginUser } from "../../api/user";
import { Tabs } from "../../constants/tabs";
import HeaderKMQ from "../Header/HeaderKMQ";
import Footer from "../Footer/Footer";

const LogInPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        loginUser({ username: username, password: password })
            .then((response) => {
                response
                    ? window.location.href = Object.values(Tabs[response.roles[0]])[0]
                    : null
            })
    }

    const onKeyPress = (keyPressed) => {
        if (keyPressed.key === 'Enter') {
            handleLogin();
        }
    }

    return (
        <div>
            <HeaderKMQ />
            <div className={'w-full table'}>
                <div className={'table-cell w-[55vw] relative'}>
                    <div className={'w-1/2 text-center absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%]'}>
                        <div className={'text-4xl font-bold mb-12'}>Welcome</div>
                        <div className={'text-left mb-2'}>E-mail</div>
                        <InputKMQ value={username} type={'email'} className={'block'} placeholder={'Enter E-mail'}
                            onChange={e => setUsername(e.target.value)} onKeyPress={onKeyPress} />
                        <div className={'text-left mb-2'}>Password</div>
                        <InputKMQ value={password} type={'password'} className={'block'} placeholder={'Enter password'}
                            onChange={e => setPassword(e.target.value)} onKeyPress={onKeyPress} />
                        <ButtonKMQ text={'Login'} onClick={() => handleLogin()} />
                    </div>
                </div>
                <div className={'table-cell w-[45vw]'}>
                    <img className={'w-[45vw]'} alt={'main'} src={MainImg} />
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default LogInPage;