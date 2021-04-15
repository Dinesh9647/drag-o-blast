/* Define classes for power-ups and add draw and update method to the classes */

// Function to create a special gradient color for power-ups
function generate_gradcolor(x, y, r1, r2) {
    var grd_color = c.createRadialGradient(x, y, r1, x, y, r2);
    grd_color.addColorStop(0, "#fc575e");
    grd_color.addColorStop(1, "#90d5ec");
    return grd_color;
}

// Create a 'Powerup' class
class Powerup {
    constructor(x, y, radius, dx) {
        this.x = x;
        this.y = y;
        this.rad = radius;
        this.dx = dx;
    }

    draw() {
        c.beginPath();
        c.arc(this.x, this.y, this.rad, 0, Math.PI * 2);
        c.fillStyle = this.color;
        c.fill();
    }

    update() {
        // Position of the gradient color changes with power-ups
        this.color = generate_gradcolor(this.x, this.y, 10, this.rad);
        this.draw();
        this.x += this.dx;
    }
} 

// Create a 'Ring' class 
class Ring {
    constructor(x, y, radius, color, dr, dx) {
        this.x = x;
        this.y = y;
        this.rad = radius;
        this.color = color;
        this.dr = dr;
        this.dx = dx;
        this.alpha = 1;
    }

    draw() {
        c.save();
        c.globalAlpha = this.alpha;
        c.beginPath();
        c.arc(this.x, this.y, this.rad, 0, Math.PI*2);
        c.strokeStyle = this.color;
        c.stroke();
        c.restore();
    }

    update() {
        this.draw();
        this.x += this.dx;
        this.rad += this.dr;
        this.alpha -= 0.018;
    }
}