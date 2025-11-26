'use client'

import { motion } from 'framer-motion'
import { Github, Twitter, Youtube, Mail } from 'lucide-react'

const footerLinks = {
  product: [
    { name: 'About', href: '#' },
    { name: 'Documentation', href: '#' },
    { name: 'Blog', href: '#' },
    { name: 'Careers', href: '#' },
  ],
  community: [
    { name: 'GitHub', href: '#', icon: Github },
    { name: 'Discord', href: '#' },
    { name: 'Twitter', href: '#', icon: Twitter },
    { name: 'YouTube', href: '#', icon: Youtube },
  ],
  legal: [
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms of Service', href: '#' },
    { name: 'Cookie Policy', href: '#' },
  ],
  contact: [
    { name: 'hello@omega-visual.dev', href: 'mailto:hello@omega-visual.dev', icon: Mail },
    { name: 'Press kit', href: '#' },
    { name: 'Partnership inquiries', href: '#' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-background border-t border-surface py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Links Column 1 */}
          <div>
            <h3 className="text-lg font-bold text-text mb-4">Product</h3>
            <ul className="space-y-2">
              {footerLinks.product.map((link, index) => (
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

          {/* Links Column 2 */}
          <div>
            <h3 className="text-lg font-bold text-text mb-4">Community</h3>
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

          {/* Links Column 3 */}
          <div>
            <h3 className="text-lg font-bold text-text mb-4">Legal</h3>
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

          {/* Links Column 4 */}
          <div>
            <h3 className="text-lg font-bold text-text mb-4">Contact</h3>
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
        <div className="border-t border-surface pt-8 text-center">
          <p className="text-text/40 text-sm">
            © 2025 Omega-Visual. Built with Omega-Visual (meta). All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

