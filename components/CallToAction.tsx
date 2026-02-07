'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Linkedin } from 'lucide-react'

export default function CallToAction() {
  return (
    <div
      className="relative"
      style={{
        background: 'linear-gradient(to bottom, #000000 0%, #000000 35%, #0a0a0a 50%, #0a0a0a 65%, #000000 100%)',
      }}
    >
    <section id="contact" className="px-6 md:px-12 lg:px-24 pt-[200px] pb-24">
      <div className="max-w-6xl mx-auto">
      <div className="flex flex-col lg:flex-row lg:items-start gap-12 lg:gap-16">
      <div className="text-left flex-shrink-0 w-full">
        <motion.div
          initial={{ opacity: 0.4, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="text-left mb-16"
        >
          <div className="flex flex-col sm:flex-row items-stretch gap-6">
            <div className="relative w-full max-w-[22rem] aspect-square rounded-lg overflow-hidden border-2 border-muted-gray flex-shrink-0">
              <Image
                src="/contact-photo.png"
                alt="Trevor"
                fill
                sizes="(max-width: 640px) 100vw, 704px"
                quality={95}
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 font-mono">
                Let&apos;s Build Something
              </h2>
              <p className="text-lg md:text-xl text-muted-gray leading-relaxed">
                Have a project in mind? Let&apos;s start a conversation about how we can work together. The best way to connect is via{' '}
                <a
                  href="https://www.linkedin.com/in/trevor-byron/"
                  target="_blank"
                  rel="noreferrer"
                  className="underline underline-offset-4 hover:text-light-gray transition-colors"
                >
                  LinkedIn
                </a>
                .
              </p>
              <a
                href="https://www.linkedin.com/in/trevor-byron/"
                target="_blank"
                rel="noreferrer"
                aria-label="Connect on LinkedIn"
                className="mt-8 inline-flex items-center justify-center gap-3 px-6 py-3 rounded-sm border-2 border-transparent bg-light-gray text-dark font-medium hover:bg-white transition-all duration-200"
              >
                <Linkedin className="h-6 w-6 text-dark" strokeWidth={1.5} />
                <span>Connect on LinkedIn</span>
              </a>
            </div>
          </div>
        </motion.div>
        </div>
      </div>
      </div>
    </section>
    <footer className="w-full px-6 md:px-12 lg:px-24 py-24 flex justify-center items-center">
      <span
        className="font-mono font-bold select-none"
        style={{
          fontSize: 'clamp(4rem, 15vw, 12rem)',
          color: '#1a1a1a',
          letterSpacing: '-0.02em',
          lineHeight: 1,
        }}
        aria-hidden
      >
        &lt;/the end&gt;
      </span>
    </footer>
    </div>
  )
}
