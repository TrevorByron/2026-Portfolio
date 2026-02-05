'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

const FIGMA_HEADER_COLORS = ['#A259FF', '#0AC8F9', '#0FA958'] as const

const items = [
  {
    title: 'Validated Prototypes',
    description: 'Real, coded prototypes that behave like production software. Not static mockups—interactive experiences you can test, iterate on, and validate with users.',
  },
  {
    title: 'Front-End Ownership',
    description: 'Design responsibility extends through interaction and behavior. I own the front-end experience from concept to code, ensuring design intent survives implementation.',
  },
  {
    title: 'AI-Accelerated Execution',
    description: 'Modern tooling and AI used to move faster without sacrificing craft. Speed and quality aren\'t trade-offs when you have the right tools and process.',
  },
]

export default function WhatIDo() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <motion.section
      className="px-6 md:px-12 lg:px-24 py-24"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="max-w-6xl mx-auto">
        <motion.h4
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.9 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-lg font-bold mb-20 text-left font-mono uppercase text-gray-500"
        >
          What I help teams achieve
        </motion.h4>
        
        <div className="grid md:grid-cols-3 gap-12 md:gap-8">
          {items.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.08 }}
              className="space-y-4 relative"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <h3
                className="font-semibold mb-4 font-mono transition-colors duration-300"
                style={{
                  color: hoveredIndex === index ? FIGMA_HEADER_COLORS[index] : undefined,
                }}
              >
                {item.title}
              </h3>
              <p className="text-muted-gray leading-relaxed text-lg">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
