'use client'

import { motion } from 'framer-motion'
import { Check, ArrowRight } from 'lucide-react'

const plans = [
  {
    name: 'FREE',
    subtitle: 'Beta',
    price: '$0',
    period: '/month',
    features: [
      'Visual node editor',
      'Assembly + C++ support',
      'Up to 50 nodes',
      'Community templates',
    ],
    cta: 'Join Beta Waitlist',
    highlight: false,
  },
  {
    name: 'PRO',
    subtitle: 'Coming Soon',
    price: '$49',
    period: '/month',
    features: [
      'Everything in Free',
      'Unlimited nodes',
      'All 12 languages',
      'Parameter system',
      'Priority support',
    ],
    cta: 'Notify Me',
    highlight: true,
  },
  {
    name: 'ENTERPRISE',
    subtitle: 'Custom',
    price: 'Contact us',
    period: '',
    features: [
      'Everything in Pro',
      'Collaboration (multi-user)',
      'Private marketplace',
      'Custom integrations',
      'Dedicated support',
    ],
    cta: 'Schedule Demo',
    highlight: false,
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-gradient-to-b from-background via-surface to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-black text-center mb-16 text-gradient"
        >
          Start Building Today
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -8 }}
              className={`relative glass-effect p-8 rounded-xl border transition-all ${
                plan.highlight
                  ? 'border-primary shadow-2xl shadow-primary/30 glow-primary'
                  : 'border-text/10 hover:border-primary/30'
              }`}
            >
              {plan.highlight && (
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-1 bg-gradient-primary rounded-full text-sm font-bold text-white shadow-lg"
                >
                  Popular
                </motion.div>
              )}

              <div className="text-center mb-8">
                <div className="text-sm text-text/60 mb-2">{plan.subtitle}</div>
                <h3 className="text-3xl font-black text-text mb-2">{plan.name}</h3>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold text-gradient">{plan.price}</span>
                  <span className="text-text/60">{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    <Check className="text-primary flex-shrink-0 mt-0.5" size={20} />
                    <span className="text-text/80">{feature}</span>
                  </li>
                ))}
              </ul>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`w-full py-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all ${
                  plan.highlight
                    ? 'bg-gradient-primary text-white'
                    : 'bg-background border border-text/20 text-text hover:border-primary'
                }`}
              >
                {plan.cta}
                <ArrowRight size={18} />
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

