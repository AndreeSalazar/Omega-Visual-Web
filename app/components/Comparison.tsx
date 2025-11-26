'use client'

import { motion } from 'framer-motion'
import { Check, X, AlertCircle } from 'lucide-react'
import { useI18n } from '@/lib/i18n-context'

const comparisonData = [
  {
    feature: 'Visual Nodes',
    vsCode: false,
    visualStudio: false,
    houdini: true,
    omegaVisual: true,
    omegaHighlight: true,
  },
  {
    feature: 'Assembly Support',
    vsCode: 'partial',
    visualStudio: 'partial',
    houdini: false,
    omegaVisual: true,
    omegaHighlight: true,
  },
  {
    feature: 'Modular Composition',
    vsCode: false,
    visualStudio: false,
    houdini: true,
    omegaVisual: true,
    omegaHighlight: true,
  },
  {
    feature: 'Real Compilation',
    vsCode: true,
    visualStudio: true,
    houdini: false,
    omegaVisual: true,
    omegaHighlight: false,
  },
  {
    feature: 'Collaboration',
    vsCode: 'partial',
    visualStudio: 'partial',
    houdini: false,
    omegaVisual: 'coming',
    omegaHighlight: true,
  },
  {
    feature: 'Multi-language',
    vsCode: true,
    visualStudio: true,
    houdini: false,
    omegaVisual: true,
    omegaHighlight: false,
  },
]

const renderCell = (value: boolean | string | 'coming') => {
  if (value === true) {
    return <Check className="text-primary mx-auto" size={20} />
  }
  if (value === false) {
    return <X className="text-text/30 mx-auto" size={20} />
  }
  if (value === 'partial') {
    return <AlertCircle className="text-accent mx-auto" size={20} />
  }
  if (value === 'coming') {
    return <span className="text-secondary text-sm">🚀 Soon</span>
  }
  return null
}

export default function Comparison() {
  const { t } = useI18n()
  
  return (
    <section className="py-24 bg-gradient-to-b from-background via-surface to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-black text-center mb-16 text-gradient"
        >
          {t.comparison.title}
        </motion.h2>

        <div className="overflow-x-auto">
          <div className="bg-surface/50 backdrop-blur-sm rounded-xl border border-text/10 p-6">
            <table className="w-full">
              <thead>
                <tr className="border-b border-text/10">
                  <th className="text-left py-4 px-4 text-text font-bold">Feature</th>
                  <th className="text-center py-4 px-4 text-text/70">Visual Studio</th>
                  <th className="text-center py-4 px-4 text-text/70">VSCode</th>
                  <th className="text-center py-4 px-4 text-text/70">Houdini</th>
                  <th className="text-center py-4 px-4 text-primary font-bold">Omega-Visual</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-text/5 hover:bg-background/50 transition-colors"
                  >
                    <td className="py-4 px-4 text-text font-semibold">{row.feature}</td>
                    <td className="py-4 px-4 text-center">{renderCell(row.visualStudio)}</td>
                    <td className="py-4 px-4 text-center">{renderCell(row.vsCode)}</td>
                    <td className="py-4 px-4 text-center">{renderCell(row.houdini)}</td>
                    <td className={`py-4 px-4 text-center ${row.omegaHighlight ? 'bg-primary/10' : ''}`}>
                      {renderCell(row.omegaVisual)}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-8"
        >
            <a
            href="#"
            className="text-secondary hover:text-primary transition-colors inline-flex items-center gap-2"
          >
            {t.comparison.seeFull}
          </a>
        </motion.div>
      </div>
    </section>
  )
}

