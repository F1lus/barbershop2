const reserve = require('express').Router()
const calendar = require('../../model/Calendar')
const { DateTime } = require('luxon')


/**
 * @param {DateTime} date
 * @param {string} time
 * @returns {Array}
*/
const getInterval = (time, date) => {
    const jsonTime = JSON.parse(time)
    const sHours = parseInt(jsonTime.start.split(':')[0])
    const sMins = parseInt(jsonTime.start.split(':')[1])

    const eHours = parseInt(jsonTime.end.split(':')[0])
    const eMins = parseInt(jsonTime.end.split(':')[1])

    const start = date.set({ hour: sHours, minute: sMins }).toISO()
    const end = date.set({ hour: eHours, minute: eMins-1 }).toISO()

    return [start, end, jsonTime]
}

reserve.post('/reserve', (req, res) => {
    const {
        agree1,
        agree2,
        time,
        date,
        services,
        firstname,
        lastname,
        phone
    } = req.body

    const resDate = DateTime.fromISO(date).setLocale('hu').setZone('Europe/Budapest')

    if (!resDate.isValid) {
        res.send({ error: 'no-date' })
        return
    }

    if (agree1 !== 'on' || agree2 !== 'on') {
        res.send({ error: 'terms-error' })
        return
    }

    if (time == -1) {
        res.send({ error: 'select-appointment' })
        return
    }

    if (!services) {
        res.send({ error: 'no-service' })
        return
    }

    if (
        firstname.length < 2 || !(/^[A-Z][A-Za-záéíóöőúüű]+[ .-]*[A-Za-záéíóöőúüű]*$/gm).test(firstname)
        || lastname.length < 2 || !(/^[A-Z][A-Za-záéíóöőúüű]+[ .-]*[A-Za-záéíóöőúüű]*$/gm).test(lastname)
    ) {
        res.send({ error: 'wrong-credentials' })
        return
    }

    if (!(/^[0-9]{9}$/gm.test(phone))) {
        res.send({ error: 'wrong-phone' })
        return
    }

    const [start, end, jsonTime] = getInterval(time, resDate)

    calendar.getEvents(start, end, false)
        .then(events => {
            if (events && events.length > 0) {
                return 'already-reserved'
            }

            const event = {
                summary: `${lastname} ${firstname}`,
                description: `+36${phone} | ${services}`,
                start: {
                    dateTime: start,
                    timeZone: 'Europe/Budapest'
                },
                end: {
                    dateTime: end,
                    timeZone: 'Europe/Budapest'
                }
            }

            return calendar.insertEvent(event)
        })
        .then(result => {
            if(result === 'already-reserved'){
                res.send({ error: 'already-reserved' })
                return
            }
            res.send({ result, date: { start }, time: jsonTime.start })
        })
        .catch(err => {
            res.send({ error: err.message })
        })

})

module.exports = reserve
