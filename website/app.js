/* Global Variables */
// Personal API Key for OpenWeatherMap API
const myKey = '18bfbba13b7b6f580a793e21bac0bc9b&units=metric';
const weathUrl = 'https://api.openweathermap.org/data/2.5/weather?zip=';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 +'/'+ d.getDate()+'/'+ d.getFullYear();

// Event listener to add function to existing HTML DOM element
const geneBtn = document.getElementById('generate');
geneBtn.addEventListener('click', clickedBottum);

// Function called by event listener
function clickedBottum(){
    const zipValue = document.getElementById('zip').value;
    const feelValue = document.getElementById('feelings').value;
    getAllData(weathUrl, zipValue, myKey)
.then((info)=>{
    receivedObject('/addData', {date: newDate, city: info.name, temp: info.main.temp, feel: feelValue});
})
.then(updatingUI());
};

// Async function to GET Web API Data
const getAllData = async (url , zip , key)=>{
const myFetch = await fetch(
`${url}${zip}&appid=${key}`
);
try{
    const result = await myFetch.json();
    return result;
}catch (error){
console.log(error);
}
}

// Async function to POST data
const receivedObject = async (url = '', myObject={})=>{
const mySend = await fetch(url, {
method:'POST',
credentials: 'same-origin',
headers:{
    'Content-Type': 'application/json',
},
body: JSON.stringify(myObject)
 });
try{
    const newObject = await mySend.json();
    return newObject;
}catch(error){
console.log(error);
}
};

//updates the UI
const updatingUI = async ()=>{
const myFetchData = await fetch('/receivedData');
try{
    const finalData = await myFetchData.json();
    document.getElementById('date').innerHTML = 'Date: ' + finalData.date;
    document.getElementById('city').innerHTML = 'City: ' + finalData.city;
    document.getElementById('temp').innerHTML = 'temperature: ' + Math.round(finalData.temp) + ' °C';
    document.getElementById('content').innerHTML = 'Your Feeling: ' + finalData.feel;
}catch(error){
    console.log(error);
}
}
