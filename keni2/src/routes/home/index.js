import {motion, useIsPresent } from "framer-motion"

import { Row, Col } from "react-bootstrap"

import 'bootstrap-icons/font/bootstrap-icons.css'
import { Link } from "react-router-dom"

import { lazy, Suspense, useEffect } from "react"

import ChooseMe from "./ChooseMe"
import Intro from "./Intro"
import Showcase from "./Showcase"

const Home = () => {

    const a = useIsPresent()

    useEffect(() => {
        console.log(a)
    }, [a])

    return (
        <div>
            <motion.div className="branding" initial={{ opacity: 0, x: -1500 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }}>
                <h1 className="text-center">Keni's Barbershop</h1>

                <Link to='/reserve'><button>FOGLALJ MOST!</button></Link>
            </motion.div>

            <ChooseMe />

            <hr />

            <Intro />

            <hr />

            <Showcase />

            <hr />

            <div className="mt-3">
                <div className="gmap_canvas"><iframe title="map" className="gmap_iframe w-100" frameBorder="0" scrolling="no"
                    marginHeight="0" marginWidth="0"
                    src="https://maps.google.com/maps?width=1400&amp;height=200&amp;hl=en&amp;q=4555, Levelek új utca 42&amp;t=&amp;z=13&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"></iframe>
                </div>
            </div>

            <hr />

            <footer className="footer text-center">
                <h3>Elérhetőségek</h3>
                <Row className="justify-content-center my-3">
                    <Col lg={6}>
                        <b>Email: <a className="color-white" href="mailto:kenisbarbershop@gmail.com">kenisbarbershop@gmail.com</a></b>
                    </Col>
                    <Col lg={6}>
                        <b>Telefon: <span className="color-white">+36301405939</span></b>
                    </Col>
                </Row>
                <Row className="justify-content-center mb-3">
                    <Col lg={4}>
                        <a href="https://www.facebook.com/Kenis-Barber-Shop-101330481735193"><i className="font-medium bi bi-facebook"></i></a>
                    </Col>
                    <Col lg={4}>
                        <a href="https://www.instagram.com/kenisbarbershop/"><i className="font-medium bi bi-instagram"></i></a>
                    </Col>
                    <Col lg={4}>
                        <a href="./adatvedelem.html" target="_blank"><i className="font-medium bi bi-lock-fill"></i></a>
                    </Col>
                </Row>
            </footer>
        </div>
    )
}

export default Home