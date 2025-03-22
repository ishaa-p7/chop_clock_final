import type React from "react"

interface JobCardProps {
  title: string
  company: string
  description: string
  date: string
  type: string
  location: string
  logo: React.ReactNode
}

export function JobCard({ title, company, description, date, type, location, logo }: JobCardProps) {
  return (
    <div className="border border-gray-800 rounded-lg p-6">
      <div className="flex items-start mb-4">
        <div className="bg-white p-2 rounded-md mr-4">{logo}</div>
        <div>
          <h3 className="text-xl font-bold">{title}</h3>
          <p className="text-lg">{company}</p>
          <p className="text-sm text-gray-400 line-clamp-2">{description}</p>
        </div>
      </div>
      <div className="flex items-center justify-between mt-4 text-sm">
        <span>{date}</span>
        <span className="px-3 py-1 bg-gray-800 rounded-full">{type}</span>
        <span>{location}</span>
      </div>
    </div>
  )
}

