'use client'

import { motion } from 'framer-motion'
import Hero from '@/components/Hero'
import WhatIDo from '@/components/WhatIDo'
import WaysToWork from '@/components/WaysToWork'
import SelectedWork from '@/components/SelectedWork'
import CallToAction from '@/components/CallToAction'

export default function Home() {
  return (
    <motion.main
      className="min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <Hero />
      <WaysToWork />
      {/* <WhatIDo /> — hidden for now, uncomment to restore */}
      <SelectedWork />
      <CallToAction />
    </motion.main>
  )
}
