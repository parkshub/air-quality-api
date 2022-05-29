log = console.log

const key = '3ef2483c-1c11-425b-b4ca-8bd6c83ccef8'


//https://attacomsian.com/blog/javascript-dom-remove-all-children-of-an-element
const removeChilds = (parent) => {
  while (parent.lastChild) {
      parent.removeChild(parent.lastChild);
  }
  
  let option = document.createElement('option')
  option.value = '-'
  option.text = '-'
  parent.appendChild(option)

};

let country
let city
let state

let countriesCountainer = document.querySelector('#selectCountry')
let statesCountainer = document.querySelector('#selectState')
let citiesCountainer = document.querySelector('#selectCity')

let countriesURL = 'http://api.airvisual.com/v2/countries?key=' + key

fetch(countriesURL)
  .then(res => res.json()) // parse response as JSON
  .then(data => {
    let tempData = data.data
    tempData.forEach(x=>{
      let option = document.createElement('option')

      option.value = x.country
      option.innerText = x.country

      countriesCountainer.appendChild(option)

    })
  })
  .catch(err => {
      console.log(`error ${err}`)
  })

document.querySelector('#selectCountry').onchange = function() {
  
  country = this.value

  let citiesURL = `http://api.airvisual.com/v2/states?country=${country}&key=${key}`

  if (country == '-') {
    removeChilds(statesCountainer)
    removeChilds(citiesCountainer)
  }

  else {
  fetch (citiesURL)
    .then(res => res.json())
    .then(data => {
      let tempData = data.data
      tempData.forEach(x => {
        let option = document.createElement('option')
        option.value = x.state
        option.innerText = x.state
        statesCountainer.appendChild(option)
      })
    })
    .catch(err => {
      console.log(`error ${err}`)
    })
  }
}



document.querySelector('#selectState').onchange = function() {
  
  state = this.value

  let statesURL = `http://api.airvisual.com/v2/cities?state=${state}&country=${country}&key=${key}`

  if (state == '-') {
    removeChilds(citiesCountainer)
  }

  else {
  
  fetch (statesURL)
    .then(res => res.json())
    .then(data => {
      // log(data)
      let tempData = data.data
      tempData.forEach(x => {
        let option = document.createElement('option')
        option.value = x.city
        option.innerText = x.city
        citiesCountainer.appendChild(option)
      })
    })
    .catch(err => {
      console.log(`error ${err}`)
    })
  }
}


fetch (`https://api.airvisual.com/v2/city?city=Los%20Angeles&state=California&country=USA&key=3ef2483c-1c11-425b-b4ca-8bd6c83ccef8`)
  .then (res => res.json())
  .then (data => {
    document.getElementById('timeStamp').innerText = 'Timestamp: ' + data.data.current.weather.ts //timestamp
    document.getElementById('tempCel').innerText = 'Degrees Celsius: ' + data.data.current.weather.tp //temp celsius
    document.getElementById('tempCelMin').innerText = 'Minimum Degrees Celsius: ' + data.data.current.weather.t_min //temp celsius min
    document.getElementById('humidity').innerText = 'Humidity: ' + data.data.current.weather.hu //humidity %
    document.getElementById('windSpeed').innerText = 'Wind Speed: ' + data.data.current.weather.ws //wind speed (m/s)

  })