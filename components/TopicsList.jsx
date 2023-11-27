import React from 'react'
import RemoveBtn from './RemoveBtn'
import Link from 'next/link'
import { HiPencilAlt } from 'react-icons/hi'

const getTopics = async () => {
  const apiURL = process.env.API_URL

  try {
    const res = await fetch(`${apiURL}/api/topics`, {
      cache: 'no-store',
    })
    if (!res.ok) {
      throw new Error('Failed to fetch topics')
    }
    return res.json()
  } catch (error) {
    console.log('Error loading topics: ', error)
  }
}

export default async function TopicsList() {
  const { topics } = await getTopics()

  return (
    <>
      {topics.map((topic) => (
        <div
          key={topic._id}
          className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start"
        >
          <div>
            <h2 className="text-2xl font-bold">{topic.title}</h2>
            <div>{topic.description}</div>
            <div className="flex gap-4">
              <p>Created: {topic.createdAt}</p>
              <p>Updated: {topic.updatedAt}</p>
            </div>
          </div>

          <div className="flex gap-2">
            <RemoveBtn id={topic._id} />
            <Link href={`/editTopic/${topic._id}`}>
              <HiPencilAlt size={24} />
            </Link>
          </div>
        </div>
      ))}

      {/* 임의로 만든 글 데이터 */}
      {/* <div className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start">
        <div>
          <h2 className="text-2xl font-bold">더미 제목</h2>
          <div>더미 내용, DB에 들어있지 않음</div>
        </div>

        <div className="flex gap-2">
          <RemoveBtn id={} />
          <Link href={'/editTopic/123'}>
            <HiPencilAlt size={24} />
          </Link>
        </div>
      </div> */}
    </>
  )
}
