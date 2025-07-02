'use client'

import { useRouter } from "next/navigation"
import { useState } from "react"
import { apiRoot } from "./constants"
import { usePostStore } from "./PostContext"
import { useShallow } from "zustand/react/shallow"

export const PostCard = ({ title, content, postId }) => {
  const router = useRouter()
  const [deleting, setDeleting] = useState(false)
  const [Edit] = usePostStore(useShallow( state => [
    state.Edit 
  ]))

  const OnEdit = async () => {
    Edit(postId)
  }

  return (
    <div className="bg-stone-800 text-white p-4 rounded-sm relative">
      <h4 className="text-xl">{title}</h4>
      <div className="font-light">{content}</div>
      <div className="absolute top-2 right-4">
        <a href="#" onClick={OnEdit}><small>Edit</small></a>
      </div>
    </div>
  )
}