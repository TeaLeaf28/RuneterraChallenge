module.exports = class RegionChecker {
    constructor() {
        this.regionMap = new Map();
        this.regionMap.set('demacia', []);
        this.regionMap.set('freljord', []);
        this.regionMap.set('ionia', []);
        this.regionMap.set('noxus', []);
        this.regionMap.set('piltoverZaun', []);
        this.regionMap.set('shadowIsles', []);
        this.numCards = 40;
    }

    add(cardName, region) {
        if (region === 'Demacia') {
            this.regionMap.get('demacia').push(cardName);
        }
        else if (region === 'Freljord') {
            this.regionMap.get('freljord').push(cardName);
        }
        else if (region === 'Ionia') {
            this.regionMap.get('ionia').push(cardName);
        }
        else if(region === 'Noxus') {
            this.regionMap.get('noxus').push(cardName);
        }
        else if(region === 'Piltover & Zaun') {
            this.regionMap.get('piltoverZaun').push(cardName);
        }
        else if (region === 'Shadow Isles') {
            this.regionMap.get('shadowIsles').push(cardName);
        }
    }

    meetDeckSize() {
        const regionMapArr = Array.from(this.regionMap).sort((a, b) => b[1].length - a[1].length);
        if (regionMapArr[0][1].length + regionMapArr[1][1].length < this.numCards) {
            return false;
        }
        else {
            return true;
        }
    }

    getDeck() {
        const regionMapArr = Array.from(this.regionMap).sort((a, b) => b[1].length - a[1].length);
        const deckArr = [regionMapArr[0], regionMapArr[1]];
        const deck = new Map(deckArr);
        return deck;
    }
}