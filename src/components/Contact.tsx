import { motion } from 'framer-motion';
import { Linkedin, MapPin, Send, CheckCircle, AlertCircle, Briefcase, Shield, Building2 } from 'lucide-react';
import { useState, useRef } from 'react';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { CONTACT } from '../data/constants';
import { useLanguage } from '../contexts/LanguageContext';
import SectionHeader from './SectionHeader';

export default function Contact() {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const captchaRef = useRef<HCaptcha>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!captchaToken) {
      setStatus('error');
      setErrorMessage(t('contact.form.captchaError'));
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: '71a73fe7-07dc-487b-8355-39522037f79b',
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: `Portfolio Contact - ${formData.name}`,
          'h-captcha-response': captchaToken,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setCaptchaToken(null);
        captchaRef.current?.resetCaptcha();
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        setErrorMessage(data.message || t('contact.form.error'));
        captchaRef.current?.resetCaptcha();
        setCaptchaToken(null);
      }
    } catch {
      setStatus('error');
      setErrorMessage(t('contact.form.networkError'));
      captchaRef.current?.resetCaptcha();
      setCaptchaToken(null);
    }
  };

  return (
    <section id="contact" className="py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeader title={t('contact.title')} subtitle={t('contact.subtitle')} />

        {/* Availability banner */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="max-w-5xl mx-auto mb-12"
        >
          <div className="card-elevated p-5">
            <div className="flex items-center gap-3 mb-3">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary-400"></span>
              </span>
              <span className="text-white font-semibold">{t('contact.status.title')}</span>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary-500/10 text-primary-400 text-sm border border-primary-500/15">
                <Building2 size={14} />
                Monaco Telecom
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-danger-500/10 text-danger-400 text-sm border border-danger-500/15">
                <Shield size={14} />
                {t('contact.status.security')}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-200 text-gray-400 text-sm border border-surface-300">
                <Briefcase size={14} />
                {t('contact.status.period')}
              </span>
            </div>
            <p className="text-gray-500 text-sm mt-3">
              {t('contact.status.detail')}
            </p>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-white mb-4">
              {t('contact.letsTalk')}
            </h3>
            <p className="text-gray-400 mb-8">
              {t('contact.availability')}
            </p>

            <div className="space-y-3">
              <a
                href={CONTACT.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 card-surface hover:border-surface-400 transition-colors"
              >
                <div className="p-2.5 rounded-lg bg-primary-500/15">
                  <Linkedin className="text-primary-400" size={20} />
                </div>
                <div>
                  <p className="text-caption text-gray-500">LinkedIn</p>
                  <p className="text-white text-sm">{CONTACT.name}</p>
                </div>
              </a>

              <div className="flex items-center gap-4 p-4 card-surface">
                <div className="p-2.5 rounded-lg bg-cyber-500/15">
                  <MapPin className="text-cyber-400" size={20} />
                </div>
                <div>
                  <p className="text-caption text-gray-500">{t('contact.location')}</p>
                  <p className="text-white text-sm">{CONTACT.location}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 12 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="card-surface p-6">
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-gray-300 text-sm mb-2"
                >
                  {t('contact.form.name')}
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-surface-100 border border-surface-300 rounded-lg text-white focus:outline-none focus:border-primary-500 transition-colors"
                  placeholder={t('contact.form.namePlaceholder')}
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-gray-300 text-sm mb-2"
                >
                  {t('contact.form.email')}
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-surface-100 border border-surface-300 rounded-lg text-white focus:outline-none focus:border-primary-500 transition-colors"
                  placeholder={t('contact.form.emailPlaceholder')}
                  required
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="message"
                  className="block text-gray-300 text-sm mb-2"
                >
                  {t('contact.form.message')}
                </label>
                <textarea
                  id="message"
                  rows={5}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-surface-100 border border-surface-300 rounded-lg text-white focus:outline-none focus:border-primary-500 transition-colors resize-none"
                  placeholder={t('contact.form.messagePlaceholder')}
                  required
                />
              </div>

              {/* hCaptcha */}
              <div className="mb-6">
                <HCaptcha
                  ref={captchaRef}
                  sitekey="50b2fe65-b00b-4b9e-ad62-3ba471098be2"
                  onVerify={(token) => setCaptchaToken(token)}
                  onExpire={() => setCaptchaToken(null)}
                  theme="dark"
                  languageOverride={language}
                />
              </div>

              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4 p-3 bg-cyber-500/15 border border-cyber-500/25 rounded-lg flex items-center gap-2 text-cyber-400"
                >
                  <CheckCircle size={18} />
                  <span>{t('contact.form.success')}</span>
                </motion.div>
              )}

              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4 p-3 bg-danger-500/15 border border-danger-500/25 rounded-lg flex items-center gap-2 text-danger-400"
                >
                  <AlertCircle size={18} />
                  <span>{errorMessage}</span>
                </motion.div>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className={`w-full py-3 rounded-lg font-semibold text-white flex items-center justify-center gap-2 transition-colors ${
                  status === 'loading'
                    ? 'bg-surface-300 cursor-not-allowed'
                    : 'bg-primary-500 hover:bg-primary-600'
                }`}
              >
                {status === 'loading' ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    {t('contact.form.sending')}
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    {t('contact.form.send')}
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
