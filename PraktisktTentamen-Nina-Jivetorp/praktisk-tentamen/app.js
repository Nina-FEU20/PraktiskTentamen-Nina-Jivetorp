// Getting DOM elements
let flags = document.querySelectorAll('img'); 
let name = document.querySelectorAll('h1'); 
let time = document.querySelectorAll('h3')

// To make the flags the same size 
for(let i = 0; i < flags.length; i++){
    flags[i].style.height = '200px'; 
}

// url for all countries to use in fetch
const url = 'https://restcountries.eu/rest/v2/all'; 

fetch(url)
    .then((response) => response.json())
    .then((data) => {

        // creating an array to put all my instanceobjects inside 
        let arrOfCountries = []; 

        // Pushing 3 random instanceobjects inside the array with the help of a for-loop
        for(let i = 0; i < 3; i++){
            // get a random number to use as indexposition, so we can get 3 random countries. 
            let randomNum = Math.floor(Math.random() * data.length); 
            arrOfCountries.push(new Country(data[randomNum].name, data[randomNum].flag, data[randomNum].timezones[0])); 
        }

        // Using a for-loop to put all values from the 3 instanceobjects on the DOM
        for (let i = 0; i < 3; i++){
            // setting innertext to the Countrys name
            name[i].innerText = `${arrOfCountries[i].name}`; 
            // using the flag-url to set as src on img
            flags[i].src = arrOfCountries[i].flag; 
            // using my prototype to set the localtime! 
            time[i].innerText = `Local time: ${arrOfCountries[i].getTime()}`; 
        }
    })
    .catch((error) => {
        name[2].innerText = error; 
    })

    
// Constuctor for the countries with the three parameters/values that I need. 
function Country(_name, _flag, _timeZone){
    this.name = _name; 
    this.flag = _flag;
    this.timeZone = _timeZone; 
}

// Prototype to count the local time
Country.prototype.getTime = function(){
    
    //if there is no time-difference, the timeZone only return "UTC" - without any numbers. 
    // this if statement is to handle that
    let timeDiff; 
    if (this.timeZone.length < 4){
        timeDiff = '+00'
    } else {
        // Taking out the difference, with +/-, in string
         timeDiff = this.timeZone.substr(3, 3);
    }

    // parsing difference to int
    let timeDiffNum = parseInt(timeDiff); 

    // Get current UTC-time, in num
    let date = new Date(); 
    let UTCHour = date.getUTCHours();

    // getting current min, in num
    let minutes = date.getMinutes();

    // If its a single number, it shows for example 8 instead of 08. 
    // Adding the 0 infront to make it look better! 
    if (minutes < 10) {
        minutes = `0${minutes}`
    }

    // local time in string
    let localHour = `${UTCHour + timeDiffNum}`
    
    // If localHour returns a negative number, make it positive
    if(localHour < 0){
        localHour = Math.abs(localHour); 
    }
    // If its a single number, it shows for example 8 instead of 08. 
    // Adding the 0 infront to make it look better! 
    if(localHour < 10){
        localHour = `0${localHour}`
    }
    
    // putting hour and minutes together
    let localTime = `${localHour}:${minutes}`; 
    
    return localTime; 

}
