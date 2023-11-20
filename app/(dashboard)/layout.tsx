import React, { Fragment } from 'react';
import CoreDashboard from '../../components/dashboard';
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Fragment>
      <CoreDashboard>{children}</CoreDashboard>
    </Fragment>
  );
}
