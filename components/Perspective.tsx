'use client'

import { motion } from 'framer-motion'

const statements = [
  'The line between designer and engineer is collapsing.',
  'Designers should ship code; engineers should design.',
  'Design should own the front-end experience.',
  'Design is how a product behaves, not just how it looks.',
]

export default function Perspective() {
  return (
    <motion.section
      className="px-6 md:px-12 lg:px-24 py-32 bg-dark-gray"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="max-w-6xl mx-auto">
        <motion.div className="space-y-12">
          {statements.map((statement, index) => {
            const colors = [
              'rgba(242, 78, 30, 0.6)',   // red
              'rgba(252, 116, 49, 0.6)',  // orange
              'rgba(162, 89, 255, 0.6)',  // purple
              'rgba(10, 200, 250, 0.6)',  // blue
            ]
            const hoverColor = colors[index % colors.length]
            return (
              <motion.p
                key={index}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.08 }}
                className="text-2xl md:text-3xl lg:text-4xl font-semibold leading-relaxed text-balance font-mono pl-6 border-l-2 border-transparent transition-colors duration-300"
                style={{
                  borderLeftColor: 'transparent',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderLeftColor = hoverColor
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderLeftColor = 'transparent'
                }}
              >
                {statement}
              </motion.p>
            )
          })}
        </motion.div>
      </div>
    </motion.section>
  )
}
