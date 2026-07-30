import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Politique de confidentialité | Zynovia Academy',
  description: 'Politique de confidentialité de Zynovia Academy concernant la protection de vos données personnelles.',
}

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-white dark:bg-darkmode min-h-screen pt-32 pb-24">
      <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-[#0091E6] mb-6">
          Politique de confidentialité – ZYNOVIA Academy
        </h1>

        <div className=" text-slate-800 dark:text-slate-200 text-base leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-[#0A004B] dark:text-white mb-1">
              1. Responsable du traitement
            </h2>
            <p className="mb-1">
              ZYNOVIA Academy s&apos;engage à protéger les données personnelles de ses utilisateurs et à respecter leur vie privée.
            </p>
            <p>
              Les informations collectées via notre site internet, nos formulaires Meta (Facebook et Instagram) ou tout autre canal de communication sont utilisées uniquement dans le cadre de nos activités de formation.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#0A004B] dark:text-white mb-1">
              2. Données collectées
            </h2>
            <p className="mb-1">Nous pouvons être amenés à collecter les informations suivantes :</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Nom et prénom</li>
              <li>Numéro de téléphone</li>
              <li>Adresse e-mail</li>
              <li>Âge de l&apos;enfant</li>
              <li>Toute information communiquée volontairement via nos formulaires ou nos échanges.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#0A004B] dark:text-white mb-1">
              3. Finalité de la collecte
            </h2>
            <p className="mb-1">Les données sont utilisées afin de :</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>répondre à vos demandes d&apos;information ;</li>
              <li>vous contacter concernant nos formations et bootcamps ;</li>
              <li>vous accompagner dans le processus d&apos;inscription ;</li>
              <li>améliorer la qualité de nos services.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#0A004B] dark:text-white mb-1">
              4. Confidentialité
            </h2>
            <p className="mb-1">
              Les informations recueillies sont strictement confidentielles.
            </p>
            <p>
              Elles ne sont ni vendues, ni louées, ni transmises à des tiers à des fins commerciales.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#0A004B] dark:text-white mb-1">
              5. Durée de conservation
            </h2>
            <p>
              Les données sont conservées uniquement pendant la durée nécessaire au traitement de votre demande ou conformément aux obligations légales applicables.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#0A004B] dark:text-white mb-1">
              6. Vos droits
            </h2>
            <p className="mb-1">
              Conformément à la réglementation applicable, vous pouvez à tout moment demander :
            </p>
            <ul className="list-disc pl-5 space-y-1 mb-2">
              <li>l&apos;accès à vos données ;</li>
              <li>leur rectification ;</li>
              <li>leur suppression ;</li>
              <li>la limitation de leur traitement.</li>
            </ul>
            <p>
              Pour exercer ces droits, vous pouvez nous contacter à :<br />
              <a href="mailto:contact@zynovia-academy.com" className="text-[#0091E6] hover:underline">
                contact@zynovia-academy.com
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#0A004B] dark:text-white mb-1">
              7. Contact
            </h2>
            <p className="mb-1">
              Pour toute question concernant cette politique de confidentialité, vous pouvez nous écrire à :
            </p>
            <p className="mb-2">
              <a href="mailto:contact@zynovia-academy.com" className="text-[#0091E6] hover:underline">
                contact@zynovia-academy.com
              </a>
            </p>
            <p>
              ou via notre site :<br />
              <a href="https://zynovia-academy.com" className="text-[#0091E6] hover:underline" target="_blank" rel="noopener noreferrer">
                https://zynovia-academy.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}
