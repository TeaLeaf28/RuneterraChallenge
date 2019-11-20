var hexcolorPicker = new Vue({
    el: '#hexcolor-picker',
    data:{
      hexcolor: '#',
      index: 0,
      colorList: [
        {hex: '#000000', name: 'black', complete: false},
        {hex: '#C0C0C0', name: 'silver', complete: false},
        {hex: '#808080', name: 'gray', complete: false},
        {hex: '#FFFFFF', name: 'white', complete: false},
        {hex: '#800000', name: 'maroon', complete: false},
        {hex: '#FF0000', name: 'red', complete: false},
        {hex: '#800080', name: 'purple', complete: false},
        {hex: '#FF00FF', name: 'fuchsia', complete: false},
        {hex: '#008000', name: 'green', complete: false},
        {hex: '#00FF00', name: 'lime', complete: false},
        {hex: '#808000', name: 'olive', complete: false},
        {hex: '#FFFF00', name: 'yellow', complete: false},
        {hex: '#000080', name: 'navy', complete: false},
        {hex: '#0000FF', name: 'blue', complete: false},
        {hex: '#008080', name: 'teal', complete: false},
        {hex: '#00FFFF', name: 'aqua', complete: false}
      ]
    },
    methods:{
      setHexColor(i){
        this.hexcolor = this.colorList[i].hex;
        index = i;
      },
      setRandHexColor(){
        var letters = '0123456789ABCDEF';
        this.hexcolor ='#';
        for (var i = 0; i < 6; i++) {
          this.hexcolor += letters[Math.floor(Math.random() * 16)];
        }
      },
      SetChallenge(){
        var closestColorIndex = 0;
        var minColorDiff = 9999;
        for (var i = 0; i < this.colorList.length; i++) {
          var colorDiff = getColorDiff(this.hexColor,colorList[i]);
          if(colorDiff < minColorDiff){
            minColorDiff = colorDiff;
            closestColorIndex = i;
          }
        }
        return colorList[closestColorIndex];
      }
    }
  })

var deckcolorAnalyzer = new Vue({
  el:'deckcolor-analyzer',
  data:{
    deckCodeInput:''
  },
  methods:{
    getDeckColors(){
      return ['']
    }
  }
})