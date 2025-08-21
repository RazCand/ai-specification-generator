import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Layout from '@/components/common/Layout'
import LoadingSpinner from '@/components/common/LoadingSpinner'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    router.push('/generate')
  }, [router])

  return (
    <>
      <Head>
        <title>AI Specification Generator - Tribus Advisory</title>
      </Head>
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <LoadingSpinner message="Redirecting to generator..." />
        </div>
      </Layout>
    </>
  )
}