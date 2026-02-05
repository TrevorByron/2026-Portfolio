'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Zap, PenTool } from 'lucide-react'

const FIGMA_GREEN = '#0ECD98'
const FIGMA_BLUE = '#0AC8FA'

const models = [
  {
    title: 'Strike Team',
    description: 'Fast, focused, non-disruptive. I partner with founders, CEOs, and product leaders to rapidly build prototypes that validate ideas and bring clarity—without slowing down your existing teams. I come in focused, deliver fast, and can either hand off clean deliverables or stay on to help move them toward production.',
    Icon: Zap,
    hoverColor: FIGMA_GREEN,
  },
  {
    title: 'Embedded Designer',
    description: 'Temporary team expansion—without a full-time hire. Sometimes what a team really needs is extra firepower for a few months. I embed with your product team to augment capacity, inject design-engineering thinking into workflows, and ensure front-end and prototype work level up.',
    Icon: PenTool,
    hoverColor: FIGMA_BLUE,
  },
]

export default function WaysToWork() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <motion.section
      id="how-i-work"
      className="px-6 md:px-12 lg:px-24 py-24"
      initial={{ opacity: 0.4, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <div className="max-w-6xl mx-auto">
        <motion.h4
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.9 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-lg font-bold mb-4 text-left font-mono text-gray-500"
        >
          TWO STYLES OF WORKING TOGETHER
        </motion.h4>
        
        <div className="grid md:grid-cols-2 gap-16 md:gap-12">
          {models.map((model, index) => {
            const isHovered = hoveredIndex === index
            const Icon = model.Icon
            return (
              <motion.div
                key={model.title}
                initial={{ opacity: 0.3, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.35, ease: 'easeOut', delay: index * 0.04 }}
                className="space-y-6 pt-8"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <h3
                  className="font-black font-mono flex items-center gap-3 transition-colors duration-300"
                  style={{ color: isHovered ? model.hoverColor : '#e5e5e5', fontWeight: 900 }}
                >
                  <Icon
                    className="shrink-0 transition-colors duration-300"
                    size={28}
                    strokeWidth={2}
                    style={{ color: 'currentColor' }}
                    aria-hidden
                  />
                  {model.title}
                </h3>
                <p className="text-muted-gray leading-relaxed text-lg">
                  {model.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </motion.section>
  )
}
