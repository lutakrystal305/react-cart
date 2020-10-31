import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserEdit } from "@fortawesome/free-solid-svg-icons";

import './Profile.css';
import '../creator/Creator.css';
import '../creator/Creator-MB.css';
import './History.css';
import Footer from '../footer/';
import Alert1 from '../bootstrap/Alert';
import Alert2 from '../material-ui/Alert';
import cover from '../img/bridge.jpg';
import hall1 from '../img/hall1.png';
import hall2 from '../img/hall2.png';
import avt from '../img/avt.png';
import noel1 from '../img/Noel1.png';
import noel2 from '../img/Noel2.png';

const Profile = () => {
    const data = localStorage.getItem('user');
    const user = JSON.parse(data);
    const [changePhone, setChangePhone] = useState(false);
    const [changeEmail, setChangeEmail] = useState(false);
    const [changeDate, setChangeDate] = useState(false);
    const [changeUni, setChangeUni] = useState(false);
    const [changeAdd, setChangeAdd] = useState(false);
    const [valueEmail, setValueEmail] = useState('');
    const [valuePhone, setValuePhone] = useState(null);
    const [valueUni, setValueUni] = useState('');
    const [valueDate, setValueDate] = useState('');
    const [valueAdd, setValueAdd] = useState('');
    const [okPhone, setOKPhone] = useState(false);
    const [okEmail, setOKEmail] = useState(false);
    const [okDate, setOKDate] = useState(false);
    const [okUni, setOKUni] = useState(false);
    const [okAdd, setOKAdd] = useState(false);


    const [isErrPhone, setIsErrPhone] = useState(false);
    const [isErrEmail, setIsErrEmail] = useState(false);
    const [isErrDate, setIsErrDate] = useState(false);
    const [isErrUni, setIsErrUni] = useState(false);
    const [isErrAdd, setIsErrAdd] = useState(false);
    const [msgErr, setMsgErr] = useState('');

    const handleChangePhone = (event) => {
        let value = event.target.value;
        setValuePhone(value)
    }
    const handleChangeEmail = (event) => {
        let value = event.target.value;
        setValueEmail(value)
    }
    const handleChangeDate = (event) => {
        let value = event.target.value;
        setValueDate(value)
    }
    const handleChangeUni = (event) => {
        let value = event.target.value;
        setValueUni(value)
    }
    const handleChangeAdd = (event) => {
        let value = event.target.value;
        setValueAdd(value)
    }
   


    const handleClickPhone = () => {
        setChangePhone(!changePhone);
        setOKPhone(false);
    }
    const handleClickEmail = () => {
        setChangeEmail(!changeEmail);
        setOKEmail(false);
    }
    const handleClickDate = () => {
        setChangeDate(!changeDate);
        setOKDate(false);
    }
    const handleClickUni = () => {
        setChangeUni(!changeUni);
        setOKUni(false);
    }
    const handleClickAdd = () => {
        setChangeAdd(!changeAdd);
        setOKAdd(false);
    }
    const handleUpdatePhone = () => {
        if ((valuePhone.length !== 10)||(valuePhone.indexOf(' ') > 0)) {
            setIsErrPhone(true);
            setMsgErr('Your new Phone was wrong syntax!')
        } else {
            setOKPhone(true);
            setChangePhone(false);
            const up = {
                _id: user._id,
                phone: valuePhone
            }
        
        axios
            .post('https://amber-api.herokuapp.com/user/updatePhone', up)
            .then((res) => {
                localStorage.removeItem('user');
                localStorage.setItem("user", JSON.stringify(res.data));
            })
        }

    }
    const handleUpdateEmail = () => {
        if ((valueEmail.length < 13) || (valueEmail.indexOf('@gmail.com') < 0) || (valueEmail.indexOf(' ') > 0)) {
            setIsErrEmail(true);
            setMsgErr('Your new Email was wrong syntax!')
        } else {
            setOKEmail(true);
            setChangeEmail(false);
            const up = {
                _id: user._id,
                email: valueEmail
            }
            axios
                .post('https://amber-api.herokuapp.com/user/updateEmail', up)
                .then((res) => {
                    localStorage.removeItem('user');
                    localStorage.setItem("user", JSON.stringify(res.data));
                })
            }

    }
    const handleUpdateDate = () => {
        if (valueDate.length < 4) {
            setIsErrDate(true);
            setMsgErr('Your date of birth was wrong syntax!')
        } else {
            setOKDate(true)
            setChangeDate(false);
            const up= {
                _id: user._id,
                date: valueDate
            }   
            axios
                .post('https://amber-api.herokuapp.com/user/updateDate', up)
                .then((res) => {
                    localStorage.removeItem('user');
                    localStorage.setItem("user", JSON.stringify(res.data));
                })
        }

    }
    const handleUpdateUni = () => {
        if (valueUni.length < 1) {
            setIsErrUni(true);
            setMsgErr('Your university was wrong syntax!')
        } else {
            setOKUni(true);
            setChangeUni(false)

            const up = {
                _id: user._id,
                uni: valueUni
            }
            axios
                .post('https://amber-api.herokuapp.com/user/updateUni', up)
                .then((res) => {
                    localStorage.removeItem('user');
                    localStorage.setItem("user", JSON.stringify(res.data));
                })
        }

    }
    const handleUpdateAdd = () => {
        if (valueAdd.length < 3) {
            setIsErrAdd(true);
            setMsgErr('Your address was wrong syntax!')
        } else {
            setOKAdd(true);
            setChangeAdd(false);
            const up = {
                _id: user._id,  
                add: valueAdd
            }
            axios
                .post('https://amber-api.herokuapp.com/user/updateAdd', up)
                .then((res) => {
                    localStorage.removeItem('user');
                    localStorage.setItem("user", JSON.stringify(res.data));
                })
        }

    }
    let userPhone;
    if (!user.phone) {
        userPhone = ''
    } else {
        userPhone = user.phone;
    }

    useEffect(() => {
        document.title= `${user.name}`
    }, [])
    return(
        <div className='Profile'>
            <div className='cover-creator'>
                <img src={cover} alt='cover' />
            </div>
            <div className='left-scene'>
                <img src={noel1} alt='left-scene'  width={200}/>
            </div>
            <div className='right-scene'>
                <img src={noel2} alt='right-scene' width={200}/>
            </div>
            <div className='in4'>
                <div className='head-in4'>
                    <img src={avt} alt='avt' width={150}/>
                    <h4>{user.name}</h4>
                </div>
                <h2 className='title'>Personal Information</h2>
                <div className='body-in4'>
                    <div className='left-scene-in4'>
                        <img src={hall1} alt='left-scene-in4' />
                    </div>
                    <div className='right-scene-in4'>
                        <img src={hall2} alt='right-scene-in4' />
                    </div>
                    <div className='name'>
                        <label>Name: </label>
                        <p>
                            {user.name}
                        </p>
                    </div>
                    <div className='phone'>
                        {okPhone ? <Alert2 /> : ''}
                        <label>Phone: </label>
                        <p>
                            { okPhone?
                            valuePhone : '0'+userPhone
                            }
                            <span>
                                <button onClick={handleClickPhone}>
                                    <FontAwesomeIcon icon={faUserEdit} className='btn-change-in4' />
                                </button>
                            </span>
                        </p>
                        <div className={classNames('new', {'phone1': changePhone})}>
                            <div className='change-input'>
                                {isErrPhone ? <Alert1>{msgErr}</Alert1> : ''}
                                <input type='text' placeholder='Your new phone :' onChange={handleChangePhone}/>
                            </div>
                            <button onClick={handleUpdatePhone}>Save</button>
                        </div>
                    </div>
                    <div className='email'>
                        {okEmail ? <Alert2 /> : ''}
                        <label>Email: </label>
                        <p>
                            {okEmail ? valueEmail  : user.email }
                            <span>
                                <button onClick={handleClickEmail}>
                                    <FontAwesomeIcon icon={faUserEdit} className='btn-change-in4' />
                                </button>
                            </span>
                        </p>
                        <div className={classNames('new', {'email1': changeEmail})}>
                            <div className='change-input'>
                                {isErrEmail ? <Alert1>{msgErr}</Alert1> : ''}
                                <input type='text' placeholder='Your new email :' onChange={handleChangeEmail}/>
                            </div>
                            <button onClick={handleUpdateEmail}>Save</button>
                        </div>
                    </div>
                    <div className='date'>
                        {okDate ? <Alert2 /> : ''}
                        <label>Date of birth: </label>
                        <p>
                            {okDate?
                                valueDate : user.date
                            }
                            <span>
                                <button onClick={handleClickDate}>
                                    <FontAwesomeIcon icon={faUserEdit} className='btn-change-in4' />
                                </button>
                            </span>
                        </p>
                        <div className={classNames('new', {'date1': changeDate})}>
                            <div className='change-input'>
                                {isErrDate ? <Alert1>{msgErr}</Alert1> : ''}
                                <input type='text' placeholder='Your birthday :' onChange={handleChangeDate}/>
                            </div>
                            <button onClick={handleUpdateDate}>Save</button>
                        </div>
                    </div>
                    
                    
                    <div className='uni'>
                        {okUni ? <Alert2 /> : ''}
                        <label>University: </label>
                        <p>
                            {okUni ? 
                            valueUni : user.uni    
                        }
                            <span>
                                <button onClick={handleClickUni}>
                                    <FontAwesomeIcon icon={faUserEdit} className='btn-change-in4' />
                                </button>
                            </span>
                        </p>
                        <div className={classNames('new', {'uni1': changeUni})}>
                            <div className='change-input'>
                                {isErrUni ? <Alert1>{msgErr}</Alert1> : ''}
                                <input type='text' placeholder='Your university :' onChange={handleChangeUni}/>
                            </div>
                            <button onClick={handleUpdateUni}>Save</button>
                        </div>
                    </div>
                    <div className='address'>
                            {okAdd ? <Alert2 /> : ''}
                            <label>Address: </label>
                            <p>
                                {okAdd? valueAdd : user.add}
                                <span>
                                    <button onClick={handleClickAdd}>
                                        <FontAwesomeIcon icon={faUserEdit} className='btn-change-in4' />
                                    </button>
                                </span>
                            </p>
                            <div className={classNames('new', {'add1': changeAdd})}>
                                <div className='change-input'>
                                    {isErrAdd ? <Alert1>{msgErr}</Alert1> : ''}
                                    <input type='text' placeholder='Your address :' onChange={handleChangeAdd}/>
                                    
                                </div>
                                <button onClick={handleUpdateAdd}>Save</button>
                            </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
export default Profile
