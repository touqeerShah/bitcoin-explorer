import Head from 'next/head'
import Layout from "../components/layout/Index"
import History from "../components/History/ListHistory"
export default function Home() {
  return (
    <div className=''>

      <History color="light" pageTitle="Search History" />
    </div>
  )
}
// / Settings.layout = Layout;
Home.getLayout = function getLayout(page) {
  return (
    <Layout>{page}</Layout>
  )
}