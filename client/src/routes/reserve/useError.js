import { useEffect, useState } from "react"

const useError = () => {

    const [error, setError] = useState()

    useEffect(() => {
        if(error === 'wrong-phone'){
            setError("A megadott telefonszám nem megfelelő")
        }else if(error === 'wrong-date'){
            setError("A dátum formátuma nem megfelelő!")
        }else if(error === 'no-appointment'){
            setError("Erre a napra nem lehet időpontot foglalni!")
        }else if(error === 'terms-error'){
            setError("Nem fogadta el a feltételeket!")
        }else if(error === 'select-appointment'){
            setError("Nem választott időpontot!")
        }else if(error === 'no-date'){
            setError("Nem választott napot!")
        }else if(error === 'no-service'){
            setError("Még nem választotta ki, hogy milyen szolgáltatást venne igénybe!")
        }else if(error === 'wrong-credentials'){
            setError("A megadott név feltételezhetően nem megfelelő!")
        }else if(error === 'internal-error'){
            setError("Belső hiba történt. Kérjük frissítse az oldalt!")
        }else if(error === 'already-reserved'){
            setError("Ez az időpont már foglalt!")
        }
    }, [error])

    return [error, setError]

}

export default useError