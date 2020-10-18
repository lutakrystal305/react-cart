import React from 'react';
import avtX from '../img/avt-x.jpg';
import classNames from 'classnames';
import './Creator.css';
import './Creator-MB.css';
import am1 from '../img/am1.png';
import am2 from '../img/am2.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const Infor = () => {
    const [isMore, setIsMore] = React.useState(false);
    const [isHover, setIsHover] = React.useState(0);
    const handleClick = () => {
        setIsMore(!isMore);
    }
    const handleOver = (x) => {
        setIsHover(x);
    }
    const handleOut = () => {
        setIsHover(false);
    }
    return(
        <div className='Infor'>
            <div className='head-in4'>
                <img src={avtX} alt='avt' width={150}/>
                <div className='zz'>
                    <h3>Thái</h3>
                    <p>(Luta Krystal)</p>
                </div>
                <div className='creator-slogan'>
                    <p>NOREG!</p>
                </div>
            </div>
            <h2 className='port'>Portfolio...</h2>
            <div className='body-in4'>
                <div className='name'>
                    <label>Name: </label>
                    <p>
                        Nguyễn Văn Thái
                    </p>
                </div>
                <div className='phone'>
                    <label>Phone: </label>
                    <p>
                        0764323005
                    </p>
                </div>
                <div className='mail'>
                    <label>Email: </label>
                    <p>
                        nguyenvanthai305@gmail.com
                    </p>
                </div>
                <div className='date'>
                    <label>Date of birth: </label>
                    <p>
                        30/05/2000
                    </p>
                </div>
                
                <div className='pos'>
                    <label>Favourite position: </label>
                    <p>
                        Box to Box
                    </p>
                </div>
                <div className='uni'>
                    <label>University: </label>
                    <p>
                        Danang university of technology
                    </p>
                </div>
                <div className='address'>
                        <label>Address: </label>
                        <p>
                            Quốc lộ 1A, Viêm Tây 2, Điện Thăng Bắc, Điện Bàn, Quảng Nam
                        </p>
                </div>
                <div className='pj'>
                    <h5>My project:</h5>
                    <div className='pj-z'>
                        {(isHover === 1) ?
                            (<div className='pj-content'>

                                <FontAwesomeIcon icon={faHeart} className='icon-heart' />
                            </div>)
                        : ''
                        }
                        <img src={am1} alt='project' onMouseOver={() => handleOver(1)} onMouseOut={handleOut} />
                    </div>
                    <div className='pj-z'>
                        {(isHover === 2) ?
                            (<div className='pj-content'>

                                <FontAwesomeIcon icon={faHeart} className='icon-heart' />
                            </div>)
                        : ''
                        }
                        <img src={am2} alt='project' onMouseOver={() => handleOver(2)} onMouseOut={handleOut} />
                    </div>
                </div>
                {isMore ?
                    (<div className='container-in4'>
                        
                        <div className='exp-s'>
                            <label>Knowledge about software</label>
                            <ul>
                                <li>React</li>
                                <li>Nodejs</li>
                                <li>HTML</li>
                                <li>Javascript</li>
                                <li>CSS</li>
                                <li>JQuery</li>
                                <li>Git</li>
                                <li>MongoDB</li>
                            </ul>
                        </div>
                        <div className='hobby'>
                            <label>My hobbies</label>
                            <ul>
                                <li>Football</li>
                                <li>Hang out</li>
                                <li>Listen to Music</li>
                                <li>Learn about anything</li>
                                <li>Learn about UI</li>
                                <li>Watch any Anime</li>
                            </ul>
                        </div>
                        <div className='exp'>
                            <label>Experiment about part-time job</label>
                            <ul>
                                <li>Sale</li>
                                <li>Security</li>
                                <li>Waiter</li>
                            </ul>
                        </div>
                    </div>
                    ) : ''
                }
                <div className='view-more' onClick={handleClick}>
                    {(!isMore) ?
                        <button className='btn-more'>View more</button>
                        : <button className='btn-more'>View less</button>
                    }
                </div>
            </div>
        </div>
    )
}
export default Infor;