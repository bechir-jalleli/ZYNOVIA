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

type SmoothLineChartProps = {
  data: { label: string; value: number }[]
  title?: string
}

const SmoothLineChart: React.FC<SmoothLineChartProps> = ({
  data,
  title = 'Activity Trend',
}) => {
  return (
    <div className='rounded-3xl bg-white/80 p-6 shadow-lg shadow-sky-500/10 backdrop-blur-md dark:bg-darklight/80'>
      <h3 className='mb-4 text-sm font-medium uppercase tracking-[0.15em] text-lightgrey'>
        {title}
      </h3>
      <div className='h-56'>
        <ResponsiveContainer width='100%' height='100%'>
          <LineChart data={data}>
            <defs>
              <linearGradient
                id='lineGradient'
                x1='0%'
                y1='0%'
                x2='100%'
                y2='0%'>
                <stop offset='0%' stopColor='#00C3D9' />
                <stop offset='50%' stopColor='#0091E6' />
                <stop offset='100%' stopColor='#0067E0' />
              </linearGradient>
              <linearGradient
                id='lineFill'
                x1='0'
                y1='0'
                x2='0'
                y2='1'>
                <stop offset='0%' stopColor='rgba(0,195,217,0.35)' />
                <stop offset='100%' stopColor='rgba(10,0,75,0)' />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray='3 6'
              vertical={false}
              stroke='rgba(15,23,42,0.08)'
            />
            <XAxis
              dataKey='label'
              tickLine={false}
              axisLine={false}
              tick={{ fill: 'var(--color-lightgrey)' }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fill: 'var(--color-lightgrey)' }}
            />
            <Tooltip
              cursor={{ stroke: 'rgba(148,163,184,0.4)', strokeWidth: 1 }}
              contentStyle={{
                borderRadius: 16,
                border: '1px solid rgba(148,163,184,0.25)',
                background:
                  'linear-gradient(135deg, rgba(10,0,75,0.98), rgba(15,23,42,0.98))',
                color: '#e5e7eb',
              }}
            />
            <Line
              type='monotone'
              dataKey='value'
              stroke='url(#lineGradient)'
              strokeWidth={3}
              dot={{ r: 4, strokeWidth: 2, stroke: '#0A004B', fill: '#00C3D9' }}
              activeDot={{
                r: 6,
                strokeWidth: 0,
                fill: '#00C3D9',
              }}
              fill='url(#lineFill)'
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default SmoothLineChart


