'use client'

import React from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'

const donutDataFuture = [
  { label: 'Métiers de demain', value: 85 },
  { label: 'Métiers actuels', value: 15 },
]

const DonutChartFutureJobs: React.FC = () => {
  const total = donutDataFuture.reduce((sum, item) => sum + item.value, 0)

  return (
    <div className='rounded-2xl bg-white shadow-sm p-6 dark:bg-slate-900'>
      <div className='mb-4 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between'>
        <div>
          <p className='text-xs font-semibold uppercase tracking-[0.18em] text-primary'>
            Futur des métiers
          </p>
          <h3 className='text-lg font-semibold text-[#0A004B]'>
            Part des métiers encore à inventer
          </h3>
        </div>
        <p className='text-xs text-slate-500'>
          85&nbsp;% des métiers de demain n’existent pas encore.
        </p>
      </div>

      <div className='grid gap-6 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] md:items-center'>
        <div className='h-64 w-full sm:h-72'>
          <ResponsiveContainer width='100%' height='100%'>  
            <PieChart>
              <defs>
                <linearGradient id='futureDonutGradient' x1='0%' y1='0%' x2='100%' y2='100%'>
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
              />
              <Pie
                data={donutDataFuture}
                dataKey='value'
                nameKey='label'
                cx='50%'
                cy='50%'
                innerRadius='68%'
                outerRadius='90%'
                paddingAngle={4}
                cornerRadius={18}
              >
                {donutDataFuture.map((entry) => (
                  <Cell
                    key={entry.label}
                    fill={
                      entry.value === 85
                        ? 'url(#futureDonutGradient)'
                        : '#0A004B'
                    }
                    stroke='rgba(15,23,42,0.15)'
                    strokeWidth={1}
                  />
                ))}
              </Pie>
              <text
                x='50%'
                y='50%'
                textAnchor='middle'
                dominantBaseline='middle'
                className='text-3xl font-semibold fill-[#0A004B] dark:fill-white'
              >
                85%
              </text>
              <text
                x='50%'
                y='50%'
                dy={24}
                textAnchor='middle'
                dominantBaseline='hanging'
                className='text-xs fill-slate-500 dark:fill-slate-200'
              >
                des métiers de demain
              </text>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className='space-y-3'>
          {donutDataFuture.map((segment) => {
            const percentage = total ? Math.round((segment.value / total) * 100) : 0
            const isFuture = segment.value === 85
            return (
              <div
                key={segment.label}
                className='flex items-center justify-between rounded-2xl bg-slate-50 px-3 py-2 text-xs'
              >
                <div className='flex items-center gap-2'>
                  <span
                    className='h-2.5 w-2.5 rounded-full'
                    style={{
                      background:
                        segment.value === 85
                          ? 'linear-gradient(135deg,#00C3D9,#0091E6,#0067E0)'
                          : '#0A004B',
                    }}
                  />
                  <span className='font-medium text-[#0A004B]'>{segment.label}</span>
                </div>
                <span className='text-slate-500'>
                  {segment.value}% • {percentage}%
                  {isFuture ? ' des métiers' : ''}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default DonutChartFutureJobs


