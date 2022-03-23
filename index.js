const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const http = require('http')
const { dateTime } = require('luxon')

const calendar = require('./Calendar')

const app = express()

const server = http.createServer(app)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['POST', 'GET'],
    allowedHeaders: 'Content-Type',
    credentials: true
}))

app.use(helmet())

const timeHandler = (hours, mins, addition) => {
    if (mins + addition > 60) {
        mins = addition + mins - 60
        hours++
    } else if (mins + addition === 60) {
        mins = 0
        hours++
    } else {
        mins += addition
    }

    return [hours, mins]
}

const workCalculator = (startHours, startMins, end) => {

    const times = []

    while (startHours < end) {
        const calculateTime = timeHandler(startHours, startMins, 45)

        times.push({
            start: [startHours < 10 ? `0${startHours}` : startHours, startMins < 10 ? `0${startMins}` : startMins].join(':'),
            end: [calculateTime[0] < 10 ? `0${calculateTime[0]}` : calculateTime[0], calculateTime[1] < 10 ? `0${calculateTime[1]}` : calculateTime[1]].join(':')
        })

        startHours = calculateTime[0]
        startMins = calculateTime[1]
    }

    return times
}

app.post('/appointments', async (req, res) => {
    let times = []

    const param = new Date(req.body.workday)

    if (isNaN(param.getDate())) {
        new Error('wrong-date')
    }

    if ([1, 2, 3].includes(param.getDay())) {
        times = workCalculator(12, 0, 20)
    } else if (param.getDay() === 4) {
        times = workCalculator(8, 0, 16)
    } else if (param.getDay() === 5) {
        times = workCalculator(16, 0, 20)
    }

    const date = [param.getFullYear(), param.getMonth() + 1 < 10 ? `0${param.getMonth() + 1}` : param.getMonth() + 1, param.getDate() < 10 ? `0${param.getDate()}` : param.getDate()].join('-')

    param.setDate(param.getDate() + 1)
    const endDate = [param.getFullYear(), param.getMonth() + 1 < 10 ? `0${param.getMonth() + 1}` : param.getMonth() + 1, param.getDate() < 10 ? `0${param.getDate()}` : param.getDate()].join('-')

    const start = date + 'T00:00:00.000Z'
    const end = endDate + 'T00:00:00.000Z'

    const holidays = await calendar.getEvents(start, end, true)

    if (holidays && holidays.length > 0) {
        new Error('no-appointment')
        return
    } else {
        const appointments = await calendar.getEvents(start, end, false)
        if (appointments && appointments.length === 0) {
            res.send({ appointment: times })
        } else if (appointments && appointments.length === 1) {
            const startTime = new Date(appointments[0].start.dateTime)
            const endTime = new Date(appointments[0].end.dateTime)

            if (start === startTime && end === endTime) {
                res.send({ appointment: [] })
            } else {
                appointments.forEach(appointment => {
                    const startTime = new Date(appointment.start.dateTime)
                    const endTime = new Date(appointment.end.dateTime)

                    const startHours = startTime.getHours() < 10 ? `0${startTime.getHours()}` : startTime.getHours()
                    const startMinutes = startTime.getMinutes() < 10 ? `0${startTime.getMinutes()}` : startTime.getMinutes()

                    const endHours = endTime.getHours() < 10 ? `0${endTime.getHours()}` : endTime.getHours()
                    const endMinutes = endTime.getMinutes() < 10 ? `0${endTime.getMinutes()}` : endTime.getMinutes()

                    const resultTime = {
                        start: `${startHours}:${startMinutes}`,
                        end: `${endHours}:${endMinutes}`
                    }

                    times = times.filter(time => JSON.stringify(time) !== JSON.stringify(resultTime))
                })

                res.send({ appointment: times })
            }
        } else if (appointments && appointments.length > 1) {
            appointments.forEach(appointment => {
                const startTime = new Date(appointment.start.dateTime)
                const endTime = new Date(appointment.end.dateTime)

                const startHours = startTime.getHours() < 10 ? `0${startTime.getHours()}` : startTime.getHours()
                const startMinutes = startTime.getMinutes() < 10 ? `0${startTime.getMinutes()}` : startTime.getMinutes()

                const endHours = endTime.getHours() < 10 ? `0${endTime.getHours()}` : endTime.getHours()
                const endMinutes = endTime.getMinutes() < 10 ? `0${endTime.getMinutes()}` : endTime.getMinutes()

                const resultTime = {
                    start: `${startHours}:${startMinutes}`,
                    end: `${endHours}:${endMinutes}`
                }

                times = times.filter(time => JSON.stringify(time) !== JSON.stringify(resultTime))
            })
            
            res.send({ appointment: times })
        }
    }
})


app.post('/reserve', async (req, res) => {
    try {
        const formData = req.body

        if (formData.agree1 !== 'on' || formData.agree2 !== 'on') {
            new Error('terms-error')
            res.send({error: 'terms-error'})
            return
        }

        if (formData.time == -1) {
            new Error('select-appointment')
            res.send({error: 'select-appointment'})
            return
        }

        if (!formData.date) {
            new Error('no-date')
            res.send({error: 'no-date'})
            return
        }

        if (!formData.services) {
            new Error('no-service')
            res.send({error: 'no-service'})
            return
        }

        if (formData.firstname.length < 2 || formData.lastname.length < 2) {
            new Error('wrong-credentials')
            res.send({error: 'wrong-credentials'})
            return
        }

        const telefon = formData.phone.toString()

        if (!telefon.startsWith('20') && !telefon.startsWith('30') && !telefon.startsWith('50') && !telefon.startsWith('70')) {
            new Error('wrong-phone')
            res.send({error: 'wrong-phone'})
            return
        } else {
            if (telefon.length !== 9 || isNaN(telefon)) {
                new Error('wrong-phone')
                res.send({error: 'wrong-phone'})
                return
            }
        }

        const date = new Date(formData.date)

        if (isNaN(date.getDate())) {
            new Error('internal-error')
            res.send({error: 'internal-error'})
            return
        }

        const times = JSON.parse(formData.time)

        date.setHours(parseInt(times.start.split(':')[0]))
        date.setMinutes(parseInt(times.start.split(':')[1]))

        const dateTime = calendar.dateTimeForCalendar(date)

        const testAppointment = await calendar.getEvents(dateTime.start, dateTime.end, false)

        if (testAppointment && testAppointment.length !== 0) {
            new Error('already-reserved')
            res.send({error: 'already-reserved'})
            return
        }

        const event = {
            summary: `${formData.lastname} ${formData.firstname}`,
            description: `+36${formData.phone} | ${formData.services}`,
            start: {
                dateTime: dateTime.start,
                timeZone: 'Europe/Budapest'
            },
            end: {
                dateTime: dateTime.end,
                timeZone: 'Europe/Budapest'
            }
        }

        res.send({ result: await calendar.insertEvent(event), date: dateTime, time: times.start })
    } catch (error) {
        res.send({error: error.message})
    }
})

server.listen(4000, () => {
    console.log('Server Online!')
})