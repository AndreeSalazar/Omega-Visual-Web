'use client'

import { motion } from 'framer-motion'
import { Github, Youtube, Mail } from 'lucide-react'
import { useI18n } from '@/lib/i18n-context'

const footerLinks = {
  community: [
    { name: 'GitHub', href: 'https://github.com/AndreeSalazar', icon: Github },
    { name: 'Discord', href: 'https://discord.gg/CjHfWgvK' },
    { name: 'YouTube', href: 'https://www.youtube.com/@Qdantex', icon: Youtube },
  ],
  legal: [
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms of Service', href: '#' },
  ],
  contact: [
    { name: 'eddi.salazar.dev@gmail.com', href: 'mailto:eddi.salazar.dev@gmail.com', icon: Mail },
  ],
}

export default function Footer() {
  const { t } = useI18n()
  
  return (
    <footer className="bg-background border-t border-surface py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Links Column 1 - Community */}
          <div>
            <h3 className="text-lg font-bold text-text mb-4">{t.footer.community}</h3>
            <ul className="space-y-2">
              {footerLinks.community.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-text/60 hover:text-primary transition-colors flex items-center gap-2"
                  >
                    {link.icon && <link.icon size={16} />}
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Links Column 2 - Legal */}
          <div>
            <h3 className="text-lg font-bold text-text mb-4">{t.footer.legal}</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-text/60 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Links Column 3 - Contact */}
          <div>
            <h3 className="text-lg font-bold text-text mb-4">{t.footer.contact}</h3>
            <ul className="space-y-2">
              {footerLinks.contact.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-text/60 hover:text-primary transition-colors flex items-center gap-2"
                  >
                    {link.icon && <link.icon size={16} />}
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-surface pt-8">
          <div className="text-center space-y-2">
            <p className="text-text/60 text-sm font-medium">
              {t.footer.copyright}
            </p>
            <div className="text-text/40 text-xs leading-relaxed max-w-3xl mx-auto">
              <p>{t.footer.copyright2}</p>
              <p>{t.footer.copyright3}</p>
              <p>{t.footer.copyright4}</p>
              <p className="mt-3">{t.footer.copyright5}</p>
              <p>{t.footer.copyright6}</p>
              <p>{t.footer.copyright7}</p>
              <p className="mt-3">{t.footer.copyright8}</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

