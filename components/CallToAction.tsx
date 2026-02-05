'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

export default function CallToAction() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    project: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <>
    <section id="contact" className="px-6 md:px-12 lg:px-24 py-32">
      <div className="flex flex-col lg:flex-row lg:items-start mx-auto gap-12 lg:gap-16">
      <div className="max-w-[600px] text-left flex-shrink-0">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-left mb-16"
        >
          <div className="flex flex-col sm:flex-row items-stretch gap-6">
            <div className="w-full sm:w-40 md:w-48 lg:w-56 rounded-lg overflow-hidden border-2 border-muted-gray flex-shrink-0">
              <img
                src="/contact-photo.png"
                alt="Trevor"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 font-mono">
                Let's Build Something
              </h2>
              <p className="text-lg md:text-xl text-muted-gray leading-relaxed">
                Have a project in mind? Let's start a conversation about how we can work together.
              </p>
            </div>
          </div>
        </motion.div>
        
        <motion.form
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div>
            <label htmlFor="name" className="block mb-2 text-sm text-muted-gray">
              What's your name?
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 bg-dark-gray border-2 border-muted-gray rounded-sm text-light-gray focus:outline-none transition-colors"
              style={{
                borderColor: '#999999',
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = 'rgba(162, 89, 255, 0.8)'
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = '#999999'
              }}
              required
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block mb-2 text-sm text-muted-gray">
              What's your email?
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 bg-dark-gray border-2 border-muted-gray rounded-sm text-light-gray focus:outline-none transition-colors"
              style={{
                borderColor: '#999999',
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = 'rgba(10, 200, 250, 0.8)'
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = '#999999'
              }}
              required
            />
          </div>
          
          <div>
            <label htmlFor="project" className="block mb-2 text-sm text-muted-gray">
              How can I help you?
            </label>
            <textarea
              id="project"
              name="project"
              value={formData.project}
              onChange={(e) => setFormData({ ...formData, project: e.target.value })}
              rows={5}
              className="w-full px-4 py-3 bg-dark-gray border-2 border-muted-gray rounded-sm text-light-gray focus:outline-none transition-colors resize-none"
              style={{
                borderColor: '#999999',
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = 'rgba(14, 205, 152, 0.8)'
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = '#999999'
              }}
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full px-8 py-4 bg-light-gray text-dark font-medium rounded-sm hover:bg-white transition-all duration-200"
            style={{
              boxShadow: '0 0 0 rgba(10, 200, 250, 0)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 0 30px rgba(10, 200, 250, 0.4)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 0 0 rgba(10, 200, 250, 0)'
            }}
          >
            {submitted ? 'Message Sent' : 'Send Message'}
          </button>
        </motion.form>
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
    </>
  )
}
