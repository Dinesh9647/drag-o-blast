/* Create all the animations for the game */

var Highscore = 0;
var start_button = document.getElementById("startButton"); 

// If #startButton is clicked then start the game
start_button.addEventListener("click", function() {
    document.getElementById("game_menu").classList.add("hide_menu");
    document.getElementById("score").innerHTML = "Score: 0";

    const back_music = new Audio("audio/background_music.mp3");
    const shoot_sound = new Audio("audio/lasergun.mp3");
    const burst_sound = new Audio("audio/hitsound.mp3");
    const fail_sound = new Audio("audio/game_over.mp3");
    back_music.volume = 0.6;
    shoot_sound.volume = 0.3;
    back_music.loop = true;
    shoot_sound.loop = true;

    // Play the background music and laser gun sound
    back_music.play();
    shoot_sound.play();

    var gap = 0;
    var interval = 0;
    var Score = 0;
    var shield_duration = 0;
    cnt = 1;
    player.x = width / 2;
    player.y = (4 * height) / 5;

    var shield_on = false;
    var gameOver = false;
    var destroyed = false;

    var projectiles = [];
    var particles = [];
    var rings = [];
    enemies = [];
    powerups = [];

    clearInterval(intervalID1);
    clearInterval(intervalID2);

    // Animation loop
    function animate() {
        c.clearRect(0, 0, width, height);

        // Draw the outer and inner shield around the player if shield mode is on 
        if(shield_on == true) {
            if(shield_duration <= 550) {
                out_shield.draw();
                in_shield.draw();
                out_shield.x = player.x;
                in_shield.x = player.x;
                shield_duration++;
            }
            else {
                shield_duration = 0;
                shield_on = false;
            }
        }

        player.draw();

        particles.forEach((particle, idx) => {
            if(particle.alpha <= 0) {
                particles.splice(idx, 1);
            }
            else {
                particle.update();
            }
        });

        // Push Projectiles into the array at a regular time interval 
        if(interval % 6 == 0) {
            projectiles.push(new Projectile(player.x, player.y, 5, "#ffffff", 6));
            interval = 0;
        }

        // Draw and update the burst particles
        projectiles.forEach((projectile, idx) => {
            projectile.update();
            projectile.x = player.x;
            if(projectile.y + projectile.rad <= 0) {
                projectiles.splice(idx, 1);
            }
        });
        
        powerups.forEach((powerup, idx) => {

            // Push rings into the array at a regular time interval after power-up occurs
            if(gap % 40 == 0) {
                let mn = powerup.rad + 1;
                for(let i = 0; i < 5; i++) {
                    rings.push(new Ring(powerup.x, powerup.y, mn, "#ffd700", 0.5, powerup.dx));
                    mn += 1;
                }
                gap = 0;
            }

            // Draw rings around power-up and update 
            rings.forEach((ring, ind) => {
                if(ring.alpha <= 0) {
                    setTimeout(() => {
                        rings.splice(ind, 1);
                    });
                }
                else {
                    ring.update();
                }
            });
            gap++;
            powerup.update();


            for(let i = 0; i < projectiles.length; i++) {
                let dist = distance(powerup.x, powerup.y, projectiles[i].x, projectiles[i].y);

                // If power-up is hit by projectile then reduce its radius and if radius becomes <=20
                // then make the power-up disappear and shield mode on
                if(dist < powerup.rad + projectiles[i].rad + 10) {
                    if(dist < powerup.rad + projectiles[i].rad) {
                        powerup.rad -= 0.5;
                        rings.forEach((ring) => {
                            ring.rad -= 0.5;
                        });
                        if(powerup.rad <= 20) {
                            burst_sound.play();
                            powerups = [];
                            rings = [];
                            shield_on = true;
                            break;
                        }
                    }

                    // Remove projectile after hitting power-up
                    if(projectiles[i].y - projectiles[i].rad < powerup.y - powerup.rad) {
                        projectiles.splice(i, 1);
                    }
                }
            } 
        
            if(powerup.x - powerup.rad + 10 >= width) {
                powerups = [];
                rings = [];
            }
        });

        for(var i = 0; i < enemies.length; i++) {
            destroyed = false;
            enemies[i].update();

            // If shield mode is on then destroy all the enemies which touch the shield
            if(shield_on == true){
                if(distance(enemies[i].x, enemies[i].y, player.x, player.y) < enemies[i].rad + out_shield.rad - 2.7) {
                    burst_sound.currentTime = 0;
                    burst_sound.play();
                    Score += parseInt(enemies[i].rad);
                    if(Score != 0 && Score % 6000 == 0) {
                        if(cnt < 5) {
                            cnt += 0.5;
                        }
                        else {
                            cnt = 5;
                        }
                    }

                    document.getElementById("score").innerHTML = "Score: " + Score;
                    document.getElementById("final_score").innerHTML = Score;
                    Highscore = Math.max(Highscore, Score);
                    document.getElementById("high_score").innerHTML = Highscore;
                    var p_velocity = {
                        dx: getRandomInRange(-4,4),
                        dy: getRandomInRange(-4,4)
                    }
                    if(p_velocity.dx == 0) {
                        p_velocity.dx = 1;
                    }
                    if(p_velocity.dy == 0) { 
                        p_velocity.dy = 1;
                    }

                    // Push burst particles into the array
                    for(var k = 0; k < 3 * enemies[i].rad; k++) {
                        particles.push(new Particle(enemies[i].x, enemies[i].y, 
                        getRandomInRange(enemies[i].rad/15,enemies[i].rad/30), enemies[i].color, 
                        p_velocity.dx, p_velocity.dy));
                    }
                    enemies.splice(i, 1);
                    continue;
                }
            }
 
            // If an enemy hits the player when shield mode is off then game over is true and game menu
            // reappears on the screen
            else if(distance(enemies[i].x, enemies[i].y, player.x, player.y) < enemies[i].rad + player.rad - 2.7) {
                back_music.pause();
                shoot_sound.pause();
                fail_sound.play();
                document.getElementById("game_menu").classList.remove("hide_menu");
                document.getElementById("startButton").innerHTML = "Retry";
                gameOver = true;
            }

            // Reduce the radius of an enemy if it is hit by a projectile and if radius becomes <=25
            // then remove the enemy 
            for(var j = 0; j < projectiles.length; j++) {
                let dist = distance(projectiles[j].x, projectiles[j].y, enemies[i].x, enemies[i].y);
                if(dist < enemies[i].rad + projectiles[j].rad + 10) {
                    if(dist < enemies[i].rad + projectiles[j].rad) {
                        Score += 20;
                        if(Score != 0 && Score % 6000 == 0) {
                            if(cnt < 5) {
                                cnt += 0.5;
                            }
                            else {
                                cnt = 5;
                            }
                        }
                        document.getElementById("score").innerHTML = "Score: " + Score;
                        document.getElementById("final_score").innerHTML = Score;
                        Highscore = Math.max(Highscore, Score);
                        document.getElementById("high_score").innerHTML = Highscore;
                        var p_velocity = {
                            dx: getRandomInRange(-4,4),
                            dy: getRandomInRange(-4,4)
                        }
                        if(p_velocity.dx == 0) {
                            p_velocity.dx = 1;
                        }
                        if(p_velocity.dy == 0) {
                            p_velocity.dy = 1;
                        }

                        // Push burst particles into the array
                        for(var k = 0; k < enemies[i].rad / 12; k++) {
                            particles.push(new Particle(projectiles[j].x, enemies[i].y + enemies[i].rad, 
                            getRandomInRange(enemies[i].rad/15,enemies[i].rad/30), enemies[i].color, 
                            p_velocity.dx, p_velocity.dy));
                        }
                        enemies[i].rad -= 0.6;

                        if(enemies[i].rad <= 25) {
                            burst_sound.currentTime = 0;
                            burst_sound.play();
                            enemies.splice(i, 1);
                            projectiles.splice(j, 1);
                            destroyed = true;
                            break;
                        }
                    }

                    if(projectiles[j].y - projectiles[j].rad <= enemies[i].y - enemies[i].rad) {
                        projectiles.splice(j, 1);
                    }
                }
            }

            if(destroyed == false && enemies[i].y - enemies[i].rad >= height) {
                setTimeout(() => {
                    enemies.splice(i, 1);
                }, 0);
            }
        }
        interval++;
        if(gameOver == false){
            requestAnimationFrame(animate);
        }
    }
    animate();
    constructEnemy();
    constructPowerup();
});