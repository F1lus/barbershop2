const { DateTime } = require('luxon')

/**
 * 
 * @param {DateTime} start
 * @param {DateTime} end 
 * @param {number} serviceTime
 * @returns {Array}
 */

 const workCalculator = (start, end, serviceTime) => {

    const times = []

    while (start.toMillis() < end.toMillis()) {
        times.push({
            start: start,
            end: start.plus({ minutes: serviceTime })
        })

        start = start.plus({ minutes: serviceTime })
    }

    return times
}

/**
 * 
 * @param {DateTime} dateTime 
 * @returns {Array}
 */
const getAppointments = dateTime => {
    let start, end

    switch (dateTime.weekday) {
        case 1:
        case 2:
        case 3:
            start = dateTime.set({ hour: 12, minute: 0, second: 0 })
            end = dateTime.set({ hour: 20, minute: 0, second: 0 })
            break
        case 4:
            start = dateTime.set({ hour: 8, minute: 0, second: 0 })
            end = dateTime.set({ hour: 16, minute: 0, second: 0 })
            break
        case 5:
            start = dateTime.set({ hour: 9, minute: 0, second: 0 })
            end = dateTime.set({ hour: 14, minute: 0, second: 0 })
            break
        default:
            start = 0
            end = 0
    }

    return workCalculator(start, end, 45)
}

const formatAppoimtnents = appointments => {
    return appointments.map(appointment => {
        return {
            start: appointment.start.toFormat('HH:mm'),
            end: appointment.end.toFormat('HH:mm')
        }
    })
}

module.exports = {
    workCalculator,
    getAppointments,
    formatAppoimtnents
}