import { Outlet, useRoutes, Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

import { Navbar, Container, Nav } from 'react-bootstrap'

import './style/main.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import logo from './style/images/logo.ico'

import Home from './routes/home'
import { useEffect } from 'react'
import Pricing from './routes/pricing'
import Reserve from './routes/reserve'
import Confirm from './routes/reserve/Confirm'

const paths = ['/', '/pricing', '/reserve']

const Layout = () => {

  const path = useLocation().pathname

  useEffect(() => {
    if(paths.includes(path)){
      const links = document.getElementsByClassName('nav-links')

      for(const link of links){
        link.classList.remove('active')
      }

      links[paths.indexOf(path)].classList.add('active')
    }
  }, [path])

  return (
    <div>
      <motion.div className='sticky-top' initial={{ y: -100 }} animate={{ y: 0 }}>
        <Navbar id="nav" bg="black" variant='dark' expand="lg">
          <Container fluid>
            <Navbar.Brand>
              <img src={logo} alt='logo' width={64} height={64} />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className='justify-content-end'>
              <Nav className="justify-content-end">
                <Link className='nav-links' to="/">Főoldal</Link>
                <Link className='nav-links' to="/pricing">Árlista</Link>
                <Link className='nav-links' to="/reserve">Foglalás</Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </motion.div>
      <Outlet />
  </div>
  )
}

const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home/> },
      {
        path: '/pricing',
        element: <Pricing />,
        children: []
      },
      {
        path: '/reserve',
        element: <Reserve />,
        children: []
      },
      {
        path: '/confirm',
        element: <Confirm />,
        children: []
      },
      { path: '*', element: <div>No Match</div> }
    ]
  }
]

function App() {

  const application = useRoutes(routes)


  return (
    <div>
      {application}
    </div>
  )
}

export default App;
