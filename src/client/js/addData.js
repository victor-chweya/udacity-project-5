const addData = async () => {
    const response = await fetch ('/all');
    const data = await response.json()
    let html = ''
    data.forEach(data => {
        let htmlSegment = `<div class="card">
                            <img src="${data.imgURL}" class="card--img" alt="${data.city}, ${data.country} l" loading="lazy">
                            <h2 class="card--title">My trip to: ${data.city}, ${data.country} <br> Departing: ${data.dateStart}</h2>
                            <div>${data.city} trip is ${data.date} days away</div>
                            <div>Typical Weather for there is <br> Highs: <strong>${data.high}</strong> and Lows:<strong>${data.low}</strong> <br>Mostly ${data.weather} </div>
                        </div>`;
        html += htmlSegment;
    })
   document.querySelector('#trip').innerHTML = html
}
export{addData}