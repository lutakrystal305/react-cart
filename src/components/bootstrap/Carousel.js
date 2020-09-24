import React from 'react';
import { UncontrolledCarousel } from 'reactstrap';
import tea from '../img/tea.png';
import Dor1 from '../img/Dor1.jpg';
import C1 from '../img/C1.jpg';
import './Carousel.css';

const items = [
  {
    src: Dor1,
    altText: 'Slide 1',
    key: '1'
  },
  {
    src: C1,
    altText: 'Slide 2',
    key: '2'
  },
  {
    src: tea,
    altText: 'Slide 3',
    key: '3'
  }
];

const Example = () => <UncontrolledCarousel items={items} />;

export default Example;