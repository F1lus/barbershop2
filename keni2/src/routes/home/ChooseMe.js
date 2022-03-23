import { motion } from "framer-motion"
import { Container, Row, Col } from "react-bootstrap"

const ChooseMe = () => {

    return (
        <motion.div className="spacing position-relative" initial={{ opacity: 0, y: 100 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <Container>
                <h1 className="text-center">Miért válassz engem</h1>
                <Row className="justify-content-center text-center">
                    <Col md={7} lg={4}>
                        <motion.div initial={{ opacity: 0, y: 100 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.5 }}>
                            <i className="font-max bi bi-emoji-smile"></i>
                            <h3>Hangulatos környezet</h3>
                        </motion.div>
                    </Col>
                    <Col md={7} lg={4}>
                        <motion.div initial={{ opacity: 0, y: 100 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 1 }}>
                            <i className="font-max bi bi-calendar2-date"></i>
                            <h3>Gyors és könnyű időpont foglalás</h3>
                        </motion.div>
                    </Col>
                    <Col md={7} lg={4}>
                        <motion.div initial={{ opacity: 0, y: 100 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 1.5 }}>
                            <i className="font-max bi bi-scissors"></i>
                            <h3>Profi, precíz munkák</h3>
                        </motion.div>
                    </Col>
                </Row>
            </Container>
        </motion.div>
    )
}

export default ChooseMe