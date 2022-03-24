import { motion } from "framer-motion"
import { Container, Table } from "react-bootstrap"


const Pricing = () => {

    return (
        <motion.div key="prices">
            <Container className="mt-5">
                <motion.h1
                    initial={{ y: -200, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="text-center text-white mb-5"
                >
                    A környék legjobb árai
                </motion.h1>
                <motion.div
                    initial={{x: 200, opacity: 0}}
                    animate={{x: 0, opacity: 1}}
                    transition={{duration: 1, delay: 1}}
                >
                    <Table className="text-gold" variant="black" responsive='sm'>
                        <thead>
                            <tr>
                                <th className="border-end border-warning">Típus</th>
                                <th className="border-end border-warning">Ár</th>
                                <th>Időtartam</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="text-white">
                                <td className="border-end border-warning">Hajvágás géppel</td>
                                <td className="border-end border-warning">2800 Ft</td>
                                <td className="border-bottom border-warning">45 perc</td>
                            </tr>
                            <tr className="text-white">
                                <td className="border-end border-warning">Szakállvágás (géppel, borotvával)</td>
                                <td className="border-end border-warning">1500 Ft</td>
                                <td className="border-bottom border-warning">20 perc</td>
                            </tr>
                            <tr className="text-white">
                                <td className="border-end border-warning">Hajvágás géppel és ollóval</td>
                                <td className="border-end border-warning">3300 Ft</td>
                                <td className="border-bottom border-warning">45 perc</td>
                            </tr>
                            <tr className="text-white">
                                <td className="border-end border-warning">Gyermek hajvágás</td>
                                <td className="border-end border-warning">2000 Ft</td>
                                <td className="border-bottom border-warning">30-45 perc</td>
                            </tr>
                            <tr className="text-white">
                                <td className="border-end border-warning">HairBeard Combo (hajvágás és szakállvágás)</td>
                                <td className="border-end border-warning">4800 Ft</td>
                                <td className="border-bottom border-warning">60 perc</td>
                            </tr>
                            <tr className="text-white">
                                <td className="border-end border-warning">Hajfestés/Melír</td>
                                <td className="border-end border-warning">12000 Ft</td>
                                <td className="border-bottom border-warning">60 perc</td>
                            </tr>
                            <tr className="text-white">
                                <td className="border-end border-warning">Szolárium</td>
                                <td className="border-end border-warning">100 Ft/perc</td>
                                <td className="border-bottom border-warning">Tetszőleges</td>
                            </tr>
                            <tr className="text-white">
                                <td className="border-end border-warning">Szolárium - Bérlet !HAMAROSAN!</td>
                                <td className="border-end border-warning">80 Ft/perc</td>
                                <td className="border-bottom border-warning">Tetszőleges</td>
                            </tr>
                            <tr className="text-white">
                                <td className="border-end border-warning">Hajmosás</td>
                                <td className="border-end border-warning">Ingyenes</td>
                                <td className="border-bottom border-warning">15 perc</td>
                            </tr>

                        </tbody>
                    </Table>
                </motion.div>
            </Container>
        </motion.div>
    )
}

export default Pricing