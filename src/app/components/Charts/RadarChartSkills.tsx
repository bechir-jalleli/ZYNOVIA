'use client'

import React from 'react'
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'

const radarDataSkills = [
  { skill: 'IA & Algorithmes', value: 92 },
  { skill: 'Pensée Logique', value: 88 },
  { skill: 'Culture Numérique', value: 85 },
  { skill: 'Collaboration', value: 90 },
  { skill: 'Communication', value: 84 },
  { skill: 'Leadership', value: 80 },
  { skill: 'Esprit Critique', value: 89 },
  { skill: 'Créativité', value: 93 },
]

const RadarChartSkills: React.FC = () => {
  return (
    <div className='rounded-2xl bg-white shadow-sm p-6 dark:bg-slate-900'>
      <div className='mb-4 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between'>
        <div>
          <p className='text-xs font-semibold uppercase tracking-[0.18em] text-primary'>
            Compétences clés
          </p>
          <h3 className='text-lg font-semibold text-[#0A004B] dark:text-white'>
            Compétences développées chez l&apos;élève
          </h3>
        </div>
        <p className='text-xs text-slate-500 dark:text-slate-300'>
          Un profil équilibré mêlant excellence scientifique et soft skills.
        </p>
      </div>

      <div style={{ width: '100%', height: 400, minWidth: 0 }}>
        <ResponsiveContainer width='100%' height='100%'>
          <RadarChart
            data={radarDataSkills}
            outerRadius='70%'
            margin={{ top: 16, right: 32, bottom: 16, left: 32 }}
          >
            <defs>
              <linearGradient id='skillsRadarGradient' x1='0%' y1='0%' x2='100%' y2='100%'>
                <stop offset='0%' stopColor='#00C3D9' />
                <stop offset='50%' stopColor='#0091E6' />
                <stop offset='100%' stopColor='#0067E0' />
              </linearGradient>
            </defs>
            <PolarGrid
              gridType='polygon'
              radialLines={false}
              stroke='rgba(148,163,184,0.4)'
              polarRadius={[10, 30, 50, 70, 90]}
            />
            <PolarAngleAxis
              dataKey='skill'
              tickLine={false}
              stroke='transParent'
              tick={{
                fill: '#64748B',
                fontSize: 11,
              }}
            />
            <Tooltip
              contentStyle={{
                borderRadius: 16,
                border: '1px solid rgba(148,163,184,0.25)',
                background:
                  'linear-gradient(135deg, rgba(10,0,75,0.98), rgba(15,23,42,0.98))',
                color: '#E5E7EB',
              }}
              labelStyle={{ fontSize: 12, color: '#CBD5F5' }}
              formatter={(value: number) => [`${value} / 100`, 'Niveau']}
            />
            <Radar
              name='Compétences'
              dataKey='value'
              stroke='url(#skillsRadarGradient)'
              strokeWidth={2.5}
              fill='url(#skillsRadarGradient)'
              fillOpacity={0.35}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default RadarChartSkills


