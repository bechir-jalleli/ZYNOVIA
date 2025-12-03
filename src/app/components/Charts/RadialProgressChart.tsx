'use client'

import React from 'react'
import {
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  ResponsiveContainer,
} from 'recharts'

type RadialProgressChartProps = {
  value: number
  label?: string
}

const RadialProgressChart: React.FC<RadialProgressChartProps> = ({
  value,
  label = 'Completion',
}) => {
  const clamped = Math.max(0, Math.min(100, value))
  const data = [{ name: label, value: clamped, fill: 'url(#radialGradient)' }]

  return (
    <div className='rounded-3xl bg-white/80 p-6 shadow-lg shadow-sky-500/10 backdrop-blur-md dark:bg-darklight/80'>
      <h3 className='mb-4 text-sm font-medium uppercase tracking-[0.15em] text-lightgrey'>
        {label}
      </h3>
      <div className='h-56'>
        <ResponsiveContainer width='100%' height='100%'>
          <RadialBarChart
            cx='50%'
            cy='50%'
            innerRadius='80%'
            outerRadius='100%'
            barSize={14}
            data={data}
            startAngle={225}
            endAngle={-45}>
            <defs>
              <linearGradient
                id='radialGradient'
                x1='0%'
                y1='0%'
                x2='100%'
                y2='100%'>
                <stop offset='0%' stopColor='#00C3D9' />
                <stop offset='50%' stopColor='#0091E6' />
                <stop offset='100%' stopColor='#0067E0' />
              </linearGradient>
            </defs>
            <PolarAngleAxis
              type='number'
              domain={[0, 100]}
              angleAxisId={0}
              tick={false}
            />
            <RadialBar
              clockWise
              cornerRadius={30}
              dataKey='value'
              background={{
                fill: 'rgba(10,0,75,0.12)',
              }}
            />
            <text
              x='50%'
              y='50%'
              textAnchor='middle'
              dominantBaseline='middle'
              className='fill-darkblue text-3xl font-semibold dark:fill-white'>
              {clamped}%
            </text>
          </RadialBarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default RadialProgressChart


