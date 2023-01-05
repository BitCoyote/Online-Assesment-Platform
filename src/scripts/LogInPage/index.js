import {ButtonKMQ} from "../KMQComponents/ButtonKMQ";
import MainImg from '../../assets/login/login_main.png';
import InputKMQ from "../KMQComponents/InputKMQ";
import {useEffect, useState} from "react";
import {loginUser} from "../../api/user";
import {Tabs} from "../../constants/tabs";
import {useAccount} from "../../api/utils";

const LogInPage = () => {
    const [user, loading, userError] = useAccount('me');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        loginUser({username: username, password: password})
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

    useEffect(() => {
        if (user) {
            window.location.href = Object.values(Tabs[user.role])[0];
        }
    }, [window.location.href, loading])

    return <div className={'w-screen table'}>
        <div className={'table-cell w-[55vw] relative'}>
            <div className={'w-1/2 text-center absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%]'}>
                <div className={'text-4xl font-bold mb-12'}>Welcome</div>
                <div className={'text-left mb-2'}>E-mail</div>
                <InputKMQ value={username} type={'email'} className={'block'} placeholder={'Enter E-mail'}
                          onChange={e => setUsername(e.target.value)} onKeyPress={onKeyPress}/>
                <div className={'text-left mb-2'}>Password</div>
                <InputKMQ value={password} type={'password'} className={'block'} placeholder={'Enter password'}
                          onChange={e => setPassword(e.target.value)} onKeyPress={onKeyPress}/>
                <ButtonKMQ text={'Login'} onClick={() => handleLogin()}/>
            </div>
        </div>
        <div className={'table-cell w-[45vw]'}>
            <img className={'w-[45vw]'} alt={'main'} src={MainImg}/>
        </div>
    </div>
}

export default LogInPage;