import React, { useState } from 'react';
import classNames from 'classnames';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserEdit } from "@fortawesome/free-solid-svg-icons";

import './Profile.css';
import '../creator/Creator.css';
import './History.css';
import Footer from '../footer/';
import cover from '../img/bridge.jpg';
import hzz from '../img/hzz.png';
import avt from '../img/avt.png';
import autumn2 from '../img/autumn2.png';
import autumn3 from '../img/autumn3.png';

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
        setOKPhone(true);
        setChangePhone(false);
        const up = {
            _id: user._id,
            phone: valuePhone
        }
        axios
            .post('http://localhost:8080/user/updatePhone', up)
            .then((res) => {
                localStorage.removeItem('user');
                localStorage.setItem("user", JSON.stringify(res.data));
            })

    }
    const handleUpdateEmail = () => {
        setOKEmail(true);
        setChangeEmail(false);
        const up = {
            _id: user._id,
            email: valueEmail
        }
        axios
            .post('http://localhost:8080/user/updateEmail', up)
            .then((res) => {
                localStorage.removeItem('user');
                localStorage.setItem("user", JSON.stringify(res.data));
            })

    }
    const handleUpdateDate = () => {
        setOKDate(true)
        setChangeDate(false);
        const up= {
            _id: user._id,
            date: valueDate
        }   
        axios
            .post('http://localhost:8080/user/updateDate', up)
            .then((res) => {
                localStorage.removeItem('user');
                localStorage.setItem("user", JSON.stringify(res.data));
            })

    }
    const handleUpdateUni = () => {
        setOKUni(true);
        setChangeUni(false)

        const up = {
            _id: user._id,
            uni: valueUni
        }
        axios
            .post('http://localhost:8080/user/updateUni', up)
            .then((res) => {
                localStorage.removeItem('user');
                localStorage.setItem("user", JSON.stringify(res.data));
            })

    }
    const handleUpdateAdd = () => {
        setOKAdd(true);
        setChangeAdd(false);
        const up = {
            _id: user._id,  
            add: valueAdd
        }
        axios
            .post('http://localhost:8080/user/updateAdd', up)
            .then((res) => {
                localStorage.removeItem('user');
                localStorage.setItem("user", JSON.stringify(res.data));
            })

    }
    
    
    return(
        <div className='Profile'>
            <div className='cover-creator'>
                <img src={cover} alt='cover' />
            </div>
            <div className='left-scene'>
                <img src={autumn3} alt='left-scene'  width={200}/>
            </div>
            <div className='right-scene'>
                <img src={autumn2} alt='right-scene' width={200}/>
            </div>
            <div className='in4'>
                <div className='head-in4'>
                    <img src={avt} alt='avt' width={150}/>
                   
                </div>
                <div className='body-in4'>
                    <div className='name'>
                        <label>Name: </label>
                        <p>
                            {user.name}
                        </p>
                    </div>
                    <div className='phone'>
                        <label>Phone: </label>
                        <p>
                            { okPhone?
                            valuePhone : '0'+user.phone
                            }
                            <span>
                                <button onClick={handleClickPhone}>
                                    <FontAwesomeIcon icon={faUserEdit} className='btn-change-in4' />
                                </button>
                            </span>
                        </p>
                        <div className={classNames('new', {'phone1': changePhone})}>
                            <div className='change-input'>
                                <input type='text' placeholder='Your new phone :' onChange={handleChangePhone}/>
                            </div>
                            <button onClick={handleUpdatePhone}>Save</button>
                        </div>
                    </div>
                    <div className='email'>
                        <label>Email: </label>
                        <p>
                            {user.email}
                            <span>
                                <button onClick={handleClickEmail}>
                                    <FontAwesomeIcon icon={faUserEdit} className='btn-change-in4' />
                                </button>
                            </span>
                        </p>
                        <div className={classNames('new', {'email1': changeEmail})}>
                            <div className='change-input'>
                                <input type='text' placeholder='Your new email :' onChange={handleChangeEmail}/>
                            </div>
                            <button onClick={handleUpdateEmail}>Save</button>
                        </div>
                    </div>
                    <div className='date'>
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
                                <input type='text' placeholder='Your birthday :' onChange={handleChangeDate}/>
                            </div>
                            <button onClick={handleUpdateDate}>Save</button>
                        </div>
                    </div>
                    
                    
                    <div className='uni'>
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
                                <input type='text' placeholder='Your university :' onChange={handleChangeUni}/>
                            </div>
                            <button onClick={handleUpdateUni}>Save</button>
                        </div>
                    </div>
                    <div className='address'>
                            <label>Address: </label>
                            <p>
                                {user.add}
                                <span>
                                    <button onClick={handleClickAdd}>
                                        <FontAwesomeIcon icon={faUserEdit} className='btn-change-in4' />
                                    </button>
                                </span>
                            </p>
                            <div className={classNames('new', {'add1': changeAdd})}>
                                <div className='change-input'>
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
