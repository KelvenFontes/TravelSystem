import * as React from 'react';
import Trips from './components/Trips';

export const metadata = {
  title: 'About',
};

const About = () => {
  return (
    <div>
      <h1>About</h1>
      <Trips />
    </div>
  )
}

export default About
