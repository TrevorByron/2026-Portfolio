'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Linkedin } from 'lucide-react'
import { motion } from 'framer-motion'

const navLinks = [
  { label: 'How I work', href: '#how-i-work' },
  { label: 'Recent Work', href: '#recent-work' },
  { label: 'Contact', href: '#contact' },
]

export default function Header() {
  return (
    <motion.header
      className="sticky top-0 z-50 w-full border-b border-white/10 bg-dark/95 backdrop-blur supports-[backdrop-filter]:bg-dark/80 px-6 md:px-12 lg:px-24"
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between">
        <Link
          href="#"
          className="transition-opacity hover:opacity-90"
          aria-label="Trevor Borden"
        >
          <Image
            src="/trevor-borden-logo.png"
            alt="Trevor Borden"
            width={48}
            height={48}
            className="h-14 w-14 md:h-12 md:w-12 object-contain"
            priority
          />
        </Link>
        <nav className="flex items-center gap-8 md:gap-10 lg:gap-12">
          {navLinks.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className="hidden md:block font-mono text-sm text-muted-gray transition-colors hover:text-light-gray"
            >
              {label}
            </a>
          ))}
          <a
            href="https://www.linkedin.com/in/trevor-byron/"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1 rounded p-2 text-muted-gray transition-colors hover:bg-white/10 hover:text-light-gray"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-5 w-5" strokeWidth={1.5} />
          </a>
        </nav>
      </div>
    </motion.header>
  )
}
