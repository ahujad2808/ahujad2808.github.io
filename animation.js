class Animation {
  constructor(canvasId) {
      this.canvas = document.getElementById('myCanvas');
      this.canvas.style.backgroundImage = "url('assets/background.jpg')";  
      this.canvas.style.backgroundSize = "cover";
      this.canvas.style.backgroundRepeat = "no-repeat";
      this.canvas.style.position = "relative";
      this.ctx = this.canvas.getContext('2d');

      this.ballX = 350;
      this.ballY = 540;
      this.personX = 250;
      this.personY = 500;
      this.kicking = false;
      this.kicked = false;
      this.legPosition = 0;
      this.rotationAngle = 0;
      this.stopLen;
      this.clouds = [
                    { x: 100, y: 100, width: 100, height: 50, speed: 2 }, 
                    { x: 300, y: 150, width: 120, height: 60, speed: 1.6 }, 
                    { x: 500, y: 200, width: 110, height: 55, speed: 2.4 } 
                ]; 
     this.sunAngle = 0; // For sun rotation
      

  }

  draw() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
     
      this.drawSun(); // Add sun drawing function
      this.drawGoalPost();
      this.drawBall();
      this.drawPerson();
      this.drawClouds();
    //   this.drawRainbow();
      requestAnimationFrame(() => this.draw());
  }

  drawGoalPost() {
      this.ctx.fillStyle = "#006367";
      this.ctx.fillRect(700, 370, 8, 200);

      this.ctx.strokeStyle = "#006367";
      this.ctx.lineWidth = 1;
      this.ctx.beginPath();
      for (let i = 0; i <= 18; i++) {
          this.ctx.moveTo(705, 370 + i * 10);
          
          this.ctx.lineTo(730 + i * 10, 570);
          
      }
   
      this.ctx.moveTo(700, 570);
      this.ctx.lineTo(900, 571);
      this.ctx.stroke();
  }

  drawBall() {
      this.ctx.save();
      this.ctx.translate(this.ballX, this.ballY);

      this.ctx.fillStyle = "#ff8c00";
      this.ctx.beginPath();
      this.ctx.rotate(this.rotationAngle * Math.PI / 180);
      this.ctx.arc(0, 0, 10, Math.PI, 0, false);
      this.ctx.fill();

      this.ctx.fillStyle = "#1470cf";
      this.ctx.beginPath();
      this.ctx.rotate(Math.PI);
      this.ctx.arc(0, 0, 10, Math.PI, 0, false);
      this.ctx.fill();

      this.ctx.restore();
  }

  drawPerson() {
    
      this.ctx.fillStyle = "#566D7E";

      if (!this.kicked && this.ballX < 700) {
          this.personX += 0.5;
      }

      this.ctx.beginPath();
      this.ctx.arc(this.personX + 15, this.personY - 5, 10, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.lineWidth = 3.0;
      this.ctx.fillRect(this.personX + 10, this.personY - 10, 10, 40);

      this.ctx.strokeStyle = "#566D7E";
      this.ctx.beginPath();
      this.ctx.moveTo(this.personX + 10, this.personY + 5);
      this.ctx.lineTo(this.personX + 0, this.personY + 20);
      this.ctx.moveTo(this.personX + 20, this.personY + 5);
      this.ctx.lineTo(this.personX + 30, this.personY + 20);
      this.ctx.stroke();

      this.ctx.beginPath();
      if(this.stopLen == 10){
          this.ctx.moveTo(this.personX + 10, this.personY + 30);
          this.ctx.lineTo(this.personX + 0, this.personY + 40);
          this.ctx.moveTo(this.personX + 20, this.personY + 30);
          this.ctx.lineTo(this.personX + 30, this.personY + 40 - (this.legPosition - 10));
      }
      else {
          if (this.legPosition <= 10) {
              this.ctx.moveTo(this.personX + 10, this.personY + 30);
              this.ctx.lineTo(this.personX + 0, this.personY + 50 - this.legPosition);
          } else {
              this.ctx.moveTo(this.personX + 10, this.personY + 30);
              this.ctx.lineTo(this.personX + 0, this.personY + 40);
              this.ctx.moveTo(this.personX + 20, this.personY + 30);
              this.ctx.lineTo(this.personX + 30, this.personY + 50 - (this.legPosition - 10));
          }
      }
      this.ctx.stroke();

      if (!this.kicked && this.ballX < 500) {
          this.legPosition += 0.75;
          if (this.legPosition >= 20) {
              this.legPosition = 0;
          }
      }

      if (this.kicked) {
          const angleInRadians = 9 * Math.PI / 180;
          const speed = 2;
          const vx = Math.cos(angleInRadians) * speed;
          const vy = Math.sin(angleInRadians) * speed;

          this.ballX += vx;
          this.ballY -= vy;
          this.rotationAngle += 5;

          if (this.ballX >= 700) {
              this.personX = 250;
              this.ballX = 350;
              this.ballY = 540;
              this.kicked = false;
              this.kicking = false;
              this.stopLen = 0;
          }
      }

      if (!this.kicking && !this.kicked && this.personX + 40 >= this.ballX) {
          this.kicking = true;
          this.kicked = true;
          this.stopLen = 10;
      }
  }


  drawCloud(cloud) {
    this.ctx.beginPath();
    this.ctx.moveTo(cloud.x, cloud.y + cloud.height / 2);

    this.ctx.bezierCurveTo(
        cloud.x + cloud.width / 4, cloud.y,
        cloud.x + cloud.width / 2, cloud.y - cloud.height / 2,
        cloud.x + cloud.width, cloud.y + cloud.height / 2
    );
    this.ctx.bezierCurveTo(
        cloud.x + cloud.width * 1.2, cloud.y + cloud.height / 2,
        cloud.x + cloud.width * 1.2, cloud.y + cloud.height * 0.8,
        cloud.x + cloud.width, cloud.y + cloud.height
    );
    this.ctx.bezierCurveTo(
        cloud.x + cloud.width / 2, cloud.y + cloud.height * 1.3,
        cloud.x + cloud.width / 4, cloud.y + cloud.height * 1.3,
        cloud.x, cloud.y + cloud.height
    );
    this.ctx.bezierCurveTo(
        cloud.x - cloud.width * 0.2, cloud.y + cloud.height * 0.8,
        cloud.x - cloud.width * 0.2, cloud.y + cloud.height / 2,
        cloud.x, cloud.y + cloud.height / 2
    );

    this.ctx.closePath();
    this.ctx.fillStyle = '#E4E3EB';
    this.ctx.fill();
}

drawClouds() {
    this.clouds.forEach(cloud => {
        cloud.x += cloud.speed; 
        if (cloud.x > this.canvas.width) { 
            cloud.x = -cloud.width;
        }
        this.drawCloud(cloud);
    });
}

drawSun() {
    const sunRadius = 40;
    const sunX = this.canvas.width - sunRadius - 100; // Adjust position as needed
    const sunY = sunRadius + 60; // Adjust position as needed
    const numRays = 12; // Number of rays

    this.ctx.save();
    this.ctx.translate(sunX, sunY);
    this.ctx.rotate(this.sunAngle * Math.PI / 180); // Rotate sun

    // Draw sun rays
    this.ctx.strokeStyle = "#FFD700"; // Yellow
    this.ctx.lineWidth = 2; // Adjust thickness as needed
    this.ctx.beginPath();
    for (let i = 0; i < numRays; i++) {
        const angle = (i / numRays) * Math.PI * 2;
        const x1 = Math.cos(angle) * sunRadius;
        const y1 = Math.sin(angle) * sunRadius;
        const x2 = Math.cos(angle) * (sunRadius + 20); // Length of rays
        const y2 = Math.sin(angle) * (sunRadius + 20); // Length of rays
        this.ctx.moveTo(x1, y1);
        this.ctx.lineTo(x2, y2);
    }
    this.ctx.stroke();

    // Draw sun circle
    this.ctx.fillStyle = "#FFD700"; // Yellow
    this.ctx.beginPath();
    this.ctx.arc(0, 0, sunRadius, 0, Math.PI * 2);
    this.ctx.fill();

    this.ctx.restore();

    this.sunAngle += 0.2; // Increment angle for rotation animation
}


}