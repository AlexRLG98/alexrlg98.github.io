import { motion } from 'framer-motion';
import { Linkedin, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { useState, useRef } from 'react';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { CONTACT } from '../data/constants';
import { useLanguage } from '../contexts/LanguageContext';

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
    <section id="contact" className="py-24 bg-grid">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">{t('contact.title')}</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-white mb-6">
              {t('contact.letsTalk')}
            </h3>
            <p className="text-gray-400 mb-8">
              {t('contact.availability')}
            </p>

            <div className="space-y-4">
              <motion.a
                href={CONTACT.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ x: 5 }}
                className="flex items-center gap-4 p-4 glass rounded-lg hover:bg-white/5 transition-colors"
              >
                <div className="p-3 rounded-full bg-blue-500/20">
                  <Linkedin className="text-blue-400" size={20} />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">LinkedIn</p>
                  <p className="text-white">{CONTACT.name}</p>
                </div>
              </motion.a>

              <motion.div
                whileHover={{ x: 5 }}
                className="flex items-center gap-4 p-4 glass rounded-lg"
              >
                <div className="p-3 rounded-full bg-green-500/20">
                  <MapPin className="text-green-400" size={20} />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">{t('contact.location')}</p>
                  <p className="text-white">{CONTACT.location}</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="glass rounded-xl p-6">
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
                  className="w-full px-4 py-3 bg-dark-300 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-primary-500 transition-colors"
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
                  className="w-full px-4 py-3 bg-dark-300 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-primary-500 transition-colors"
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
                  className="w-full px-4 py-3 bg-dark-300 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-primary-500 transition-colors resize-none"
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
                  className="mb-4 p-3 bg-green-500/20 border border-green-500/30 rounded-lg flex items-center gap-2 text-green-400"
                >
                  <CheckCircle size={18} />
                  <span>{t('contact.form.success')}</span>
                </motion.div>
              )}

              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg flex items-center gap-2 text-red-400"
                >
                  <AlertCircle size={18} />
                  <span>{errorMessage}</span>
                </motion.div>
              )}

              <motion.button
                type="submit"
                disabled={status === 'loading'}
                whileHover={{ scale: status === 'loading' ? 1 : 1.02 }}
                whileTap={{ scale: status === 'loading' ? 1 : 0.98 }}
                className={`w-full py-3 rounded-lg font-semibold text-white flex items-center justify-center gap-2 transition-all ${
                  status === 'loading'
                    ? 'bg-gray-600 cursor-not-allowed'
                    : 'bg-gradient-to-r from-primary-500 to-cyan-500 hover:shadow-lg hover:shadow-primary-500/25'
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
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
