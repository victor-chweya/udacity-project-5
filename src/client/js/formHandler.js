function handleSubmit(event){
    event.preventDefault()
    const city = document.getElementById('city').value

    let startDate = document.getElementById('startDate').value
    let endDate = document.getElementById('endDate').value
    let daysRemaining = Client.countDown(startDate,endDate)

    Client.geonamesData(city)        
    .then(data=>{
        let weatherData = {}
        let photo;
        let weatherDescription;             
 
        Client.init = () => {
            Client.postData({
                city: data.name, 
                country: data.countryName, 
                lat: data.lat, 
                lng: data.lng, 
                dateStart:startDate, 
                dateEnd:endDate, 
                date: daysRemaining,
                high: weatherData.high_temp,
                low: weatherData.low_temp,
                weather: weatherDescription,
                imgURL: photo                
            })
            Client.addData()
        }
        Client.weatherbitData(data.lat, data.lng).then(result =>{
            weatherData = result
            weatherDescription = weatherData.weather.description
                    
        }).then(()=>{
            Client.pixabayData(data.name, data.countryName).then(result =>{
                    photo = result
                    Client.init()
                })         
        })  
    })
    
}
export{handleSubmit}