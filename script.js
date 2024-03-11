// declaring the canvas from html as a constant and setting the dimensions
const canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;      
canvas.height = window.innerHeight;

// preparing the animation variables
const ctx = canvas.getContext('2d');
const particleArray = [];
const particleColor = ["#4afc46", "#fcf746","#fc7346", "black", "#fc46f5", "#4687fc"];
// const a = new Audio("/assets/movie_1.mp3");

// Particle Class
class Particle{
constructor(){
        //sets spawn point to center of canvas
        this.x = canvas.getBoundingClientRect().left + 125; 
        this.y = canvas.getBoundingClientRect().top + 125;
        //sets size of ball
        this.size = 25;
        //sets speed of ball
        this.speedx = Math.random() * 20 - 10; //the 20-10 ensures that the  
        this.speedy = Math.random() * 20 - 10; //direction can either be + or - 
        this.color = particleColor[Math.floor(Math.random()*6+1)]; //random generate ini color
        // this.sound = a;
     }
     update(){
        //updates the ball location on each frame
         this.x += this.speedx;
         this.y += this.speedy;
        
        // checks ball collisions against walls of canvas in both axis
         if(this.x + this.speedx > canvas.width - this.size || 
            this.x + this.speedx < this.size){
                    let newColor = Math.floor(Math.random()*(6+1));
                    this.speedx = -this.speedx;
                    this.color = particleColor[newColor];
                    // this.sound.play();
         }
         if(this.y + this.speedy > canvas.height - this.size || 
            this.y + this.speedy < this.size){
                    let newColor = Math.floor(Math.random()*(6+1));
                    this.speedy = -this.speedy;
                    this.color = particleColor[newColor];
                    // this.sound.play();
         }
     }  
    draw(color){
        //drawing the ball at each call
         ctx.beginPath();
         ctx.fillStyle = this.color;
         ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
         ctx.fill();
         ctx.closePath();
     }
 }

 // initiliazes the animation by creating two instances of the ball
 function initialize(){
    for(let i = 0; i < 2; i++){
      particleArray.push(new Particle());
    }
}

 // handles aniamtion by drawing and updating ball at each frame
 function handle(){
     for (let x = 0; x < particleArray.length; x++){
         particleArray[x].draw();
         particleArray[x].update();

     } 
 }

 // recursion loop for continuous animation 
 function animate(){
     ctx.clearRect(0,0,canvas.width,canvas.height); // prevents trail
     handle();
     requestAnimationFrame(animate);
 }
 
 //runs code
    initialize();
    animate();
