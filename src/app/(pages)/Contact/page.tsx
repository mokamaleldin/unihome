"use client";
import ContactHeader from '@/component/Contact/ContactHeader';
import ContactForm from '@/component/Contact/ContactForm';
import CommunityMessage from '@/component/Contact/CommunityMessage';
import ContactDetails from '@/component/Contact/ContactDetails';
import ComingFeatures from '@/component/Contact/ComingFeatures';
import FinalCTA from '@/component/Contact/FinalCTA';

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-[#F6F3EA] py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <ContactHeader />

        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 `}>
          <ContactForm />

          <div className="space-y-8">
            <CommunityMessage />
            <ContactDetails />
          </div>
        </div>
        <ComingFeatures />
        <FinalCTA />
      </div>
    </div>
  );
};

export default ContactPage;