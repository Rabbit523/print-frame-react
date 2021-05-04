import React, { ReactNode } from 'react';
import Header from '../components/General/Header';
import Footer from '../components/General/Footer';
interface MainProps {
  title: string;
  description: string;
  pageId: string;
  children: ReactNode | [ReactNode];
}
const Main = ({ title, description, pageId, children }: MainProps): JSX.Element => {
  return (
    <>
      <Header title={title} description={description} pageId={pageId} />
      <div
        style={{
          minHeight: '60vh',
          position: 'relative',
          zIndex: 9,
        }}
      >
        {children}
      </div>
      <Footer />
    </>
  );
};

export default Main;
