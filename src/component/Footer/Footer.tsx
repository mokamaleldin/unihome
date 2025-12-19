'use client';
import Brand from './Brand';
import Links from './Links';
import SocialMedia from './SocialMedia';
import Contact from './Contact';
import Copyright from './Copyright';

const Footer = () => {
  return (
    <footer className="bg-[#344E41] text-[#F3ECDC]">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 border-b border-[#588157] pb-8`}>
          <div className="space-y-4">
            <Brand />
            <SocialMedia />
          </div>
          <Links />
          <Contact />
        </div>
        <Copyright />
      </div>
    </footer>
  );
};

export default Footer;
