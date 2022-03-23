import w1 from "../../style/images/w1.jpeg"
import w2 from "../../style/images/w2.jpeg"
import w3 from "../../style/images/w3.jpeg"
import w4 from "../../style/images/w4.jpeg"
import w5 from "../../style/images/w5.jpeg"
import w6 from "../../style/images/w6.jpeg"
import w7 from "../../style/images/w7.jpeg"
import w8 from "../../style/images/w8.jpeg"

import { motion } from "framer-motion"

import { Container, Row, Col, Card } from "react-bootstrap"

const images = [w1, w2, w3, w4, w5, w6, w7, w8]

const Showcase = () => {

    function render() {
        return images.map((el, i) => {
            return (
                <Col key={i}>
                    <motion.div initial={{ opacity: 0, y: 100 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 * i }}>
                        <Card className="rounded shadow border border-dark">
                            <Card.Img style={{height: '50vh'}} variant="top" src={el} />
                        </Card>
                    </motion.div>
                </Col>
            )
        })
    }

    return (
        <Container id="galery" fluid>
            <Row className="justify-content-center">
                <Col lg={6}>
                    <motion.h1 className="text-center" initial={{ opacity: 0, scale: 0 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{duration: 1}}>Néhány munkám</motion.h1>
                    <motion.p className="text-center" initial={{ opacity: 0, scale: 0 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{duration: 1, delay: 1}}>Igyekszem minden
                        vendégemből a maximumot kihozni, az arc és fejformájuknak megfelelő
                        fazonú frizurát és szakállat készíteni számukra.
                    </motion.p>
                </Col>
            </Row>
            <Row xs={1} md={2} lg={4} className="g-4">
                {render()}
            </Row>
        </Container>
    )
}

export default Showcase