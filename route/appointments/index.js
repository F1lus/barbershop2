const manager = require('express').Router();
const { DateTime } = require('luxon');
const { getAppointments, formatAppoimtnents } = require('./calculator')
const calendar = require('../../model/Calendar')

/**
 * 
 * @param {DateTime} a_start
 * @param {DateTime} a_end 
 * @param {DateTime} b_start
 * @param {DateTime} b_end
 * @param {number} threshold
 * @returns {boolean}
 */
const isOverlapping = (a_start, a_end, b_start, b_end) => {
    return Math.max(a_start, b_start) < Math.min(a_end, b_end)
}

/*const test = () => {
    const a_1 = DateTime.local().set({ hour: 9, minute: 30, second: 0 })
    const a_2 = DateTime.local().set({ hour: 10, minute: 15, second: 0 })
    const b_1 = DateTime.local().set({ hour: 10, minute: 15, second: 0 })
    const b_2 = DateTime.local().set({ hour: 11, minute: 0, second: 0 })
    const c_1 = DateTime.local().set({ hour: 11, minute: 0, second: 0 })
    const c_2 = DateTime.local().set({ hour: 11, minute: 45, second: 0 })
    const d_1 = DateTime.local().set({ hour: 8, minute: 45, second: 0 })
    const d_2 = DateTime.local().set({ hour: 9, minute: 29, second: 0 })

    console.log(isOverlapping(a_1, a_2, b_1, b_2, 0))
    console.log(isOverlapping(a_1, a_2, c_1, c_2, 0))
    console.log(isOverlapping(b_1, b_2, c_1, c_2, 0))
    console.log(isOverlapping(d_1, d_2, a_1, a_2, 0))
}*/

/*const overlapTest = (a_start, a_end, b_start, b_end) => {
    return Math.min(a_end - a_start, a_end - b_start, b_end - b_start, b_end - a_start)
}

function dateRangeOverlaps(a_start, a_end, b_start, b_end) {
    if (a_start <= b_start && b_start <= a_end) return true; // b starts in a
    if (a_start <= b_end && b_end <= a_end) return true; // b ends in a
    if (b_start <= a_start && a_end <= b_end) return true; // a in b
    return false;
}*/

manager.post('/appointments', (req, res) => {

    const dateTime = DateTime.fromISO(req.body.workday).setLocale('hu').setZone('Europe/Budapest')

    if (!dateTime.isValid) {
        res.send({ error: 'wrong-date' })
        return
    }

    //test()

    let times = getAppointments(dateTime)

    const start = dateTime.toISO()
    const end = dateTime.plus({ days: 1 }).minus({ second: 1 }).toISO()

    calendar.getEvents(start, end, true)
        .then(events => {
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
                const start = DateTime.fromISO(event.start).setLocale('hu').setZone('Europe/Budapest')
                const end = DateTime.fromISO(event.end).setLocale('hu').setZone('Europe/Budapest')

                times = times.filter(time => {
                    //console.log(time.start.hour, time.start.minute, time.end.hour, time.end.minute)
                    //console.log(isOverlapping(time.start, time.end, start, end, 45))
                    return !isOverlapping(time.start, time.end, start, end)
                })
            })

            res.send({ appointment: formatAppoimtnents(times) })
        }).catch(err => {
            console.log(err)
        })
})

module.exports = manager