import { motion } from "framer-motion"
import { Container, Row, Col } from "react-bootstrap"

import video from "../../style/video/about.mp4"

const Intro = () => {

    return (
        <div className="intro">

            <Container>

                <motion.h1 className="text-center my-5" initial={{ opacity: 0, x: 100 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 1 }}>Néhány szó magamról</motion.h1>

                <Row className="text-justify increased-font">
                    <Col lg={5} className="mt-5">
                        <motion.div initial={{ opacity: 0, x: -100 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 1 }}>
                            <p>Szia! Köszönöm hogy meglátogattad az oldalamat!</p>
                            <p><b>Kéninger Dávid vagyok, borbély.</b> 2012 óta foglalkozom a férfi frizurákkal
                                és szakállfazonokkal.<br />
                                A hivatalos szalon ami <i>“Keni’s Barber Shop”</i> néven ismert 2019 nyarán épült.
                                Igyekeztem a szalon imidzsét az old és newschool ötvözésével kialakítani, amihez
                                társul egy laza, pasis és teljesen kellemes baráti légkör.
                                Törekszem minden vendégemmel a bizalmas
                                baráti viszonyt ápolni.<br />
                                Ha szeretnél kiszakadni a monoton mindennapokból és vágatnál egy fancy frizurát és
                                szakállat akkor mindenképp itt a helyed!
                            </p>
                        </motion.div>
                    </Col>
                    <Col lg={1}></Col>
                    <Col lg={6} className="mt-5">
                        <motion.div className="vid" initial={{ opacity: 0, scale: 0 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 1 }}>
                            <div className="ratio ratio-16x9">
                                <video autoPlay muted loop>
                                    <source src={video} type="video/mp4" />
                                </video>
                            </div>
                            <motion.div className="vid-text" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}><span>Több</span>éves<br />tapasztalat</motion.div>
                        </motion.div>
                    </Col>
                </Row>
            </Container>

        </div>
    )
}

export default Intro