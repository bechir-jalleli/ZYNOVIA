import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'À propos de Zynovia Academy | Notre Mission',
  description:
    'Découvrez Zynovia Academy : l\'histoire de Zynovia, nos valeurs pédagogiques et notre équipe d\'experts passionnés par l\'Intelligence Artificielle (IA).',
  keywords: [
    'Zynovia',
    'Zynovia Academy',
    'À propos de Zynovia',
    'Histoire Zynovia',
    'Mission Zynovia Academy',
    'Équipe Zynovia',
    'Zynovia IA'
  ],
  openGraph: {
    title: 'À propos de Zynovia Academy | Notre Mission',
    description:
      'Découvrez Zynovia Academy : notre mission, nos valeurs et notre approche pédagogique pour préparer les jeunes avec l\'IA.',
    url: 'https://www.zynovia-academy.com/a-propos',
    siteName: 'Zynovia Academy',
    images: [
      {
        url: '/images/banner/image.png',
        width: 1200,
        height: 630,
        alt: 'Zynovia Academy — Académie IA pour Jeunes',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.zynovia-academy.com/a-propos',
  },
}

export default function AProposPage() {
  const aboutPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    '@id': 'https://www.zynovia-academy.com/a-propos/#webpage',
    'url': 'https://www.zynovia-academy.com/a-propos',
    'name': 'À propos de Zynovia',
    'description':
      'Page de présentation de Zynovia : mission, valeurs, et approche pédagogique.',
    'isPartOf': { '@id': 'https://www.zynovia-academy.com/#website' },
    'about': { '@id': 'https://www.zynovia-academy.com/#organization' },
    'breadcrumb': {
      '@type': 'BreadcrumbList',
      'itemListElement': [
        {
          '@type': 'ListItem',
          'position': 1,
          'name': 'Accueil',
          'item': 'https://www.zynovia-academy.com',
        },
        {
          '@type': 'ListItem',
          'position': 2,
          'name': 'À propos de Zynovia',
          'item': 'https://www.zynovia-academy.com/a-propos',
        },
      ],
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageJsonLd) }}
      />
      <AboutZynoviaContent />
    </>
  )
}

function AboutZynoviaContent() {
  return (
    <main className="bg-white dark:bg-darkmode">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-28 bg-gradient-to-b from-secondary/40 via-secondary/10 to-transparent dark:from-slate-950 dark:to-slate-900">
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-primary shadow-sm ring-1 ring-white/80 backdrop-blur dark:bg-slate-900/80 dark:text-cyan-300 dark:ring-white/10 mb-6">
            <span className="h-2 w-2 rounded-full bg-gradient-to-br from-[#00C3D9] via-[#0091E6] to-[#0067E0]" />
            Notre histoire
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-[#0A004B] dark:text-white mb-6">
            Qu&apos;est-ce que{' '}
            <span className="text-gradient">Zynovia</span>&nbsp;?
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Zynovia est une académie spécialisée dans la formation en Intelligence Artificielle pour les jeunes de 12 à 18 ans.
            Notre ambition : rendre l&apos;Intelligence Artificielle accessible, engageante et utile pour l&apos;avenir.
          </p>
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            {/* What is Zynovia */}
            <div className="space-y-5">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0A004B] dark:text-white">
                Zynovia en bref
              </h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Fondée en 2026, Zynovia a été créée avec une conviction simple : les jeunes d&apos;aujourd&apos;hui
                ont besoin de comprendre et de maîtriser l&apos;Intelligence Artificielle pour s&apos;épanouir
                dans le monde de demain.
              </p>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Notre approche est résolument pratique. Les élèves qui rejoignent Zynovia ne
                suivent pas de simples cours théoriques — ils construisent de vrais projets,
                explorent des cas d&apos;usage concrets et développent une véritable culture numérique.
              </p>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Aujourd&apos;hui, Zynovia accompagne plus de 200 élèves au travers de ses programmes
                annuels et de ses bootcamps intensifs, en partenariat avec plusieurs établissements scolaires.
              </p>
            </div>

            {/* Mission */}
            <div className="rounded-3xl bg-gradient-to-br from-[#27397F]/5 to-[#3FA9DF]/10 dark:from-slate-800/50 dark:to-slate-900/50 p-8 ring-1 ring-[#3FA9DF]/20 dark:ring-slate-700/50">
              <h2 className="text-xl font-bold text-[#0A004B] dark:text-white mb-4">
                Notre mission
              </h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                Préparer la prochaine génération à un monde transformé par l&apos;IA,
                en leur donnant les outils intellectuels, techniques et créatifs pour
                y prospérer — et non le subir.
              </p>
              <ul className="space-y-3">
                {[
                  'Former à l\'IA de manière progressive et engageante',
                  'Développer la pensée algorithmique et la créativité',
                  'Connecter les jeunes aux réalités du marché professionnel',
                  'Collaborer avec les établissements scolaires et les familles',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gradient-to-br from-[#00C3D9] to-[#0067E0]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-[#F6F8FB] dark:bg-slate-900/50">
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0A004B] dark:text-white mb-4">
              Les valeurs de Zynovia
            </h2>
            <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Ces valeurs guident chaque programme, chaque cours et chaque interaction avec nos élèves et leurs familles.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: 'Excellence',
                description: 'Des contenus de qualité, pensés avec des experts, régulièrement mis à jour.',
                emoji: '🎯',
              },
              {
                title: 'Accessibilité',
                description: 'Aucun prérequis technique exigé. Tout jeune motivé a sa place chez Zynovia.',
                emoji: '🚪',
              },
              {
                title: 'Pratique',
                description: 'Chaque concept est illustré par un projet concret, ancré dans le monde réel.',
                emoji: '🛠️',
              },
              {
                title: 'Bienveillance',
                description: 'Un environnement d\'apprentissage sûr, encourageant et stimulant.',
                emoji: '🤝',
              },
              {
                title: 'Innovation',
                description: 'Nous adaptons constamment nos méthodes aux évolutions rapides de l\'IA.',
                emoji: '💡',
              },
              {
                title: 'Impact',
                description: 'Former des jeunes qui créent des solutions, pas seulement des consommateurs de technologie.',
                emoji: '🌍',
              },
            ].map((value) => (
              <div
                key={value.title}
                className="rounded-2xl bg-white dark:bg-slate-900/80 p-6 shadow-sm ring-1 ring-slate-200/60 dark:ring-slate-700/50"
              >
                <div className="text-3xl mb-3">{value.emoji}</div>
                <h3 className="font-semibold text-[#0A004B] dark:text-white mb-2">{value.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Numbers */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0A004B] dark:text-white mb-12">
            Zynovia en chiffres
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { value: '2026', label: 'Année de fondation' },
              { value: '+20000', label: 'Élèves accompagnés' },
              { value: '+6', label: 'Établissements partenaires' },
              { value: '12–18', label: 'Tranche d\'âge (ans)' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl bg-gradient-to-br from-[#27397F]/5 to-[#3FA9DF]/10 dark:from-slate-800/50 dark:to-slate-900/50 p-6 ring-1 ring-[#3FA9DF]/20 dark:ring-slate-700/50"
              >
                <p className="text-3xl sm:text-4xl font-bold text-gradient mb-2">{stat.value}</p>
                <p className="text-sm text-slate-600 dark:text-slate-300">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Internal Links / CTA */}
      <section className="py-16 bg-gradient-soft">
        <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0A004B] dark:text-white mb-4">
            Explorer Zynovia
          </h2>
          <p className="text-slate-600 dark:text-slate-300 mb-10 max-w-xl mx-auto">
            Découvrez nos programmes, rencontrez nos formateurs ou contactez-nous pour
            prendre rendez-vous.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/programmes"
              className="w-full sm:w-auto px-8 py-3.5 text-sm font-semibold btn-primary btn-hover rounded-[10px] shadow-md whitespace-nowrap text-center"
            >
              Voir nos programmes
            </Link>
            <Link
              href="/vision"
              className="w-full sm:w-auto px-8 py-3.5 text-sm font-semibold btn-outline btn-hover rounded-[10px] whitespace-nowrap text-center"
            >
              Notre vision pédagogique
            </Link>
            <Link
              href="/contact"
              className="w-full sm:w-auto px-8 py-3.5 text-sm font-semibold btn-outline btn-hover rounded-[10px] whitespace-nowrap text-center"
            >
              Nous contacter
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
