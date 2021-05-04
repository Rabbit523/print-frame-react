import React, { useEffect } from 'react';
import { load } from 'recaptcha-v3';

interface IMainProps {
  pageId: string;
}
const GoogleCaptcha = ({ pageId }: IMainProps) => {
  const checkCaptcha = async () => {
    const recaptcha = await load(process.env.CAPTCHA_PUBLIC_KEY as string);
    const token = await recaptcha.execute(pageId);
  };
  useEffect(() => {
    console.log('GoogleCaptcha called on:', pageId);
    checkCaptcha();
  });

  return null;
};

export default GoogleCaptcha;
