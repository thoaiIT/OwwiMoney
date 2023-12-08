import CoreDashboard from '@/components/dashboard';
import ProgressBar from '@/components/progressbar/ProgressBar';
import React, { Fragment } from 'react';
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Fragment>
      <ProgressBar />
      <CoreDashboard>{children}</CoreDashboard>
    </Fragment>
  );
}
