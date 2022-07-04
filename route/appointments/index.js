const manager = require('express').Router();
const { DateTime, Interval } = require('luxon');
const { getAppointments, formatAppoimtnents } = require('./calculator')
const calendar = require('../../model/Calendar');

/**
 * 
 * @param {DateTime} a_start
 * @param {DateTime} a_end 
 * @param {DateTime} b_start
 * @param {DateTime} b_end
 * @returns {boolean}
 */
const isNotOverlapping = (a_start, a_end, b_start, b_end) => {
    const interval = Interval.fromDateTimes(b_start, b_end)
    const interval2 = Interval.fromDateTimes(a_start, a_end)

    return interval.intersection(interval2) === null
}

manager.post('/appointments', (req, res) => {

    const dateTime = DateTime.fromISO(req.body.workday).setLocale('hu').startOf('day').setZone('Europe/Budapest')

    if (!dateTime.isValid) {
        res.send({ error: 'wrong-date' })
        return
    }

    let times = getAppointments(dateTime)

    const start = dateTime.toISO()
    const end = dateTime.plus({ day: 1 }).minus({ second: 1 }).toISO()

    calendar.getEvents(start, end, true)
        .then( events => {
            if (events && events.length > 0) {
                return 'holiday'
            }

            return calendar.freebusy(start, end)
        })
        .then(events => {

            if (events === 'holiday') {
                res.send({ appointment: [] })
                return
            }

            if (!events || events.length === 0) {
                res.send({ appointment: formatAppoimtnents(times) })
                return
            }

            events.forEach(event => {
                const start = DateTime.fromISO(event.start).plus({ minute: 1 }).setLocale('hu').setZone('Europe/Budapest')
                const end = DateTime.fromISO(event.end).setLocale('hu').minus({ minute: 1 }).setZone('Europe/Budapest')

                times = times.filter(time => {
                    return isNotOverlapping(time.start, time.end, start, end)
                })
            })

            res.send({ appointment: formatAppoimtnents(times) })
        }).catch(err => {
            console.log(err)
        })
})

module.exports = manager