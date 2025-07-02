'use client'

import { useEffect, useState } from "react"
import { apiRoot } from "./constants"
import { useRouter } from "next/navigation";
import { usePostStore } from "./PostContext";
import { useShallow } from 'zustand/react/shallow'

export const CreatePostCard = () => {
  const router = useRouter()
  const [open, Create, Close, postId] = usePostStore(useShallow(state => [
    state.open,
    state.Create,
    state.Close,
    state.postId
  ]))
  const [titleInput, setTitleInput] = useState('')
  const [contentInput, setContentInput] = useState('')

  useEffect(() => {
    if (open && postId) loadPost(postId)
  }, [open, postId])

  const clearForm = () => {
    setTitleInput('')
    setContentInput('')
  }

  const close = () => {
    clearForm()
    router.refresh()
    Close()
  }

  const savePost = async () => {
    if (postId) updatePost(postId)
    else createPost()
  }

  const createPost = async () => {
    const payload = {
      "title": titleInput,
      "content": contentInput,
      "author": "someone@gmail.com"
    }

    const resp = await fetch(apiRoot + 'AddBlogPost', {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(payload)
    })

    close()
  }

  const updatePost = async (id) => {
    const payload = {
      "title": titleInput,
      "content": contentInput,
      "author": "someone@gmail.com"
    }

    const resp = await fetch(apiRoot + `AddBlogPost/${id}`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(payload)
    })

    close()
  }

  const loadPost = async (id) => {
    const resp = await fetch(apiRoot + `AddBlogPost/${id}`)
    const data = await resp.json()
    setTitleInput(data.title)
    setContentInput(data.content)
  }

  const deletePost = async (id) => {
    const resp = fetch(apiRoot + `AddBlogPost/${id}`, { method: 'DELETE', cache: 'no-cache' })
    close()
  }

  return <>
    <button onClick={() => { Create(); clearForm(); }} className="float-right bg-blue-950 px-4 py-1 rounded-sm" >New Post</button>
    {open && <>
      <div className="w-full absolute bottom-2 right-0 p-4 transition duration-700 ease-in-out">
        <div className="bg-stone-800 text-white p-4 rounded-sm">
          <h1 className="text-2xl mb-4 ml-2 ">{postId ? 'Edit' : 'Create'} Post:</h1>
          <div className="grid grid-cols-8 gap-4 w-1/2">
            <label htmlFor="postTitle" className="pt-1 ml-2 font-light">Title: </label>
            <input
              name="postTitle"
              className="ml-2 bg-stone-600 rounded-sm col-span-7 p-1 font-light ml-4"
              onChange={e => setTitleInput(e.target.value)}
              value={titleInput}
            />

            <label htmlFor="postContent" className="pt-1 font-light ml-2 ">Content: </label>
            <input
              name="postContent"
              className="ml-2 bg-stone-600 rounded-sm col-span-7 p-1 font-light ml-4"
              onChange={e => setContentInput(e.target.value)}
              value={contentInput}
            />

            <button onClick={savePost} className="col-span-2 bg-blue-900 p-1 rounded-sm">Save</button>
            <button onClick={() => Close()} className="col-span-2 bg-slate-900 p-1 rounded-sm">Cancel</button>
          </div>
          <div className="absolute top-8 right-8">
            <button onClick={() => deletePost(postId)} className="col-span-2 border-rose-900 border-3 py-1 px-2 rounded-sm float-right">Delete</button>
          </div>
        </div>
      </div>
    </>
    }
  </>
}