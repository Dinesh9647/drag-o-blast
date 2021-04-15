/* Setup the enemies and power-ups */

// Returns random number in a given range
function getRandomInRange(min,max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// Array of colors
var colorArray = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', 
            '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
            '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A', 
            '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
            '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC', 
            '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
            '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680', 
            '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
            '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3', 
            '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];

var enemies = [];
var powerups = [];

// Number of enemies pushed into the array at a time
var cnt = 1;
var intervalID1;
var intervalID2;

// Push enemies into the array at a regular time interval
function constructEnemy() {

    // Set small time interval for bigger screens 
    if(width >= 819){
        intervalID1 = setInterval(() => {
            for(let i = 0; i < cnt; i++) {
                let radius = getRandomInRange(30, 60);
                let x = getRandomInRange(radius, width-radius);
                let y = -radius;
                let color = colorArray[Math.floor(Math.random() * colorArray.length)];
                let velocity = {
                    dx: getRandomInRange(-4,4),
                    dy: getRandomInRange(1,9)
                };
                enemies.push(new Enemy(x, y, radius, color, velocity.dx, velocity.dy));
            }
        }, 900);
    }

    // For smaller screens set larger time interval than bigger screens 
    else {
        intervalID1 = setInterval(() => {
            for(let i = 0; i < cnt; i++) {
                let radius = getRandomInRange(30, 60);
                let x = getRandomInRange(radius, width-radius);
                let y = -radius;
                let color = colorArray[Math.floor(Math.random() * colorArray.length)];
                let velocity = {
                    dx: getRandomInRange(-4,4),
                    dy: getRandomInRange(1,9)
                };
                enemies.push(new Enemy(x, y, radius, color, velocity.dx, velocity.dy));
            }
        }, 1900);
    }
}

// Push power-up into the array at a regular time interval
function constructPowerup() {
    intervalID2 = setInterval(() => {
        let radius = 40;
        let x = -radius;
        let y = getRandomInRange(2 * radius, height / 2);
        let dx = 4;
        powerups.push(new Powerup(x, y, radius, dx));
    }, 42000);
}