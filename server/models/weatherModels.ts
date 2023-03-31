const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'weather_app',
    password: 'Nosilla11!',
    port: 5432,
});

const getWeatherInfo = () => {
    return new Promise(function (resolve, reject) {
        pool.query(`SELECT * FROM weather ORDER BY id ASC`, (error: any, results: { rows: unknown; }) => {
            if (error) {
                reject(error)
            } else {
                resolve(results.rows);
            }
        })
    })

}
//,"currentTime":"18:00:38","currentTemp":45,"tempMax":50,"tempMin":30,"tempFeels":42,"sunrise":"18:00:38","sunset":"18:00:38","conditions":"clear-night","icon":"sunny"
//, currentTime, currentTemp, tempMax, tempMin, tempFeels, sunrise, sunset, conditions, icon
//currenttime, currenttemp, tempmax, tempmin, tempfeels, sunrise, sunset, conditions, icon)
//, $3, $4, $5, $6, $7, $8, $9, $10, $11

const createWeatherInfo = (body: { resolvedAddress: any; currentDate: any; currentTime: any; currentTemp: any; tempMax: any; tempMin: any; tempFeels: any; sunrise: any; sunset: any; conditions: any; icon: any; }) => {
    console.log('data recieved', body);
    
    return new Promise(function (resolve, reject) {
        const {resolvedAddress, currentDate, currentTime, currentTemp, tempMax, tempMin, tempFeels, sunrise, sunset, conditions, icon}=body;
        console.log("data", resolvedAddress,"+", currentDate);
        pool.query(`INSERT INTO weather(resolvedaddress, currentdate, currentTime, currentTemp, tempMax, tempMin, tempFeels, sunrise, sunset, conditions, icon) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`, [ resolvedAddress, currentDate, currentTime, currentTemp, tempMax, tempMin, tempFeels, sunrise, sunset, conditions, icon], (error: any, results: any) => {
            if (error) {
                reject(error)
            } else {
                resolve(results)
                // resolve(`A new weather had been added: ${results}`)
            }
        })
    })
}

const deleteWeatherInfo = (body: any) => {
    return new Promise(function (resolve, reject) {
        const id = parseInt(request.params.id)
        pool.query(`DELETE FROM weather WHERE id=$1`, [id], (error: any, results: any) => {
            if (error) {
                reject(error)
            } else {
                resolve(`Weather deleted with ID: ${id}`)
            }
        })
    })
}

module.exports = {
    getWeatherInfo,
    createWeatherInfo,
    deleteWeatherInfo
}

