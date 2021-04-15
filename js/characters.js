/* Initial setup */ 
var canvas = document.querySelector("canvas");
var c = canvas.getContext("2d");
var width = window.innerWidth;
var height = window.innerHeight;
canvas.width = width;
canvas.height = height;

/* Define classes for the characters of the game and add draw and update method to the classes */

// Create a 'Player' class
class Player {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.rad = radius;
        this.color = color;
    }

    draw() {
        c.beginPath();
        c.arc(this.x, this.y, this.rad, 0, Math.PI * 2);
        c.fillStyle = this.color;
        c.fill();
    }
}

// Create an 'Enemy' class
class Enemy {
    constructor(x, y, radius, color, dx, dy) {
        this.x = x;
        this.y = y;
        this.rad = radius;
        this.color = color;
        this.dx = dx;
        this.dy = dy;
    }

    draw() {
        c.beginPath();
        c.arc(this.x, this.y, this.rad, 0, Math.PI * 2);
        c.fillStyle = this.color;
        c.fill();
    }

    update() {
        this.draw();
        this.x += this.dx;
        this.y += this.dy;

        // Bounce enemies off left and right sides of canvas
        if(this.x - this.rad <= 0  || this.x + this.rad >= width){
            this.dx =- this.dx;
        }
    }
}

// Create a 'Projectile' class
class Projectile {
    constructor(x, y, radius, color, dy) {
        this.x = x;
        this.y = y;
        this.rad = radius;
        this.color = color;
        this.dy = dy;
    }

    draw() {
        c.beginPath();
        c.arc(this.x, this.y, this.rad, 0, Math.PI * 2);
        c.fillstyle = this.color;
        c.fill();
    }

    update() {
        this.draw();
        this.y -= this.dy;
    }
}

// Create a 'Particle' class
class Particle {
    constructor(x, y, radius, color, dx, dy) {
        this.x = x;
        this.y = y;
        this.rad = radius;
        this.color = color;
        this.dx = dx;
        this.dy = dy;
        this.alpha = 1;
    }

    draw() {
        // Use c.save() and c.restore() so that transperency value of all other objects
        // except particles remains unchanged
        c.save();
        c.globalAlpha = this.alpha;
        c.beginPath();
        c.arc(this.x, this.y, this.rad, 0, Math.PI * 2);
        c.fillStyle = this.color;
        c.fill();
        c.restore();
    }

    update() {
        this.draw();
        this.x += this.dx;
        this.y += this.dy;

        // Decrease 'alpha' so that transperency value of the particles can decrease over time
        this.alpha -= 0.01;
    }
}