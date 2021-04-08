
const geonamesUrl = 'http://api.geonames.org/searchJSON?formatted=true&q='
const geonamesUser = 'aku1134'
//https://api.weatherbit.io/v2.0/forecast/daily?city=Raleigh,NC&key=API_KEY
const weatherbitUrl= 'https://api.weatherbit.io/v2.0/forecast/daily?'
const weatherbitApiKey = '59a7cfa56e9c4444a8b85d1e34d1265a'

// https://pixabay.com/api/?key={ KEY }&q=yellow+flowers&image_type=photo
const pixabayUrl= 'https://pixabay.com/api/?key='
const pixabayApiKey = '21043908-d0b61e9524d7cfadbb3cab1e4'




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
    const response = await fetch(pixabayUrl + pixabayApiKey + '&q=' + encodeURIComponent(city) +'&image_type=photo&pretty=true')
    const data = await response.json()
    if (parseInt(data.totalHits) > 0){
        dataObj = data.hits[0]
        //console.log(dataObj.previewURL)       
        return dataObj.webformatURL
    } 
	else{
        return('https://cdn.pixabay.com/photo/2015/09/02/12/33/books-918521_960_720.jpg')
    }   
  
}



export{
    geonamesData, 
    weatherbitData, 
    pixabayData
}