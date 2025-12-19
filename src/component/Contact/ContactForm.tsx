'use client';
import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface ContactFormProps {
    onSubmitSuccess?: () => void;
}

const ContactForm = ({ onSubmitSuccess }: ContactFormProps) => {
    const { t } = useLanguage();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        setTimeout(() => {
            setSubmitted(true);
            setIsSubmitting(false);
            setFormData({ name: '', email: '', message: '' });
            onSubmitSuccess?.();
        }, 1000);
    };

    return (
        <div className="bg-white rounded-3xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-[#344E41] mb-6">{t('contact.form.title')}</h2>

            {submitted && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                    <div className="flex items-center gap-2">
                        <span className="text-green-500 text-xl">✓</span>
                        <p className="text-[#588157] font-medium">
                            {t('contact.form.successMessage')}
                        </p>
                    </div>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-[#344E41] mb-2">
                        {t('contact.form.nameLabel')}
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#588157] focus:border-[#588157] outline-none transition-colors"
                        placeholder={t('contact.form.namePlaceholder')}
                    />
                </div>

                {/* Email Field */}
                <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-[#344E41] mb-2">
                        {t('contact.form.emailLabel')}
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#588157] focus:border-[#588157] outline-none transition-colors"
                        placeholder={t('contact.form.emailPlaceholder')}
                    />
                </div>

                {/* Message Field */}
                <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-[#344E41] mb-2">
                        {t('contact.form.messageLabel')}
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#588157] focus:border-[#588157] outline-none transition-colors resize-none"
                        placeholder={t('contact.form.messagePlaceholder')}
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#588157] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#344E41] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? t('contact.form.sending') : t('contact.form.sendButton')}
                </button>
            </form>
        </div>
    );
};

export default ContactForm;
