'use client';
import Logo from './Logo';
import NavigationLinks from './NavigationLinks';
import Language from './Language';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

const Header = () => {
  const pathname = usePathname();
  const { loading } = useAuth();
  const isAuthPage = pathname === '/Auth';
  
  return (
    <header className="bg-[#588157] px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Logo />
        {!isAuthPage && !loading && <NavigationLinks />}
        <Language />
      </div>
    </header>
  );
};

export default Header;