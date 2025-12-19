'use client'

import React from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'

// Data based on IMF, WEF, McKinsey (2024) projections for 2030
// IMF: 40% of global jobs will be affected by AI
// WEF: Significant transformation across multiple sectors
// McKinsey: 15-30% of tasks automatable, with 40% of jobs having high exposure
const donutDataAI = [
  { label: 'Métiers impactés par l\'IA', value: 40, number: '1.6 milliards' },
  { label: 'Métiers peu impactés', value: 60, number: '2.4 milliards' },
]

const DonutChartFutureJobs: React.FC = () => {
  return (
    <div className='rounded-2xl bg-white shadow-sm p-6 dark:bg-slate-900'>
      <div className='mb-4 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between'>
        <div>
          <div className='inline-flex items-center gap-2 rounded-full bg-cyan-500/10 px-3 py-1 mb-2 dark:bg-cyan-500/15'>
            <span className='h-1.5 w-1.5 rounded-full bg-cyan-500' />
            <p className='text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-700 dark:text-cyan-200'>
              Horizon 2024 – 2030
            </p>
          </div>
          <h3 className='text-lg font-semibold text-[#0A004B] dark:text-white'>
            Projection mondiale des métiers impactés par l&apos;intelligence artificielle
          </h3>
        </div>
        <p className='text-xs text-slate-500 dark:text-slate-400'>
          40% des emplois mondiaux seront affectés par l&apos;IA d&apos;ici 2030.
        </p>
      </div>

      <div className='grid gap-6 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] md:items-center'>
        <div className='h-80 w-full sm:h-96 md:h-[420px]'>
          <ResponsiveContainer width='100%' height='100%'>  
            <PieChart>
              <defs>
                <linearGradient id='aiDonutGradient' x1='0%' y1='0%' x2='100%' y2='100%'>
                  <stop offset='0%' stopColor='#00C3D9' />
                  <stop offset='50%' stopColor='#0091E6' />
                  <stop offset='100%' stopColor='#0067E0' />
                </linearGradient>
              </defs>
              <Tooltip
                contentStyle={{
                  borderRadius: 16,
                  border: '1px solid rgba(148,163,184,0.25)',
                  background:
                    'linear-gradient(135deg, rgba(10,0,75,0.98), rgba(15,23,42,0.98))',
                  color: '#E5E7EB',
                }}
                labelStyle={{ fontSize: 12, color: '#CBD5F5' }}
                formatter={(value: number, name: string, props: { payload: { number: string } }) => [
                  `${value}% • ${props.payload.number}`,
                  name
                ]}
              />
              <Pie
                data={donutDataAI}
                dataKey='value'
                nameKey='label'
                cx='50%'
                cy='50%'
                innerRadius='65%'
                outerRadius='88%'
                paddingAngle={4}
                cornerRadius={18}
                startAngle={90}
                endAngle={-270}
              >
                {donutDataAI.map((entry) => (
                  <Cell
                    key={entry.label}
                    fill={
                      entry.value === 40
                        ? 'url(#aiDonutGradient)'
                        : '#0A004B'
                    }
                    stroke='rgba(15,23,42,0.15)'
                    strokeWidth={1}
                  />
                ))}
              </Pie>
              <text
                x='50%'
                y='45%'
                textAnchor='middle'
                dominantBaseline='middle'
                className='text-4xl font-bold fill-[#0A004B] dark:fill-white'
              >
                40%
              </text>
              <text
                x='50%'
                y='52%'
                textAnchor='middle'
                dominantBaseline='hanging'
                className='text-sm font-semibold fill-[#0A004B] dark:fill-white'
              >
                des emplois
              </text>
              <text
                x='50%'
                y='58%'
                textAnchor='middle'
                dominantBaseline='hanging'
                className='text-xs fill-slate-500 dark:fill-slate-300'
              >
                impactés par l&apos;IA
              </text>
              <text
                x='50%'
                y='65%'
                textAnchor='middle'
                dominantBaseline='hanging'
                className='text-[10px] fill-slate-400 dark:fill-slate-400'
              >
                ~1.6 milliards
              </text>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className='space-y-3'>
          {donutDataAI.map((segment) => {
            const isImpacted = segment.value === 40
            return (
              <div
                key={segment.label}
                className='flex flex-col gap-1 rounded-2xl bg-slate-50 px-4 py-3 dark:bg-slate-800/50'
              >
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-2'>
                    <span
                      className='h-3 w-3 rounded-full'
                      style={{
                        background:
                          isImpacted
                            ? 'linear-gradient(135deg,#00C3D9,#0091E6,#0067E0)'
                            : '#0A004B',
                      }}
                    />
                    <span className='text-xs font-semibold text-[#0A004B] dark:text-white'>
                      {segment.label}
                    </span>
                  </div>
                  <span className='text-sm font-bold text-slate-700 dark:text-slate-200'>
                    {segment.value}%
                  </span>
                </div>
                <div className='pl-5'>
                  <span className='text-[10px] text-slate-500 dark:text-slate-400'>
                    {segment.number} d&apos;emplois
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Footer / source */}
      <div className='mt-4 flex flex-col justify-between gap-2 text-[10px] text-slate-500 sm:flex-row sm:items-center dark:text-slate-400'>
        <p className='italic'>
          Source: FMI (Fonds Monétaire International), WEF (Forum Économique Mondial), McKinsey (2024)
        </p>
        <p className='text-[9px] uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500'>
          Projection 2030 • Scénario global
        </p>
      </div>
    </div>
  )
}

export default DonutChartFutureJobs


