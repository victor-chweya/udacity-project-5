const postData = async(data = {}) =>{
    const response = await fetch('/addData', {
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
export{postData}