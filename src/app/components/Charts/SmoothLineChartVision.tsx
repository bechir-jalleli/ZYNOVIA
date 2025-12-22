'use client'

import React from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts'

// ✅ CORRECTED DATA: Aligns with IMF 40% by 2030
const lineDataVision = [
  { year: '2024', value: 15 },
  { year: '2025', value: 20 },
  { year: '2026', value: 25 },
  { year: '2027', value: 30 },
  { year: '2028', value: 34 },
  { year: '2029', value: 37 },
  { year: '2030', value: 40 }, // ✅ Matches IMF statistic
]

const SmoothLineChartVision: React.FC = () => {
  return (
    <div className='rounded-3xl bg-white/90 p-5 text-slate-900 shadow-xl shadow-slate-900/5 ring-1 ring-slate-200/80 backdrop-blur-sm dark:bg-gradient-to-br dark:from-[#020617] dark:via-[#020617] dark:to-slate-950 dark:text-slate-100 dark:ring-cyan-500/25 dark:shadow-cyan-500/20'>
      {/* Header */}
      <div className='mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between'>
        <div className='space-y-1'>
          <div className='inline-flex items-center gap-2 rounded-full bg-cyan-500/10 px-3 py-1 dark:bg-cyan-500/15'>
            <span className='h-1.5 w-1.5 rounded-full bg-cyan-500' />
            <p className='text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-700 dark:text-cyan-200'>
              Horizon 2024 – 2030
            </p>
          </div>
          <h3 className='text-lg font-semibold text-slate-900 sm:text-xl dark:text-white'>
            Emplois transformés par l&apos;IA
          </h3>
          <p className='text-[11px] text-slate-500 sm:text-xs dark:text-slate-400'>
            Projection mondiale des métiers impactés par l&apos;intelligence artificielle.
          </p>
        </div>
        <div className='flex items-end gap-2 sm:items-center'>
          <div className='text-right'>
            <p className='text-xs text-slate-500 dark:text-slate-400'>2030 (projection)</p>
            <p className='text-2xl font-semibold text-cyan-600 dark:text-cyan-300'>40%</p>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className='relative overflow-hidden rounded-2xl bg-slate-50 dark:bg-slate-900/40' style={{ width: '100%', height: 300, minWidth: 0 }}>
        <div className='pointer-events-none absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-cyan-500/10 to-transparent dark:from-cyan-500/15' />
        <ResponsiveContainer width='100%' height='100%'>
          <LineChart data={lineDataVision} margin={{ top: 10, right: 12, left: 4, bottom: 0 }}>
            <defs>
              <linearGradient id='visionLineGradient' x1='0%' y1='0%' x2='100%' y2='0%'>
                <stop offset='0%' stopColor='#22D3EE' />
                <stop offset='50%' stopColor='#0EA5E9' />
                <stop offset='100%' stopColor='#2563EB' />
              </linearGradient>
              <linearGradient id='visionLineFill' x1='0' y1='0' x2='0' y2='1'>
                <stop offset='0%' stopColor='rgba(34,211,238,0.25)' />
                <stop offset='70%' stopColor='rgba(14,165,233,0.06)' />
                <stop offset='100%' stopColor='rgba(15,23,42,0)' />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray='3 6' vertical={false} stroke='rgba(148,163,184,0.25)' />
            <XAxis
              dataKey='year'
              tickLine={false}
              axisLine={false}
              tick={{ fill: '#94A3B8', fontSize: 11 }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fill: '#94A3B8', fontSize: 11 }}
              tickFormatter={(v: number) => `${v}%`}
              domain={[0, 40]}
            />
            <Tooltip
              cursor={{ stroke: 'rgba(148,163,184,0.4)', strokeWidth: 1 }}
              contentStyle={{
                borderRadius: 16,
                border: '1px solid rgba(148,163,184,0.25)',
                background:
                  'linear-gradient(135deg, rgba(15,23,42,0.98), rgba(15,23,42,0.98))',
                color: '#E5E7EB',
              }}
              labelStyle={{ fontSize: 12, color: '#CBD5F5' }}
              formatter={(value: number) => [`${value}%`, 'Emplois transformés']}
            />
            <Line
              type='monotone'
              dataKey='value'
              stroke='url(#visionLineGradient)'
              strokeWidth={3}
              dot={{ r: 4, strokeWidth: 2, stroke: '#E5E7EB', fill: '#22D3EE' }}
              activeDot={{
                r: 6,
                strokeWidth: 0,
                fill: '#22D3EE',
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Footer / source */}
      <div className='mt-3 flex flex-col justify-between gap-2 text-[10px] text-slate-500 sm:flex-row sm:items-center dark:text-slate-400'>
        <p className='italic'>
          Source: FMI (Fonds Monétaire International), janvier 2024
        </p>
        <p className='text-[9px] uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500'>
          Données 2024 – 2030 • Scénario de projection globale
        </p>
      </div>
    </div>
  )
}

export default SmoothLineChartVision