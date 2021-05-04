import React from 'react';
import Main from '../layouts/Main';
import { RouteComponentProps, navigate } from '@reach/router';
import SingleProduct from '../components/SingleProduct/index.jsx';

interface FrameProps extends RouteComponentProps {
  FrameId?: string;
}
const IndividualFrame = ({ FrameId }: FrameProps): JSX.Element => {
  if (!FrameId) navigate('/');
  else {
    return (
      <Main
        title={FrameId.replace('-', ' ').toLocaleUpperCase()}
        description="you upload and we print it"
        pageId="TermsAndConditions"
      >
        <SingleProduct uri={FrameId} />
      </Main>
    );
  }
  return <></>;
};

export default IndividualFrame;
