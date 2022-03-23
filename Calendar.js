const { google } = require('googleapis')
const cred_file = require('./credentials.json')

const CREDENTIALS = cred_file
const calendarId = "u6bu88au41o3d6qjf4cutkacv8@group.calendar.google.com"

const calendar = google.calendar({ version: 'v3' })
const SCOPES = 'https://www.googleapis.com/auth/calendar'

const auth = new google.auth.JWT(CREDENTIALS.client_email, null, CREDENTIALS.private_key, SCOPES)

const TIMEOFFSET = '+02:00'

const dateTimeForCalendar = (dateParam) => {

    let date = new Date(dateParam)

    let year = date.getFullYear()
    let month = date.getMonth() + 1
    if (month < 10) {
        month = `0${month}`
    }
    let day = date.getDate()
    if (day < 10) {
        day = `0${day}`;
    }
    let hour = date.getHours()
    if (hour < 10) {
        hour = `0${hour}`
    }
    let minute = date.getMinutes()
    if (minute < 10) {
        minute = `0${minute}`
    }

    let newDateTime = `${year}-${month}-${day}T${hour}:${minute}:00.000${TIMEOFFSET}`

    let event = new Date(Date.parse(newDateTime))

    let startDate = event

    let endDate = new Date(new Date(startDate).setMinutes(startDate.getMinutes() + 45))

    return {
        start: startDate,
        end: endDate
    }
}

const insertEvent = async (event) => {

    try {
        let response = await calendar.events.insert({
            auth: auth,
            calendarId: calendarId,
            resource: event
        })

        return response.status == 200 && response.statusText === 'OK'
    } catch (error) {
        console.log(`Hiba az esemény beszúrása során: ${error.message}`)
    }
}

const getEvents = async (dateTimeStart, dateTimeEnd, holiday) => {

    try {
        let response = await calendar.events.list({
            auth: auth,
            calendarId: holiday ? 'hu.hungarian#holiday@group.v.calendar.google.com' : calendarId,
            timeMin: dateTimeStart,
            timeMax: dateTimeEnd,
            timeZone: 'Europe/Budapest'
        })

        return response.data.items
    } catch (error) {
        console.log(`Hiba az események lekérdezése során: ${error.message}`)
    }
}

module.exports = {
    dateTimeForCalendar,
    insertEvent,
    getEvents
}

