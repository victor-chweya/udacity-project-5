
const geonamesUrl = 'http://api.geonames.org/searchJSON?formatted=true&q='
const geonamesUser = 'aku1134'
//https://api.weatherbit.io/v2.0/forecast/daily?city=Raleigh,NC&key=API_KEY
const weatherbitUrl= 'https://api.weatherbit.io/v2.0/forecast/daily?'
const weatherbitApiKey = '59a7cfa56e9c4444a8b85d1e34d1265a'

// https://pixabay.com/api/?key={ KEY }&q=yellow+flowers&image_type=photo
const pixabayUrl= 'https://pixabay.com/api/?key='
const pixabayApiKey = '21043908-d0b61e9524d7cfadbb3cab1e4'

function handleSubmit(event){
    event.preventDefault()
    const city = document.getElementById('city').value

    let startDate = document.getElementById('startDate').value
    let endDate = document.getElementById('endDate').value
    let daysRemaining = countDown(startDate,endDate)

    geonamesData(city)        
    .then(data=>{
        let weather = {}
        let photo;

        weatherbitData(data.lat, data.lng).then(result =>{
            weather = result
            init()
        })
        pixabayData(data.name, data.countryName).then(result =>{
            photo = result
            init()
        })       
 
        init = () => {
            postData({
                city: data.name, 
                country: data.countryName, 
                lat: data.lat, 
                lng: data.lng, 
                dateStart:startDate, 
                dateEnd:endDate, 
                date: daysRemaining,
                high: weather.high_temp,
                low: weather.low_temp,
                weather: weather.weather.description,
                imgURL: photo                
            })
            addData()
        }   
    })
    
}
const countDown = (start, end)=>{
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse
    const startdate = Date.parse(start);
    const enddate = Date.parse(end);   
    const daysto = enddate-startdate;
     //w3c schools
    const minutes = 1000 * 60;
    const hours = minutes * 60;
    const days = hours * 24;
    
    const daysremaining = Math.ceil(daysto / days);
    return daysremaining
}

const geonamesData = async (city) =>{
    let dataObj = {};
    const response = await fetch(geonamesUrl + city + '&username=' + geonamesUser + '&style=full')
    const data = await response.json()
    dataObj= data.geonames[0]
    return dataObj
}

const weatherbitData = async (lat,lng)=>{  
    let dataObj;
    const response = await fetch(weatherbitUrl + 'lat='+ lat+ '&lon='+ lng + '&key=' + weatherbitApiKey)
    const data = await response.json()
    dataObj = data.data[0]
    // console.log(dataObj)
    return dataObj
}

const pixabayData = async (city, country)=>{
    let dataObj;
    const response = await fetch(pixabayUrl + pixabayApiKey + '&q=' + encodeURIComponent(city)+ encodeURIComponent(country)+'&image_type=photo&pretty=true')
    const data = await response.json()
    if (parseInt(data.totalHits) > 0){
        dataObj = data.hits[0]
        //console.log(dataObj.previewURL)       
        return dataObj.previewURL
    } 
	else{
        return('https://cdn.pixabay.com/photo/2015/03/26/09/39/woman-690034_960_720.jpg');
    }   
  
}
const postData = async(data = {}) =>{
      const response = await fetch('/all', {
      method: 'POST', 
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
      },
     // Body data type must match "Content-Type" header        
      body: JSON.stringify(data), 
    });
  
      try {
        const newData = await response.json();
        console.log('Data received:', newData)
        return newData;
        
      }catch(error) {
      console.log("error", error);
      }
}
const addData = async () => {
    const response = await fetch ('/all');
    const data = await response.json()
    let html = ''
    data.forEach(data => {
        let htmlSegment = `<div class="card">
                            <img src="${data.imgURL}" class="card-img" alt="${data.city}, ${data.country} lazyload">
                            <h2>My trip to: ${data.city}, ${data.country} <br> Departing: ${data.dateStart}</h2>
                            <div>${data.city} trip is ${data.date} days away</div>
                            <div>Typical Weather for there is <br> Highs: ${data.high} and Lows:${data.low} <br>Mostly ${data.weather} </div>
                        </div>`;
        html += htmlSegment;
    })
   document.querySelector('#trip').innerHTML = html
}


