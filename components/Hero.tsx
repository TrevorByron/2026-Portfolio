'use client'

import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <motion.section
      className="min-h-screen flex items-center justify-start px-6 md:px-12 lg:px-24 py-32"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
    >
      <div className="max-w-6xl mx-auto w-full text-left">
        <h4 className="text-lg font-bold text-left font-mono uppercase text-gray-500 mb-2">
          TREVOR BORDEN,
        </h4>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 text-balance font-mono"
        >
          Design Engineer
        </motion.h1>
        
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.05 }}
          className="text-xl md:text-2xl lg:text-3xl font-semibold text-muted-gray mb-12 text-balance font-mono"
        >
          I build real, coded prototypes and help teams validate ideas faster—blurring the line between design and engineering so teams ship with confidence.
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
          className="text-lg md:text-xl text-muted-gray mb-16 max-w-2xl leading-relaxed text-balance"
        >
          I believe the future of product teams is one where designers ship code and engineers design experiences. Static mockups are great for exploration, but real learning happens when something behaves like the real thing. I work with founders and product leaders to make that happen—quickly and efficiently.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}
          className="flex flex-col sm:flex-row gap-4 justify-start items-start"
        >
          <a
            href="#contact"
            className="min-w-[193px] min-h-[56px] inline-flex items-center justify-center px-8 py-4 border-2 border-transparent bg-light-gray text-dark font-medium rounded-sm hover:bg-white transition-all duration-200"
            style={{
              boxShadow: '0 0 0 rgba(162, 89, 255, 0)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 0 30px rgba(162, 89, 255, 0.4)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 0 0 rgba(162, 89, 255, 0)'
            }}
          >
            Start a prototype
          </a>
          <a
            href="#recent-work"
            className="min-w-[193px] min-h-[56px] inline-flex items-center justify-center px-8 py-4 border-2 border-muted-gray text-light-gray font-medium rounded-sm transition-all duration-200"
            style={{
              borderColor: '#999999',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(162, 89, 255, 0.7)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#999999'
            }}
          >
            See work
          </a>
        </motion.div>
      </div>
    </motion.section>
  )
}
