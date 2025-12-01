import RadialProgressChart from '../components/Charts/RadialProgressChart'
import SmoothLineChart from '../components/Charts/SmoothLineChart'
import RoundedBarChart from '../components/Charts/RoundedBarChart'
import DonutChart from '../components/Charts/DonutChart'

const lineData = [
  { label: 'Mon', value: 34 },
  { label: 'Tue', value: 48 },
  { label: 'Wed', value: 42 },
  { label: 'Thu', value: 64 },
  { label: 'Fri', value: 58 },
  { label: 'Sat', value: 72 },
  { label: 'Sun', value: 61 },
]

const barData = [
  { label: 'Acute', value: 42 },
  { label: 'Chronic', value: 28 },
  { label: 'Post-op', value: 34 },
  { label: 'Telehealth', value: 18 },
]

const donutData = [
  { label: 'MRI', value: 32 },
  { label: 'CT', value: 24 },
  { label: 'Ultrasound', value: 18 },
  { label: 'X-Ray', value: 26 },
]

export default function ChartsPage() {
  return (
    <main className='bg-secondary/40 dark:bg-darkmode'>
      <section className='container pt-24 pb-16'>
        <div className='mb-12 grid gap-6 md:grid-cols-[minmax(0,2fr)_minmax(0,1.2fr)] md:items-center'>
          <div>
            <p className='mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-primary'>
              Realtime Clinical Analytics
            </p>
            <h1 className='mb-4'>
              Signal-rich charts for modern care dashboards
            </h1>
            <p className='max-w-xl text-base  text-lightgrey'>
              Beautiful, responsive Recharts components tuned for medical and
              tech dashboards. Plug them into your Next.js pages and feed them
              with live patient, imaging or operational data streams.
            </p>
          </div>
          <RadialProgressChart value={78} label='Care pathway completion' />
        </div>

        <div className='grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,1.3fr)]'>
          <SmoothLineChart data={lineData} title='Weekly engagement index' />
          <RoundedBarChart data={barData} title='Cases by cohort' />
        </div>

        <div className='mt-8'>
          <DonutChart data={donutData} title='Imaging modality mix' />
        </div>
      </section>
    </main>
  )
}


