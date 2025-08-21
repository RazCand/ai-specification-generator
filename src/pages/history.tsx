import Head from 'next/head'
import Layout from '@/components/common/Layout'
import HistoryComponent from '@/components/history/HistoryComponent'

export default function History() {
  return (
    <>
      <Head>
        <title>History - AI Spec Generator</title>
        <meta name="description" content="View and manage your specification history" />
      </Head>
      <Layout>
        <HistoryComponent />
      </Layout>
    </>
  )
}