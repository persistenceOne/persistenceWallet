import { useEffect } from 'react';
import { useRouter } from 'next/router';
import DashboardWallet from '../views/DashboardWallet';

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    // Check authentication here if needed
    console.log('Dashboard page loaded');
  }, []);

  return <DashboardWallet />;
}
