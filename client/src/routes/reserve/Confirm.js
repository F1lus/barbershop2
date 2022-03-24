import { Container, Row, Col } from "react-bootstrap"
import { motion } from "framer-motion"

import { useLocation } from "react-router-dom"
import { useEffect, useState } from "react"

const services = [
    "Válasszon szolgáltatást!",
    "Hajvágás géppel", "Szakállvágás (géppel, borotvával)", "Hajvágás géppel és ollóval",
    "Gyermek hajvágás", "HairBeard Combo (hajvágás és szakállvágás)", "Hajfestés/Melír"
]

const Confirm = () => {

    const query = useLocation().search

    const [response, setResponse] = useState({
        date: "",
        time: "",
        service: ""
    })

    useEffect(() => {

        let q2 = query
            .replace("?", "")
            .split("&")
        if (q2.length !== 3) {
            return
        }
        let date = q2[0].split("=")[1].split('-').join('.') + '.'
        let time = q2[1].split("=")[1]
        let service = q2[2].split("=")[1]

        setResponse({
            date,
            time,
            service
        })

    }, [query])

    return (
        <Container fluid className="text-center">
            <Row>
                <Col>
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1.2 }}
                        transition={{ duration: 1 }}
                    >
                        <i
                            id="confirm-icon"
                            className="bi bi-check2-circle text-success"
                        >
                        </i>
                    </motion.div>
                </Col>
            </Row>
            <Row>
                <Col>
                    <motion.h1
                        initial={{ y: 200, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 1 }}
                        className="text-white"
                    >
                        Sikeres foglalás a következő időpontra:
                        <span className="text-warning"> {response.date} {response.time}</span>
                    </motion.h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <motion.h2
                        initial={{ y: 200, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 1.2 }}
                        className="text-white"
                    >
                        Az Ön által foglalt szolgáltatás:
                        <span className="text-warning"> {services[response.service]}</span>
                    </motion.h2>
                </Col>
            </Row>
        </Container>
    )
}

export default Confirm