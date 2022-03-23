export default class DateWorker{

    #days
    #months

    constructor(){
        this.date = new Date()

        this.#months = [
            'Január', 'Február', 'Március', 
            'Április', 'Május', 'Június', 
            'Július', 'Augusztus', 'Szeptember', 
            'Október', 'November', 'December'
        ]

        this.#days = [
            'Vasárnap', 'Hétfő', 'Kedd',
            'Szerda', 'Csütörtök', 'Péntek',
            'Szombat'
        ]
    }

    getMonthName = d => this.#months[d.getMonth()]
    getDayName = d => this.#days[d.getDay()]
    
    calculateWorkdays = () => {
        this.date = new Date()
        const days = []

        this.next()

        let i = 0

        while(i < 20){
            if(![0,6].includes(this.date.getDay())){
                days.push(this.date.toDateString())
                i++
            }

            this.next()
        }

        return days

    }

    next = () => {
        this.date.setDate(this.date.getDate()+1)
    }

    getMonthLimit = () => {
        const leap = this.date.getFullYear() % 4 === 0 && (this.date.getFullYear() % 100 !== 0 || this.date.getFullYear() % 400 === 0)

        const limits = [31, leap ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

        return limits[this.date.getMonth()]
    }

}