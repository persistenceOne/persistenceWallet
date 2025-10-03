import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Homepage from '../views/Homepage';
import DashboardStaking from '../views/Staking';
import { useSelector } from 'react-redux';
import { LOGIN_INFO } from '../constants/localStorage';

export default function Home() {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const address = useSelector(state => state.address?.value);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Check if user is logged in
  const isLoggedIn = isClient && (
    JSON.parse(window.localStorage.getItem(LOGIN_INFO)) !== null &&
    address !== undefined &&
    address !== null &&
    address !== ""
  );

  if (!isClient) {
    return <div>Loading...</div>;
  }

  // If logged in, show dashboard, otherwise show homepage
  return isLoggedIn ? <DashboardStaking /> : <Homepage />;
}
