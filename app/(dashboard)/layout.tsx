import CoreDashboard from '@/components/dashboard';
import React, { Fragment } from 'react';
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Fragment>
      <CoreDashboard>{children}</CoreDashboard>
    </Fragment>
  );
}
