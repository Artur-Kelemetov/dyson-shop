import { Header } from '../../components/Header/Header'
import { Outlet } from 'react-router-dom'
import { Footer } from '../../components/Footer/Footer'
import { ScrollToTop } from '../../components/ScrollToTop/ScrollToTop'

export const MainLayout = () => {
  return (
    <>
      <ScrollToTop />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}