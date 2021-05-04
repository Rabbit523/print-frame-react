import React from 'react';
import { RouteComponentProps } from '@reach/router';

type Props = { component: React.ComponentType } & RouteComponentProps;

// eslint-disable-next-line react/prop-types
const Route: React.ComponentType<Props> = ({ component: Component, ...rest }) => <Component {...rest} />;

export default Route;
