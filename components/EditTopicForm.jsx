'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function EditTopicForm({ id, title, description }) {
  const [newTitle, setNewTitle] = useState(title)
  const [newDescription, setNewDescription] = useState(description)

  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch(`/api/topics/${id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ newTitle, newDescription }),
      })

      if (!res.ok) {
        throw new Error('Failed to update topic')
      }

      router.push('/')
      router.refresh()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        onChange={(e) => setNewTitle(e.target.value)}
        value={newTitle}
        type="text"
        placeholder="Topic title"
        className="border border-slate-500 p-4"
      />

      <textarea
        onChange={(e) => setNewDescription(e.target.value)}
        value={newDescription}
        type="text"
        placeholder="Topic description"
        className="border border-slate-500 p-4 h-20"
      />

      <button
        type="submit"
        className="bg-green-800 rounded-lg text-white font-bold py-3 px-6 w-fit"
      >
        Update Topic
      </button>
    </form>
  )
}
