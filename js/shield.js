/* Define a 'Shield' class and add draw method to it */
class Shield{
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