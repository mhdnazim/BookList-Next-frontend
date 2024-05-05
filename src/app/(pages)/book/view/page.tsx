'use client'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const Books = () => {

    const router = useRouter()
    
    useEffect(() => {
        router.push(`/book/list`)
    }, [router])
    
  return (
    <>
    </>
  )
}

export default Books