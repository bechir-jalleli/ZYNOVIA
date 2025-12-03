'use client'

import React from 'react'
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'

type DonutChartSegment = {
  label: string
  value: number
}

type DonutChartProps = {
  data: DonutChartSegment[]
  title?: string
}

const PALETTE = ['#00C3D9', '#0091E6', '#0067E0', '#0A004B']

const DonutChart: React.FC<DonutChartProps> = ({
  data,
  title = 'Modalities',
}) => {
  const total = data.reduce((sum, item) => sum + item.value, 0)

  return (
    <div className='rounded-3xl bg-white/80 p-6 shadow-lg shadow-sky-500/10 backdrop-blur-md dark:bg-darklight/80'>
      <h3 className='mb-4 text-sm font-medium uppercase tracking-[0.15em] text-lightgrey'>
        {title}
      </h3>
      <div className='grid gap-4 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] md:items-center'>
        <div className='h-56'>
          <ResponsiveContainer width='100%' height='100%'>
            <PieChart>
              <Tooltip
                contentStyle={{
                  borderRadius: 16,
                  border: '1px solid rgba(148,163,184,0.25)',
                  background:
                    'linear-gradient(135deg, rgba(10,0,75,0.98), rgba(15,23,42,0.98))',
                  color: '#e5e7eb',
                }}
              />
              <Pie
                data={data}
                dataKey='value'
                nameKey='label'
                cx='50%'
                cy='50%'
                innerRadius='65%'
                outerRadius='95%'
                paddingAngle={4}
                cornerRadius={16}>
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${entry.label}`}
                    fill={PALETTE[index % PALETTE.length]}
                    stroke='rgba(15,23,42,0.9)'
                    strokeWidth={1}
                  />
                ))}
              </Pie>
              <text
                x='50%'
                y='50%'
                textAnchor='middle'
                dominantBaseline='middle'
                className='fill-darkblue text-base font-medium dark:fill-white'>
                {total} pts
              </text>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className='space-y-3'>
          {data.map((segment, index) => {
            const percentage = total ? Math.round((segment.value / total) * 100) : 0
            return (
              <div
                key={segment.label}
                className='flex items-center justify-between rounded-2xl bg-slate-50/80 px-3 py-2 text-xs dark:bg-darkblue/60'>
                <div className='flex items-center gap-2'>
                  <span
                    className='h-2.5 w-2.5 rounded-full'
                    style={{ backgroundColor: PALETTE[index % PALETTE.length] }}
                  />
                  <span className='font-medium text-darkblue dark:text-white'>
                    {segment.label}
                  </span>
                </div>
                <span className='text-lightgrey'>
                  {segment.value} • {percentage}%
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default DonutChart


