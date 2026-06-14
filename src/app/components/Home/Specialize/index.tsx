'use client'

import { motion } from 'framer-motion'
import { Sparkles, Rocket, Brain, Briefcase } from 'lucide-react'

const fadeInUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
}

const staggerContainer = {
  initial: {},
  whileInView: {
    transition: {
      staggerChildren: 0.12,
    },
  },
}

const cardVariant = {
  initial: { opacity: 0, y: 25, scale: 0.96 },
  whileInView: { opacity: 1, y: 0, scale: 1 },
  transition: { duration: 0.5, ease: 'easeOut' },
}

const Specialize = () => {
  const valeurAjoutee = [
    {
      text: 'Culture IA dès le collège & lycée',
      icon: Brain,
    },
    {
      text: 'Projets pratiques & engageants',
      icon: Sparkles,
    },
    {
      text: 'Orientation vers les métiers du futur',
      icon: Rocket,
    },
    {
      text: 'Stages & compétitions',
      icon: Briefcase,
    },
  ]

  return (
    <section
      id="expertise"
      className="scroll-mt-12 py-24 lg:py-32 bg-gradient-to-b from-secondary/10 via-secondary/5 to-transparent dark:from-slate-950 dark:via-slate-900 dark:to-slate-950"
    >
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, amount: 0.25 }}
        >
          {/* HEADER */}
          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="text-center mb-14 lg:mb-20"
          >
           

<h2 className="mt-3 text-3xl sm:text-4xl font-semibold text-center">
  Notre {" "}
  <span className="text-gradient">
     valeur ajoutée 
  </span>
</h2>

<p className="mt-4 text-slate-600 dark:text-slate-300 max-w-2xl mx-auto text-center text-base sm:text-lg leading-relaxed">
  Une approche moderne de l’apprentissage, orientée innovation, pratique et avenir.
</p>
          </motion.div>

          {/* GRID */}
          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 gap-7 sm:gap-10"
          >
            {valeurAjoutee.map((item, index) => {
              const Icon = item.icon

              return (
                <motion.div
                  key={item.text}
                  variants={cardVariant}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group relative overflow-hidden rounded-3xl
                  bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl
                  border border-slate-200/60 dark:border-slate-700/50
                  shadow-[0_10px_40px_rgba(0,0,0,0.08)]
                  hover:shadow-[0_25px_70px_rgba(0,0,0,0.15)]
                  transition-all duration-300 p-8 sm:p-10"
                >
                  {/* glow background */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500">
                    <div className="absolute -top-10 -right-10 h-40 w-40 bg-[#3FA9DF]/20 blur-3xl rounded-full" />
                    <div className="absolute -bottom-10 -left-10 h-40 w-40 bg-[#27397F]/20 blur-3xl rounded-full" />
                  </div>

                  <div className="relative flex flex-col items-center text-center gap-6">
                    {/* icon */}
                    <div
                      className="flex h-20 w-20 items-center justify-center rounded-2xl
                      bg-gradient-to-br from-[#27397F] to-[#3FA9DF]
                      text-white shadow-lg shadow-[#27397F]/30
                      group-hover:scale-110 transition"
                    >
                      <Icon className="h-9 w-9" />
                    </div>

                    {/* number */}
                    <div className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                      Étape {String(index + 1).padStart(2, '0')}
                    </div>

                    {/* text */}
                    <p className="text-lg sm:text-xl lg:text-2xl font-semibold text-slate-800 dark:text-slate-100 leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Specialize   