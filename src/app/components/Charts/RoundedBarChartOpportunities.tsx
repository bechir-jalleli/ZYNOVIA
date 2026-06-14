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

const barDataOpportunities = [
  { label: 'Concours', value: 86 },
  { label: 'STEM', value: 91 },
  { label: 'Écoles d’ingénieurs', value: 88 },
  { label: 'Carrières Tech', value: 93 },
  { label: 'Entreprises IA', value: 97 },
]

const RoundedBarChartOpportunities: React.FC = () => {
  return (
    <div style={{ width: '100%', height: 300, minWidth: 0 }}>
      <ResponsiveContainer width='100%' height='100%'>
        <BarChart
          data={barDataOpportunities}
          barCategoryGap={28}
          margin={{ top: 12, right: 8, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id='opportunitiesBarGradient' x1='0%' y1='0%' x2='0%' y2='100%'>
              <stop offset='0%' stopColor='#00C3D9' />
              <stop offset='45%' stopColor='#0091E6' />
              <stop offset='100%' stopColor='#0067E0' />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray='3 6'
            vertical={false}
            stroke='rgba(15,23,42,0.06)'
          />
          <XAxis
            dataKey='label'
            tickLine={false}
            axisLine={false}
            tick={{ fill: '#64748B', fontSize: 11 }}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tick={{ fill: '#64748B', fontSize: 11 }}
            tickFormatter={(v: number) => `${v}%`}
          />
          <Tooltip
            cursor={{ fill: 'rgba(148,163,184,0.12)' }}
            contentStyle={{
              borderRadius: 16,
              border: '1px solid rgba(148,163,184,0.25)',
              background:
                'linear-gradient(135deg, rgba(10,0,75,0.98), rgba(15,23,42,0.98))',
              color: '#E5E7EB',
            }}
            labelStyle={{ fontSize: 12, color: '#CBD5F5' }}
            formatter={(value: number) => [`${value}%`, 'Préparation']}
          />
          <Bar
            dataKey='value'
            radius={[16, 16, 14, 14]}
            fill='url(#opportunitiesBarGradient)'
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default RoundedBarChartOpportunities


