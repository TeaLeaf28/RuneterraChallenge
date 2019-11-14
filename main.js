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

  function getColorDiff(hexColor, listColor){
    rgb = hexToRGB(hexColor);
    ListRgb
    RedDiff = Math.abs(rgb.r - ListRgb.r);
    GreenDiff = Math.abs(rgb.g - ListRgb.g);
    BlueDiff = Math.abs(rgb.b - ListRgb.b);
    return RedDiff + GreenDiff + BlueDiff;

  }

  function hexToRGB(h) {
    //https://css-tricks.com/converting-color-spaces-in-javascript/
    let r = 0, g = 0, b = 0;
    var rgb = [r, g, b]
    if (h.length == 4) {
      r = "0x" + h[1] + h[1];
      g = "0x" + h[2] + h[2];
      b = "0x" + h[3] + h[3];
    } else if (h.length == 7) {
      r = "0x" + h[1] + h[2];
      g = "0x" + h[3] + h[4];
      b = "0x" + h[5] + h[6];
    }
    return rgb;
  }
        