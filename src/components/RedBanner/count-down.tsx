import React from 'react';
import Countdown from 'react-countdown-now';

const CountDown = (): JSX.Element => {
  return <Countdown date={Date.now() + 6000000} />;
};

export default CountDown;
