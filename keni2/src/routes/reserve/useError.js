import { useEffect, useState } from "react"

const useError = () => {

    const [error, setError] = useState()

    useEffect(() => {
        switch (error) {
            case 'wrong-date':
                setError("A dátum formátuma nem megfelelő!")
                break
            case 'no-appointment':
                setError("Erre a napra nem lehet időpontot foglalni!")
                break
            case 'terms-error':
                setError("Nem fogadta el a feltételeket!")
                break
            case 'select-appointment':
                setError("Nem választott időpontot!")
                break
            case 'no-date':
                setError("Nem választott napot!")
                break
            case 'no-service':
                setError("Még nem választotta ki, hogy milyen szolgáltatást venne igénybe!")
                break
            case 'wrong-credentials':
                setError("A megadott név feltételezhetően nem megfelelő!")
                break
            case 'wrong-phone':
                setError("A megadott telefonszám nem megfelelő")
                break
            case 'internal-error':
                setError("Belső hiba történt. Kérjük frissítse az oldalt!")
                break
            case 'already-reserved':
                setError("Ez az időpont már foglalt!")
                break
            default:
                setError("A foglalás sikertelen volt! Kérjük, ellenőrizze az adatait, majd próbálja újra!")
        }
    }, [error])

    return [error, setError]

}

export default useError