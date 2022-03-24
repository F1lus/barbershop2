import { useEffect, useState } from "react"

import api from "../../api"

const useDates = dateString => {

    const [dates, setDates] = useState()

    useEffect(() => {
        api.post('/appointments', {workday: dateString})
            .then(res => {
                setDates(res.data.appointment)
            })
            .catch(err => console.log(err.message))
    },[dateString])

    return dates
}

export default useDates