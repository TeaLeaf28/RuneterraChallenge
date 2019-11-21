const { DeckEncoder } = require('runeterra')
const deck = DeckEncoder.decode('CEAAECABAQJRWHBIFU2DOOYIAEBAMCIMCINCILJZAICACBANE4VCYBABAILR2HRL')

const response = await fetch('http://localhost:21337/static-decklist');
const data = await response.json();


var request = new XMLHttpRequest()

request.open('GET', '././Image to Color Processing/datadragon-set1-en_us/en_us/data/set1-en_us.json', true)
//http://localhost:21337/static-decklist

request.onload = function() {
  // begin accessing JSON data here
  var data = JSON.parse(this.response)

  for (var i = 0; i < data.length; i++) {
      for(var j = 0; j < deck.length; j++)
      {
          if(deck[j].code==data[i].cardCode)
        if(data[i].health==0){
            if(data[i].flavorText!="" && data[i].flavorText.indexOf("\"") == 0){
                console.log(data[i].flavorText.slice(1, data[i].flavorText.indexOf("\"",1)))
            }
            else{
                console.log(data[i].flavorText)
            }
        }
        else{
            console.log(data[i].flavorText.slice(1, data[i].flavorText.indexOf("\"",1)))
        }
      }
      
  }
}