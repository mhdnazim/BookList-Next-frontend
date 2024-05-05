'use client'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const Books = ({params}: {params: {id: string}}) => {

    const router = useRouter()
    
    useEffect(() => {
        router.push(`/book/view/${params.id}/details`)
    }, [router,params.id])
    
  return (
    <>
    </>
  )
}

export default Books