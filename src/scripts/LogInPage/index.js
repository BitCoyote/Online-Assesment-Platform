import {ButtonKMQ} from "../KMQComponents/ButtonKMQ";
import MainImg from '../../assets/login/login_main.png';
import InputKMQ from "../KMQComponents/InputKMQ";
import {useEffect, useState} from "react";
import {getAcceptedTermsAndConditions, loginUser} from "../../api/user";
import {Tabs} from "../../constants/tabs";
import {useAccount} from "../../api/utils";

const LogInPage = () => {
    const [user, loading, userError] = useAccount('me');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        loginUser({username: username, password: password})
            .then((response) => {
                if (response) {
                    if (response.roles[0] === 'Participant') {
                        getAcceptedTermsAndConditions().then(accepted =>
                            accepted
                                ? window.location.href = Object.values(Tabs[response.roles[0]])[0]
                                : window.location.reload()
                        );
                    } else {
                        window.location.href = Object.values(Tabs[response.roles[0]])[0]
                    }
                }
            })
    }

    const onKeyPress = (keyPressed) => {
        if (keyPressed.key === 'Enter') {
            handleLogin();
        }
    }

    useEffect(() => {
        if (user) {
            if (user.role === 'Participant') {
                getAcceptedTermsAndConditions().then(accepted =>
                    accepted
                        ? window.location.href = Object.values(Tabs[user.role])[0]
                        : null
                );
            } else {
                window.location.href = Object.values(Tabs[user.role])[0];
            }
        }
    }, [window.location.href, loading])

    return <div className={'w-full table'}>
        <div className={'table-cell w-[45vw] relative'}>
            <div className={'w-[55%] text-center absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%]'}>
                <div className={'text-4.5xl font-bold mb-7.5 font-anvirnext'}>Welcome</div>
                <div className={'text-left mb-1'}>Email</div>
                <InputKMQ value={username} type={'email'} className={'block mb-7.5'} placeholder={'Enter Email'}
                          onChange={e => setUsername(e.target.value)} onKeyPress={onKeyPress}/>
                <div className={'text-left mb-1'}>Password</div>
                <InputKMQ value={password} type={'password'} className={'block mb-7.5'} placeholder={'Enter Password'}
                          onChange={e => setPassword(e.target.value)} onKeyPress={onKeyPress}/>
                <ButtonKMQ className={'w-[50%]'} text={'Login'} onClick={() => handleLogin()}/>
            </div>
        </div>
        <div className={'table-cell w-[55vw]'}>
            <img className={'w-[55vw]'} alt={'main'} src={MainImg}/>
        </div>
    </div>
}

export default LogInPage;