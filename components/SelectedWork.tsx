'use client'

import { useRef, type RefObject } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Zap, PenTool } from 'lucide-react'
import QuoteCarousel, { type QuoteItem } from './QuoteCarousel'

const FIGMA_GREEN = '#0ECD98'
const FIGMA_BLUE = '#0AC8FA'

// Procore hero image: file in public/ folder, served at /PCN.png
const PCN_IMAGE = '/PCN.png'

const workStyleBadges = {
  strike: {
    label: 'Strike Team',
    Icon: Zap,
    color: FIGMA_GREEN,
  },
  embedded: {
    label: 'Embedded Design',
    Icon: PenTool,
    color: FIGMA_BLUE,
  },
} as const

// Toro TMS testimonials (from user reviews)
const toroQuotes: QuoteItem[] = [
  {
    quote: 'Only one word for TORO TMS experience: Wonderful.',
    attribution: 'Wanda C.',
    role: 'Payroll',
    title: 'TORO TMS Excellence',
    rating: 5,
    date: 'February 20, 2025',
  },
  {
    quote: 'The very best TMS we have used!',
    attribution: 'Shelby L.',
    role: 'Compliance Manager',
    rating: 5,
    date: 'July 24, 2023',
  },
  {
    quote: 'The dispatch calendar has also helped us earn more money, which offsets the cost.',
    attribution: 'Shelby L.',
    role: 'Compliance Manager',
    rating: 5,
    date: 'July 24, 2023',
  },
  {
    quote: 'By far the best and easiest TMS system I have worked with.',
    attribution: 'Kasia C.',
    role: 'Office Manager and operations manager',
    title: 'TORO has it all!',
    rating: 5,
    date: 'October 15, 2024',
  },
  {
    quote:
      'Very user friendly. We have an older work force and everyone was able to transfer to this system with ease.',
    attribution: 'Michelle M.',
    role: 'Financial Director',
    title: 'Happy New Customer',
    rating: 5,
    date: 'January 8, 2024',
  },
  {
    quote: 'Ease of use and time savings.',
    attribution: 'Mike S.',
    role: 'Operations Manager',
    rating: 5,
    date: 'October 13, 2023',
  },
]

const workItems = [
  {
    title: 'Procore Construction Network',
    workStyle: 'embedded' as const,
    description: (
      <>
        As the principal designer, I led discovery, vision casting, and internal alignment for the{' '}
        <a
          href="https://network.procore.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-figma-purple hover:underline"
        >
          Procore Construction Network
        </a>
        —a free online business directory that connects general contractors, specialty contractors, owners, architects, and vendors on one platform.
        <br /><br />
        I used the RITE research method and prototyped the first version in full HTML and CSS, so I could quickly iterate on designs immediately after collecting feedback from users.
        <br /><br />
        As the designer I owned the final polish of what was actually shipped—I rolled up my sleeves and made the changes to the actual repo. The project launched in 2021 and I oversaw front-end implementation to ensure design quality and mobile-friendly experiences.
      </>
    ),
    link: '#',
    prototypeUrl: 'https://trevorborden.github.io/GCN-prototype/index.html',
    image: PCN_IMAGE,
    imageAlt: 'Procore unified platform shown on desktop, tablet, and smartphone',
  },
  {
    title: 'Get Sh!t Done',
    workStyle: 'strike' as const,
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
        </a>
        , cofounder of Glassdoor, in a focused, two-person strike team to explore and validate a new to-do app concept inspired by Getting Sht Done*. The goal was speed and clarity—testing the idea early without pulling in a broader team or burning unnecessary resources.
        <br /><br />
        Together we aligned on the core problems worth solving, mapped key journeys and information architecture, and evaluated the saturated to-do market to understand where a new approach could realistically stand out.
      </>
    ),
    link: '#',
  },
  {
    title: 'Toro TMS',
    workStyle: 'embedded' as const,
    description: (
      <>
        I was responsible for the front-office product experience at Toro TMS over a 4.5 year contract, partnering closely with founders, product, and engineering from the company's earliest days through meaningful scale. During that time, <span className="text-figma-green">Toro grew from $0 to $10M in ARR</span>.
        <br /><br />
        I designed many of the platform's most widely adopted features—work that was consistently cited by customers as a primary reason for choosing Toro. I extended beyond feature design to define the product's foundational interaction patterns, establish the initial design system, and ensure design decisions scaled as the product and customer base grew.
        <br /><br />
        In addition to the core product, I designed and built Toro's first marketing website, shaping how the company presented itself to the market and supporting early customer acquisition. Throughout the engagement, I took responsibility not just for design direction, but for the quality of what actually shipped—working closely with engineering to ensure the front-end experience matched intent, behavior, and business needs.
      </>
    ),
    link: '#',
  },
]

// Movement along -6.5° axis: per unit "up", x = sin(-6.5°) ≈ -0.1132, y = -cos(6.5°) ≈ -0.994
const UP_X = Math.sin((-6.5 * Math.PI) / 180)   // ≈ -0.1132
const UP_Y = -Math.cos((6.5 * Math.PI) / 180)   // ≈ -0.994
const OFFSET = 80 // px along the tilted axis at end; start is 0

// Procore device stack: four images laid out horizontally with overlap + parallax
const PROCORE_DEVICE_IMAGES = {
  ipad: '/procore-ipad.png',
  desktop: '/procore-desktop.png',
  laptop: '/procore-laptop.png',
  phone: '/procore-phone.png',
} as const

function DeviceStackHero({
  scrollTargetRef,
}: {
  scrollTargetRef?: RefObject<HTMLElement | null>
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  // Tie scroll progress to the article so parallax runs over the whole Procore block scroll
  const { scrollYProgress } = useScroll({
    target: (scrollTargetRef ?? containerRef) as RefObject<HTMLElement>,
    offset: ['start end', 'end start'],
  })
  // Parallax: base row motion; each device has different amplitude = different "depth" speed
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [112, 0, -112])
  // Desktop (behind): scrolls slowest — minimal amplitude
  const desktopY = useTransform(scrollYProgress, (v) => (0.5 - v) * 6) // ±3px
  // iPad & Laptop: same speed (middle layer)
  const ipadY = useTransform(scrollYProgress, (v) => (0.5 - v) * 90) // ±45px
  const laptopY = useTransform(scrollYProgress, (v) => (0.5 - v) * 90)
  // Phone (front): scrolls fastest — largest amplitude
  const phoneY = useTransform(scrollYProgress, (v) => (0.5 - v) * 250) // ±125px

  return (
    <div
      ref={containerRef}
      className="w-screen max-w-none ml-[calc(50%-50vw)] aspect-[16/9] md:aspect-[21/9] bg-dark box-content flex items-center justify-center overflow-hidden transition-colors duration-300"
      style={{ minHeight: 'min(420px, 50vh)' }}
    >
      <motion.div
        className="w-full h-full flex items-end justify-start gap-0 px-5 md:px-10 min-[1550px]:pl-[70px] min-[1620px]:pl-[120px]"
        style={{ y }}
      >
        {/* Left→right: iPad (back), Desktop, Laptop, Phone (front). Reference: iPad behind desktop; desktop largest; laptop base lower; phone elevated. */}
        <motion.div
          className="relative flex-shrink-0 flex items-end justify-center"
          style={{
            width: 'clamp(260px, 24vw, 360px)',
            height: 'min(100%, 62vh)',
            zIndex: 2,
            y: ipadY,
          }}
        >
          <div className="relative z-10">
            <Image
              src={PROCORE_DEVICE_IMAGES.ipad}
              alt="Procore on iPad"
              width={340}
              height={255}
              className="object-contain object-bottom w-full h-full"
              sizes="720px"
              quality={95}
            />
          </div>
          {/* Shadow layer: centered on image (same aspect + bottom align as image), scrolls with it */}
          <div
            className="absolute bottom-0 left-0 right-0 w-full max-h-full aspect-[340/255] flex items-center justify-center pointer-events-none z-0"
            aria-hidden
          >
            <div
              className="w-[90px] h-[120px] lg:h-[175px] bg-red-500 shrink-0"
              style={{ boxShadow: '70px 0px 50px 40px rgba(0, 0, 0, 0.5)' }}
            />
          </div>
        </motion.div>
        <motion.div
          className="relative flex-shrink-0 flex items-end justify-center max-md:min-w-[500px]"
          style={{
            width: 'clamp(320px, 48vw, 700px)',
            height: 'min(100%, 76vh)',
            zIndex: 1,
            y: desktopY,
            marginLeft: 'calc(clamp(-32px, -6vw, -64px) - 80px)',
          }}
        >
          <Image
            src={PROCORE_DEVICE_IMAGES.desktop}
            alt="Procore on desktop"
            width={700}
            height={441}
            className="object-contain object-bottom w-full h-full"
            sizes="1400px"
            quality={95}
          />
        </motion.div>
        <motion.div
          className="relative flex-shrink-0 flex items-end justify-center max-md:hidden"
          style={{
            width: 'clamp(320px, 40vw, 600px)',
            height: 'min(100%, 70vh)',
            zIndex: 3,
            y: laptopY,
            marginLeft: '-145px',
          }}
        >
          <div className="relative z-10">
            <Image
              src={PROCORE_DEVICE_IMAGES.laptop}
              alt="Procore on laptop"
              width={600}
              height={388}
              className="object-contain object-bottom w-full h-full"
              sizes="1200px"
              quality={95}
            />
          </div>
          {/* Shadow layer: same red box on top of laptop */}
          <div
            className="absolute bottom-0 left-0 right-0 w-full max-h-full aspect-[600/388] flex items-center justify-center pointer-events-none z-0"
            aria-hidden
          >
            <div
              className="w-[90px] h-[120px] lg:h-[175px] bg-red-500 shrink-0"
              style={{ boxShadow: '-130px 0px 50px 40px rgba(0, 0, 0, 0.5)' }}
            />
          </div>
        </motion.div>
        <motion.div
          className="relative flex-shrink-0 flex items-end justify-center ml-auto max-lg:hidden"
          style={{
            width: 'clamp(72px, 10vw, 130px)',
            height: 'min(100%, 50vh)',
            zIndex: 4,
            y: phoneY,
            marginLeft: '-135px',
          }}
        >
          <div className="relative z-10">
            <Image
              src={PROCORE_DEVICE_IMAGES.phone}
              alt="Procore on smartphone"
              width={130}
              height={260}
              className="object-contain object-bottom w-full h-full"
              sizes="260px"
              quality={95}
            />
          </div>
          {/* Shadow layer: same red box on top of phone */}
          <div
            className="absolute bottom-0 left-0 right-0 w-full max-h-full aspect-[130/260] flex items-center justify-center pointer-events-none z-0"
            aria-hidden
          >
            <div
              className="w-[90px] h-[120px] lg:h-[175px] bg-red-500 shrink-0"
              style={{ boxShadow: '3px 0px 30px 40px rgba(0, 0, 0, 0.5)' }}
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

function ScrollScaleImage({
  src,
  alt,
  imageCover,
}: {
  src: string
  alt: string
  imageCover?: boolean | undefined
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1.05])

  return (
    <div
      ref={containerRef}
      className="w-screen max-w-none ml-[calc(50%-50vw)] aspect-[16/9] md:aspect-[21/9] bg-dark box-content flex items-center justify-center overflow-hidden transition-colors duration-300"
      style={{ minHeight: 'min(420px, 50vh)' }}
    >
      <motion.div
        className="w-full h-full flex items-center justify-center"
        style={{ scale }}
      >
        <div
          className="relative w-full h-full"
          style={{
            maskImage: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,1) 0%, rgba(255,255,255,0.5) 100%)',
            WebkitMaskImage: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,1) 0%, rgba(255,255,255,0.5) 100%)',
          }}
        >
          <Image
            src={src}
            alt={alt}
            fill
            sizes="100vw"
            quality={95}
            className={`object-center box-content border border-black ${imageCover ? 'object-cover' : 'object-contain'}`}
          />
        </div>
      </motion.div>
    </div>
  )
}

export default function SelectedWork() {
  const userFlowRef = useRef<HTMLElement>(null)
  const procoreArticleRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: userFlowRef,
    // Vertical stagger + horizontal sweep run over this range
    offset: ['start 0.5', 'end -0.50'],
  })
  const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)
  // Vertical stagger along -6.5° (odd up, even down)
  const oddX = useTransform(scrollYProgress, (v) => easeOutCubic(v) * UP_X * OFFSET)
  const oddY = useTransform(scrollYProgress, (v) => easeOutCubic(v) * UP_Y * OFFSET)
  const evenX = useTransform(scrollYProgress, (v) => easeOutCubic(v) * -UP_X * OFFSET)
  const evenY = useTransform(scrollYProgress, (v) => easeOutCubic(v) * -UP_Y * OFFSET)
  // All columns move right-to-left by 200px over the same scroll range
  const rowX = useTransform(scrollYProgress, (v) => easeOutCubic(v) * -200)
  const oddColumnX = useTransform([oddX, rowX], ([ox, rx]: number[]) => ox + rx)
  const evenColumnX = useTransform([evenX, rowX], ([ex, rx]: number[]) => ex + rx)

  return (
    <section id="recent-work" className="px-6 md:px-12 lg:px-24 py-24 bg-black">
      <div className="max-w-6xl mx-auto mb-20">
        <motion.h4
          initial={{ opacity: 0.4, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="text-lg font-bold mb-4 text-left font-mono uppercase text-gray-500"
        >
          Recent Work
        </motion.h4>
      </div>

      {workItems.map((item, index) => (
        <motion.article
          key={item.title}
          ref={
            item.title === 'Get Sh!t Done'
              ? userFlowRef
              : item.title === 'Procore Construction Network'
                ? procoreArticleRef
                : undefined
          }
          initial={{ opacity: 0.3, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4, ease: 'easeOut', delay: index * 0.02 }}
          className="mb-[24vh] last:mb-0"
        >
          {/* Content: header + paragraph (Toro TMS = two-column with image on right) */}
          <div
            className={`max-w-6xl mx-auto mb-8 ${item.title === 'Toro TMS' ? 'grid grid-cols-1 lg:grid-cols-[2fr,minmax(340px,1fr)] gap-8 lg:gap-12 items-start' : ''}`}
          >
            <div>
              <h3
                className="font-semibold font-mono mb-4"
                style={{ fontSize: '40px' }}
              >
                {item.title}
              </h3>
              {'workStyle' in item && item.workStyle && (() => {
                const badge = workStyleBadges[item.workStyle]
                const Icon = badge.Icon
                return (
                  <span
                    className="inline-flex items-center gap-2 rounded-md border px-2.5 py-1 font-mono text-sm font-medium transition-colors duration-300 mb-4"
                    style={{
                      borderColor: badge.color,
                      color: badge.color,
                    }}
                  >
                    <Icon className="shrink-0" size={16} strokeWidth={2} aria-hidden />
                    {badge.label}
                  </span>
                )
              })()}
              <p className="text-lg md:text-xl text-muted-gray leading-relaxed max-w-3xl">
                {item.description}
              </p>
              {'prototypeUrl' in item && item.prototypeUrl && (
                <a
                  href={item.prototypeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center mt-6 px-8 py-4 border-2 border-transparent bg-light-gray text-dark font-medium rounded-sm hover:bg-white transition-all duration-200"
                >
                  View Prototype
                </a>
              )}
            </div>
            {item.title === 'Toro TMS' && (
              <div className="relative w-full aspect-[4/3] h-full sm:min-h-[280px] rounded-lg overflow-hidden lg:overflow-visible bg-dark-gray shrink-0 lg:mr-[-40px] pt-3 pl-3">
                <div
                  className="absolute inset-0 lg:inset-auto lg:left-0 lg:top-1/2 lg:-translate-y-1/2 lg:right-auto lg:bottom-auto lg:w-[700px] lg:h-full"
                  style={{
                    maskImage:
                      'radial-gradient(circle at 0% 50%, rgba(255,255,255,1) 0%, rgba(255,255,255,0.8) 30%, rgba(255,255,255,0.3) 65%, rgba(255,255,255,0) 100%)',
                    WebkitMaskImage:
                      'radial-gradient(circle at 0% 50%, rgba(255,255,255,1) 0%, rgba(255,255,255,0.8) 30%, rgba(255,255,255,0.3) 65%, rgba(255,255,255,0) 100%)',
                  }}
                >
                  <Image
                    src="/Toro-TMS.png?v=2"
                    alt="Toro TMS Embedded Design — dispatch dashboard and recurring event mobile experience"
                    fill
                    sizes="(min-width: 1024px) 1400px, 100vw"
                    quality={95}
                    className="object-cover object-left"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Full-width image or mobile screenshots (User Flow) — breaks out of section padding */}
          {item.title === 'Get Sh!t Done' ? (
            <div
              className="w-screen max-w-none ml-[calc(50%-50vw)] bg-dark box-content overflow-hidden transition-colors duration-300"
              style={{ minHeight: 'calc(979px / 0.85 + 124px)' }}
            >
              <div className="relative w-full min-h-[calc(979px/0.85+124px)] flex items-center justify-center overflow-hidden">
                <div
                  className="absolute inset-0 pt-[24px] pb-[100px] min-[1700px]:translate-x-[calc(42vw-716px)]"
                  style={{
                    maskImage: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,1) 0%, rgba(255,255,255,0.5) 100%)',
                    WebkitMaskImage: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,1) 0%, rgba(255,255,255,0.5) 100%)',
                  }}
                >
                {/* Column 1 container — odd: moves up along -6.5° */}
                <motion.div className="absolute w-[222px] h-[979px]" style={{ left: '8%', top: '5%', zIndex: 6, rotate: -6.5, x: oddColumnX, y: oddY }}>
                  <div
                    className="absolute rounded-[20px] border-2 border-gray-600 bg-dark-gray shadow-xl overflow-hidden"
                    style={{ width: 222, aspectRatio: '9 / 19.5', left: 0, top: 0 }}
                  >
                    <Image src="/user-flow-phone-1.png" alt="Get Sh!t Done app navigation menu" fill sizes="444px" quality={95} className="object-cover object-top" />
                  </div>
                  <div
                    className="absolute rounded-[20px] border-2 border-gray-600 bg-dark-gray shadow-xl overflow-hidden"
                    style={{ width: 222, aspectRatio: '9 / 19.5', left: 0, top: 498 }}
                  >
                    <Image src="/user-flow-phone-7.png" alt="Get Sh!t Done dark mode navigation" fill sizes="444px" quality={95} className="object-cover object-top" />
                  </div>
                </motion.div>
                {/* Column 2 container — even: moves down along -6.5° */}
                <motion.div className="absolute w-[222px] h-[979px]" style={{ left: 'calc(8% + 242px)', top: '5%', zIndex: 5, rotate: -6.5, x: evenColumnX, y: evenY }}>
                  <div
                    className="absolute rounded-[20px] border-2 border-gray-600 bg-dark-gray shadow-xl overflow-hidden"
                    style={{ width: 222, aspectRatio: '9 / 19.5', left: 0, top: 0 }}
                  >
                    <Image src="/user-flow-phone-2.png" alt="Get Sh!t Done today to do list view" fill sizes="444px" quality={95} className="object-cover object-top" />
                  </div>
                  <div
                    className="absolute rounded-[20px] border-2 border-gray-600 bg-dark-gray shadow-xl overflow-hidden"
                    style={{ width: 222, aspectRatio: '9 / 19.5', left: 0, top: 498 }}
                  >
                    <Image src="/user-flow-phone-8.png" alt="Get Sh!t Done dark mode to do list" fill sizes="444px" quality={95} className="object-cover object-top" />
                  </div>
                </motion.div>
                {/* Column 3 container — odd */}
                <motion.div className="absolute w-[222px] h-[979px]" style={{ left: 'calc(8% + 484px)', top: '5%', zIndex: 4, rotate: -6.5, x: oddColumnX, y: oddY }}>
                  <div
                    className="absolute rounded-[20px] border-2 border-gray-600 bg-dark-gray shadow-xl overflow-hidden"
                    style={{ width: 222, aspectRatio: '9 / 19.5', left: 0, top: 0 }}
                  >
                    <Image src="/user-flow-phone-3.png" alt="Get Sh!t Done projects list view" fill sizes="444px" quality={95} className="object-cover object-top" />
                  </div>
                  <div
                    className="absolute rounded-[20px] border-2 border-gray-600 bg-dark-gray shadow-xl overflow-hidden"
                    style={{ width: 222, aspectRatio: '9 / 19.5', left: 0, top: 498 }}
                  >
                    <Image src="/user-flow-phone-9.png" alt="Get Sh!t Done dark mode projects" fill sizes="444px" quality={95} className="object-cover object-top" />
                  </div>
                </motion.div>
                {/* Column 4 container — even */}
                <motion.div className="absolute w-[222px] h-[979px]" style={{ left: 'calc(8% + 726px)', top: '5%', zIndex: 3, rotate: -6.5, x: evenColumnX, y: evenY }}>
                  <div
                    className="absolute rounded-[20px] border-2 border-gray-600 bg-dark-gray shadow-xl overflow-hidden"
                    style={{ width: 222, aspectRatio: '9 / 19.5', left: 0, top: 0 }}
                  >
                    <Image src="/user-flow-phone-4.png" alt="Get Sh!t Done new task screen" fill sizes="444px" quality={95} className="object-cover object-top" />
                  </div>
                  <div
                    className="absolute rounded-[20px] border-2 border-gray-600 bg-dark-gray shadow-xl overflow-hidden"
                    style={{ width: 222, aspectRatio: '9 / 19.5', left: 0, top: 498 }}
                  >
                    <Image src="/user-flow-phone-10.png" alt="Get Sh!t Done dark mode new task" fill sizes="444px" quality={95} className="object-cover object-top" />
                  </div>
                </motion.div>
                {/* Column 5 container — odd */}
                <motion.div className="absolute w-[222px] h-[979px]" style={{ left: 'calc(8% + 968px)', top: '5%', zIndex: 2, rotate: -6.5, x: oddColumnX, y: oddY }}>
                  <div
                    className="absolute rounded-[20px] border-2 border-gray-600 bg-dark-gray shadow-xl overflow-hidden"
                    style={{ width: 222, aspectRatio: '9 / 19.5', left: 0, top: 0 }}
                  >
                    <Image src="/user-flow-phone-5.png" alt="Get Sh!t Done new task with due date calendar" fill sizes="444px" quality={95} className="object-cover object-top" />
                  </div>
                  <div
                    className="absolute rounded-[20px] border-2 border-gray-600 bg-dark-gray shadow-xl overflow-hidden"
                    style={{ width: 222, aspectRatio: '9 / 19.5', left: 0, top: 498 }}
                  >
                    <Image src="/user-flow-phone-11.png" alt="Get Sh!t Done dark mode schedule" fill sizes="444px" quality={95} className="object-cover object-top" />
                  </div>
                </motion.div>
                {/* Column 6 container — even */}
                <motion.div className="absolute w-[222px] h-[979px]" style={{ left: 'calc(8% + 1210px)', top: '5%', zIndex: 1, rotate: -6.5, x: evenColumnX, y: evenY }}>
                  <div
                    className="absolute rounded-[20px] border-2 border-gray-600 bg-dark-gray shadow-xl overflow-hidden"
                    style={{ width: 222, aspectRatio: '9 / 19.5', left: 0, top: 0 }}
                  >
                    <Image src="/user-flow-phone-6.png" alt="Get Sh!t Done schedule view" fill sizes="444px" quality={95} className="object-cover object-top" />
                  </div>
                  <div
                    className="absolute rounded-[20px] border-2 border-gray-600 bg-dark-gray shadow-xl overflow-hidden"
                    style={{ width: 222, aspectRatio: '9 / 19.5', left: 0, top: 498 }}
                  >
                    <Image src="/user-flow-phone-12.png" alt="Get Sh!t Done dark mode new task" fill sizes="444px" quality={95} className="object-cover object-top" />
                  </div>
                </motion.div>
                {/* Column 7 container — odd: New Project (light + dark) */}
                <motion.div className="absolute w-[222px] h-[979px]" style={{ left: 'calc(8% + 1452px)', top: '5%', zIndex: 0, rotate: -6.5, x: oddColumnX, y: oddY }}>
                  <div
                    className="absolute rounded-[20px] border-2 border-gray-600 bg-dark-gray shadow-xl overflow-hidden"
                    style={{ width: 222, aspectRatio: '9 / 19.5', left: 0, top: 0 }}
                  >
                    <Image src="/user-flow-new-project-top.png" alt="Get Sh!t Done New Project screen (light)" fill sizes="444px" quality={95} className="object-cover object-top" />
                  </div>
                  <div
                    className="absolute rounded-[20px] border-2 border-gray-600 bg-dark-gray shadow-xl overflow-hidden"
                    style={{ width: 222, aspectRatio: '9 / 19.5', left: 0, top: 498 }}
                  >
                    <Image src="/user-flow-new-project-bottom.png" alt="Get Sh!t Done New Project screen (dark)" fill sizes="444px" quality={95} className="object-cover object-top" />
                  </div>
                </motion.div>
                {/* Gradient overlay - fades bottom row into black */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'linear-gradient(to bottom, transparent 0%, transparent 40%, rgba(0, 0, 0, 0.3) 60%, rgba(0, 0, 0, 0.7) 80%, rgba(0, 0, 0, 1) 100%)',
                  }}
                />
                </div>
              </div>
            </div>
          ) : item.title === 'Toro TMS' ? (
            <QuoteCarousel quotes={toroQuotes} />
          ) : item.title === 'Procore Construction Network' ? (
            <DeviceStackHero scrollTargetRef={procoreArticleRef} />
          ) : (
            <ScrollScaleImage
              src={'image' in item && item.image ? item.image : PCN_IMAGE}
              alt={'imageAlt' in item && item.imageAlt ? item.imageAlt : 'Project screenshot'}
              imageCover={'imageCover' in item ? !!item.imageCover : undefined}
            />
          )}

        </motion.article>
      ))}
    </section>
  )
}
