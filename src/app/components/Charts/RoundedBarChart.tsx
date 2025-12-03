'use client'

import React from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts'

type RoundedBarChartProps = {
  data: { label: string; value: number }[]
  title?: string
}

const RoundedBarChart: React.FC<RoundedBarChartProps> = ({
  data,
  title = 'Sessions by Segment',
}) => {
  return (
    <div className='rounded-3xl bg-white/80 p-6 shadow-lg shadow-sky-500/10 backdrop-blur-md dark:bg-darklight/80'>
      <h3 className='mb-4 text-sm font-medium uppercase tracking-[0.15em] text-lightgrey'>
        {title}
      </h3>
      <div className='h-56'>
        <ResponsiveContainer width='100%' height='100%'>
          <BarChart data={data} barCategoryGap={24}>
            <defs>
              <linearGradient
                id='barGradient'
                x1='0%'
                y1='0%'
                x2='0%'
                y2='100%'>
                <stop offset='0%' stopColor='#00C3D9' />
                <stop offset='50%' stopColor='#0091E6' />
                <stop offset='100%' stopColor='#0067E0' />
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
              cursor={{ fill: 'rgba(148,163,184,0.12)' }}
              contentStyle={{
                borderRadius: 16,
                border: '1px solid rgba(148,163,184,0.25)',
                background:
                  'linear-gradient(135deg, rgba(10,0,75,0.98), rgba(15,23,42,0.98))',
                color: '#e5e7eb',
              }}
            />
            <Bar
              dataKey='value'
              radius={[14, 14, 12, 12]}
              fill='url(#barGradient)'
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default RoundedBarChart


