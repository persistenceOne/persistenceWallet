import { useEffect } from 'react';
import { useRouter } from 'next/router';
import DashboardStaking from '../views/Staking';

export default function Staking() {
  const router = useRouter();

  useEffect(() => {
    // Check authentication here if needed
    console.log('Staking page loaded');
  }, []);

  return <DashboardStaking />;
}
