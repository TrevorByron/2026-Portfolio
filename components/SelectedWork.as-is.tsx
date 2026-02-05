'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const workItems = [
  {
    title: 'Procore Construction Network',
    description: 'As principal designer, I led discovery, vision casting, and internal alignment for the Procore Construction Network—a free online business directory that connects general contractors, specialty contractors, owners, architects, and vendors on one platform. I used the RITE research method and prototyped the first version in full HTML and CSS, so I could quickly iterate on designs immediately after collecting feedback from users—one of the clear benefits of prototyping in code. As the designer I owned the final polish of what was actually shipped—I rolled up my sleeves and made the changes to the actual repo. The project launched in 2021 and I oversaw front-end implementation to ensure design quality and mobile-friendly experiences.',
    link: '#',
    prototypeUrl: 'https://trevorborden.github.io/GCN-prototype/index.html',
    image: '/PCN.png',
    imageAlt: 'Procore unified platform shown on desktop, tablet, and smartphone',
  },
  {
    title: 'Get Sh!t Done',
    description: (
      <>
        I worked directly with{' '}
        <a
          href="https://www.linkedin.com/in/roberthohman/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-figma-blue hover:underline"
        >
          Robert Hohman
        </a>{' '}
        in a focused, two-person strike team to explore and validate a new to-do app concept inspired by Getting Sht Done*. The goal was speed and clarity—testing the idea early without pulling in a broader team or burning unnecessary resources.
        <br /><br />
        Together we aligned on the core problems worth solving, mapped key journeys and information architecture, and evaluated the saturated to-do market to understand where a new approach could realistically stand out.
      </>
    ),
    link: '#',
  },
  {
    title: 'Mobile Experience',
    description: 'Native-feeling mobile prototype exploring gesture interactions and micro-animations.',
    link: '#',
  },
]

export default function SelectedWork() {
  const userFlowArticleRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: userFlowArticleRef,
    offset: ['start end', 'end start'],
  })

  const phoneRowX = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [500, 200, -200, -500])
  // All columns stay at the same height - no vertical animation
  const column1Y = useTransform(scrollYProgress, () => 0)
  const column2Y = useTransform(scrollYProgress, () => 0)
  const column3Y = useTransform(scrollYProgress, () => 0)
  const column4Y = useTransform(scrollYProgress, () => 0)
  const column5Y = useTransform(scrollYProgress, () => 0)
  const column6Y = useTransform(scrollYProgress, () => 0)
  // No X offsets since there's no vertical movement
  const column1X = useTransform(scrollYProgress, () => 0)
  const column2X = useTransform(scrollYProgress, () => 0)
  const column3X = useTransform(scrollYProgress, () => 0)
  const column4X = useTransform(scrollYProgress, () => 0)
  const column5X = useTransform(scrollYProgress, () => 0)
  const column6X = useTransform(scrollYProgress, () => 0)
  const phoneOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0])

  return (
    <section id="recent-work" className="px-6 md:px-12 lg:px-24 py-32 bg-black overflow-x-hidden">
      <div className="max-w-6xl mx-auto mb-20">
        <motion.h4
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.9 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-lg font-bold mb-20 text-left font-mono uppercase text-gray-500"
        >
          Recent Work
        </motion.h4>
      </div>

      {workItems.map((item, index) => (
        <motion.article
          key={item.title}
          ref={item.title === 'Get Sh!t Done' ? userFlowArticleRef : undefined}
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: index * 0.05 }}
          className="mb-24 last:mb-0"
        >
          {/* Content: header + paragraph, constrained width */}
          <div className="max-w-6xl mx-auto mb-8">
            <h3 className="font-semibold font-mono mb-4">
              {item.title}
            </h3>
            <p className="text-lg md:text-xl text-muted-gray leading-relaxed max-w-3xl">
              {item.description}
            </p>
            {'prototypeUrl' in item && item.prototypeUrl && (
              <a
                href={item.prototypeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-6 px-5 py-2.5 font-mono text-sm font-medium border border-gray-500 text-light-gray hover:border-white hover:text-white transition-colors duration-200"
              >
                View Prototype
              </a>
            )}
          </div>

          {/* Full-width image or mobile screenshots (User Flow) — breaks out of section padding */}
          {item.title === 'Get Sh!t Done' ? (
            <div
              className="w-screen max-w-none ml-[calc(50%-50vw)] bg-dark box-content overflow-visible transition-colors duration-300 -mt-20"
              style={{ minHeight: 'min(2000px, 120vh)' }}
            >
              <div className="relative w-full min-h-[min(2000px,120vh)] flex items-center justify-center overflow-visible">
                <motion.div
                  className="absolute inset-0"
                  style={{ x: phoneRowX }}
                >
                {/* Column 1 */}
                <motion.div
                  className="absolute rounded-[20px] border-2 border-gray-600 bg-dark-gray shadow-xl overflow-hidden"
                  style={{
                    width: 222,
                    aspectRatio: '9 / 19.5',
                    left: '8%',
                    top: '15%',
                    x: column1X,
                    y: column1Y,
                    opacity: phoneOpacity,
                    rotate: -6.5,
                    zIndex: 6,
                  }}
                >
                  <img
                    src="/user-flow-phone-1.png"
                    alt="Get Sh!t Done app navigation menu"
                    className="w-full h-full object-cover object-top"
                  />
                </motion.div>
                <motion.div
                  className="absolute rounded-[20px] border-2 border-gray-600 bg-dark-gray shadow-xl overflow-hidden"
                  style={{
                    width: 222,
                    aspectRatio: '9 / 19.5',
                    left: 'calc(8% + 57px)',
                    top: 'calc(15% + 498px)',
                    x: column1X,
                    y: column1Y,
                    opacity: phoneOpacity,
                    rotate: -6.5,
                    zIndex: 6,
                  }}
                >
                  <img
                    src="/user-flow-phone-7.png"
                    alt="Get Sh!t Done dark mode navigation"
                    className="w-full h-full object-cover object-top"
                  />
                </motion.div>
                {/* Column 2 */}
                <motion.div
                  className="absolute rounded-[20px] border-2 border-gray-600 bg-dark-gray shadow-xl overflow-hidden"
                  style={{
                    width: 222,
                    aspectRatio: '9 / 19.5',
                    left: 'calc(8% + 242px)',
                    top: '15%',
                    x: column2X,
                    y: column2Y,
                    opacity: phoneOpacity,
                    rotate: -6.5,
                    zIndex: 5,
                  }}
                >
                  <img
                    src="/user-flow-phone-2.png"
                    alt="Get Sh!t Done today to do list view"
                    className="w-full h-full object-cover object-top"
                  />
                </motion.div>
                <motion.div
                  className="absolute rounded-[20px] border-2 border-gray-600 bg-dark-gray shadow-xl overflow-hidden"
                  style={{
                    width: 222,
                    aspectRatio: '9 / 19.5',
                    left: 'calc(8% + 299px)',
                    top: 'calc(15% + 498px)',
                    x: column2X,
                    y: column2Y,
                    opacity: phoneOpacity,
                    rotate: -6.5,
                    zIndex: 5,
                  }}
                >
                  <img
                    src="/user-flow-phone-8.png"
                    alt="Get Sh!t Done dark mode to do list"
                    className="w-full h-full object-cover object-top"
                  />
                </motion.div>
                {/* Column 3 */}
                <motion.div
                  className="absolute rounded-[20px] border-2 border-gray-600 bg-dark-gray shadow-xl overflow-hidden"
                  style={{
                    width: 222,
                    aspectRatio: '9 / 19.5',
                    left: 'calc(8% + 484px)',
                    top: '15%',
                    x: column3X,
                    y: column3Y,
                    opacity: phoneOpacity,
                    rotate: -6.5,
                    zIndex: 4,
                  }}
                >
                  <img
                    src="/user-flow-phone-3.png"
                    alt="Get Sh!t Done projects list view"
                    className="w-full h-full object-cover object-top"
                  />
                </motion.div>
                <motion.div
                  className="absolute rounded-[20px] border-2 border-gray-600 bg-dark-gray shadow-xl overflow-hidden"
                  style={{
                    width: 222,
                    aspectRatio: '9 / 19.5',
                    left: 'calc(8% + 541px)',
                    top: 'calc(15% + 498px)',
                    x: column3X,
                    y: column3Y,
                    opacity: phoneOpacity,
                    rotate: -6.5,
                    zIndex: 4,
                  }}
                >
                  <img
                    src="/user-flow-phone-9.png"
                    alt="Get Sh!t Done dark mode projects"
                    className="w-full h-full object-cover object-top"
                  />
                </motion.div>
                {/* Column 4 */}
                <motion.div
                  className="absolute rounded-[20px] border-2 border-gray-600 bg-dark-gray shadow-xl overflow-hidden"
                  style={{
                    width: 222,
                    aspectRatio: '9 / 19.5',
                    left: 'calc(8% + 726px)',
                    top: '15%',
                    x: column4X,
                    y: column4Y,
                    opacity: phoneOpacity,
                    rotate: -6.5,
                    zIndex: 3,
                  }}
                >
                  <img
                    src="/user-flow-phone-4.png"
                    alt="Get Sh!t Done new task screen"
                    className="w-full h-full object-cover object-top"
                  />
                </motion.div>
                <motion.div
                  className="absolute rounded-[20px] border-2 border-gray-600 bg-dark-gray shadow-xl overflow-hidden"
                  style={{
                    width: 222,
                    aspectRatio: '9 / 19.5',
                    left: 'calc(8% + 783px)',
                    top: 'calc(15% + 498px)',
                    x: column4X,
                    y: column4Y,
                    opacity: phoneOpacity,
                    rotate: -6.5,
                    zIndex: 3,
                  }}
                >
                  <img
                    src="/user-flow-phone-10.png"
                    alt="Get Sh!t Done dark mode new task"
                    className="w-full h-full object-cover object-top"
                  />
                </motion.div>
                {/* Column 5 */}
                <motion.div
                  className="absolute rounded-[20px] border-2 border-gray-600 bg-dark-gray shadow-xl overflow-hidden"
                  style={{
                    width: 222,
                    aspectRatio: '9 / 19.5',
                    left: 'calc(8% + 968px)',
                    top: '15%',
                    x: column5X,
                    y: column5Y,
                    opacity: phoneOpacity,
                    rotate: -6.5,
                    zIndex: 2,
                  }}
                >
                  <img
                    src="/user-flow-phone-5.png"
                    alt="Get Sh!t Done new task with due date calendar"
                    className="w-full h-full object-cover object-top"
                  />
                </motion.div>
                <motion.div
                  className="absolute rounded-[20px] border-2 border-gray-600 bg-dark-gray shadow-xl overflow-hidden"
                  style={{
                    width: 222,
                    aspectRatio: '9 / 19.5',
                    left: 'calc(8% + 1025px)',
                    top: 'calc(15% + 498px)',
                    x: column5X,
                    y: column5Y,
                    opacity: phoneOpacity,
                    rotate: -6.5,
                    zIndex: 2,
                  }}
                >
                  <img
                    src="/user-flow-phone-11.png"
                    alt="Get Sh!t Done dark mode schedule"
                    className="w-full h-full object-cover object-top"
                  />
                </motion.div>
                {/* Column 6 */}
                <motion.div
                  className="absolute rounded-[20px] border-2 border-gray-600 bg-dark-gray shadow-xl overflow-hidden"
                  style={{
                    width: 222,
                    aspectRatio: '9 / 19.5',
                    left: 'calc(8% + 1210px)',
                    top: '15%',
                    x: column6X,
                    y: column6Y,
                    opacity: phoneOpacity,
                    rotate: -6.5,
                    zIndex: 1,
                  }}
                >
                  <img
                    src="/user-flow-phone-6.png"
                    alt="Get Sh!t Done schedule view"
                    className="w-full h-full object-cover object-top"
                  />
                </motion.div>
                <motion.div
                  className="absolute rounded-[20px] border-2 border-gray-600 bg-dark-gray shadow-xl overflow-hidden"
                  style={{
                    width: 222,
                    aspectRatio: '9 / 19.5',
                    left: 'calc(8% + 1267px)',
                    top: 'calc(15% + 498px)',
                    x: column6X,
                    y: column6Y,
                    opacity: phoneOpacity,
                    rotate: -6.5,
                    zIndex: 1,
                  }}
                >
                  <img
                    src="/user-flow-phone-12.png"
                    alt="Get Sh!t Done dark mode new task"
                    className="w-full h-full object-cover object-top"
                  />
                </motion.div>
                {/* Gradient overlay - fades bottom row into black */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'linear-gradient(to bottom, transparent 0%, transparent 40%, rgba(0, 0, 0, 0.3) 60%, rgba(0, 0, 0, 0.7) 80%, rgba(0, 0, 0, 1) 100%)',
                  }}
                />
                </motion.div>
              </div>
            </div>
          ) : (
            <div
              className="w-screen max-w-none ml-[calc(50%-50vw)] aspect-[16/9] md:aspect-[21/9] bg-dark box-content flex items-center justify-center overflow-hidden transition-colors duration-300"
              style={{ minHeight: 'min(420px, 50vh)' }}
            >
              <img
                src={'image' in item && item.image ? item.image : '/PCN.png'}
                alt={'imageAlt' in item && item.imageAlt ? item.imageAlt : 'Project screenshot'}
                className={`w-full h-full object-center box-content border border-black ${'imageCover' in item && item.imageCover ? 'object-cover' : 'object-contain'}`}
              />
            </div>
          )}

          {/* Learn more, constrained to content width */}
          <div className="max-w-6xl mx-auto mt-6">
            <a
              href={item.link}
              className="inline-flex items-center gap-2 text-light-gray font-medium font-mono hover:text-white transition-colors duration-200 group"
            >
              Learn more
              <span className="group-hover:translate-x-1 transition-transform duration-200" aria-hidden>
                →
              </span>
            </a>
          </div>
        </motion.article>
      ))}
    </section>
  )
}
