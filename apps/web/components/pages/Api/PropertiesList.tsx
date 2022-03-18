import type { FC } from 'react'
import { useState } from 'react'

export const PropertiesList: FC = ({ children }) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        className="mt-2 bg-zinc-700 px-2 py-1 rounded-md text-xs text-white"
        onClick={() => setOpen(!open)}>
        {open ? 'Hide' : 'Show'} attributes
      </button>
      {open && <div className="w-full p-4 mt-4 rounded-md">{children}</div>}
    </>
  )
}