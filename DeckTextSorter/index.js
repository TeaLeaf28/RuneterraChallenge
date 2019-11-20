const { DeckEncoder } = require('runeterra')
const deck = DeckEncoder.decode('CEAAECABAQJRWHBIFU2DOOYIAEBAMCIMCINCILJZAICACBANE4VCYBABAILR2HRL')
deck[0].code    // "01PZ019"
deck[0].count   // 2
deck[0].set     // 1
deck[0].id      // 19
deck[0].faction // Faction { id: 4, shortCode: "PZ" }

var request = new XMLHttpRequest()

request.open('GET', 'data.json', true)
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