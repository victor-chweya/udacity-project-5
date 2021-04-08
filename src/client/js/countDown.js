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
export{countDown}