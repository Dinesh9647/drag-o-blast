/* Initialize controls for the movement of the player */

// Create a player object
var playerX = width / 2;
var playerY = (4 * height) / 5;
var player = new Player(playerX, playerY, 20, "#ffffff");

// Create objects to form inner and outer shield of the player
var shieldX = playerX;
var shieldY = playerY;
var in_shield = new Shield(shieldX, shieldY, 35, "#008080");
var out_shield = new Shield(shieldX, shieldY, 40, "#ffd700");

// Returns the distance between two points (x1, y1) and (x2, y2) 
function distance(x1, y1, x2, y2) {
    return Math.hypot(x2 - x1, y2 - y1);
}

// Returns whether a point (x1, y1) lies inside the circle or not
function isPointOnCircle(x1, y1, circle) {
    return distance(x1, y1, circle.x, circle.y) < circle.rad;
}

// Click and drag the player to its left or right side

// Check if player is clicked
document.addEventListener("mousedown",function(event) {
    if(isPointOnCircle(event.clientX, event.clientY, player)) {
        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
    }
});

// Drag the player
function onMouseMove(event) {
    let currX = event.clientX;
    if(currX - player.rad >= 0 && currX + player.rad <= width) {
        player.x = currX;
        in_shield.x = currX;
        out_shield.x = currX;
    }
}

// Drop the player
function onMouseUp() {
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
}

// If click event does not work then apply touch events for touch screen devices
document.addEventListener("touchstart",function(event) {
    if(isPointOnCircle(event.touches[0].clientX, event.touches[0].clientY, player)) {
        document.addEventListener("touchmove", onTouchMove);
        document.addEventListener("touchend", onTouchEnd);
    }
});

function onTouchMove(event) {
    let currX = event.touches[0].clientX;
    if(currX - player.rad >= 0 && currX + player.rad <= width){
        player.x = currX;
        in_shield.x = currX;
        out_shield.x = currX;
    }
}

function onTouchEnd() {
    document.removeEventListener("touchmove", onTouchMove);
    document.removeEventListener("touchend", onTouchEnd);
}