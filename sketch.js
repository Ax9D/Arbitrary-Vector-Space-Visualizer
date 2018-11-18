particles = [];
fields = [];
time=0;
maxTime=200000;
var vec;

var tM;
function randomCrap() {
    red = [225, 100, 0];
    green = [76, 219, 129];
    blue = [0, 0, 255];
    white = [255, 255, 255];
    black = [0, 0, 0];
}
function setup() {

    rectMode(CENTER);
    //vec=new Vector(1,-1);
    tM=0;
    randomCrap();
    var uniformField = new Field(function (pos) { return new Vector(0, pos.x>200?-0.005:0); });
    var uniformTVField = new Field(function (pos) { return new Vector(pos.x>=400?0.001:0,0); });
    var xsqrField = new Field(function (pos) { return new Vector(pos.x, pos.y**2).scalarMult(0.0001); });
    
    createCanvas(800, 600);
    //generate particles at random locations
   /*
    for (let i = 1; i <= 50; i++) {
        let x = Math.floor(Math.random() * 800);
        let y = Math.floor(Math.random() * 600);
        let r = 30;
        let mass=50;
        mass=/*Math.random()*mass+10;
        tM+=mass;
        particles.push(new Particle(mass, new Vector(x, y), r));
    }
    */
    
    //particles.push(new Particle(50,new Vector(100,100),30));
    //fields.push(uniformField);
    //fields.push(customField);
    //fields.push(uniformTVField);
    //fields.push(customField);
    //fields.push(xsqrField);
    
    exampleSituation();

}
function exampleSituation()
{
       var customField=new Field(function (pos){
        if(pos.x<=400)
                return new Vector(0,0);
        else
            return new Vector(0,-1).scalarMult(0.01);
    });
    
       
       
       
       
    
    
    particles.push(new Particle(10,new Vector(0,500),30));
    particles.push(new Particle(5,new Vector(200,200),30));
    particles.push(new Particle(1,new Vector(500,100),30));
    particles[0].vel.x=2;
    particles[1].vel=new Vector(1,1).scalarMult(2);
    particles[2].vel=new Vector(-1,1).scalarMult(10);
    fields.push(customField);
}
function drawCentreOfMass(pos)
{
    push();
        fill(0,255,0);
        ellipse(pos.x,pos.y,20,20);
    pop();    
}
function draw() {
    background(127);

    //Update
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            applyCoulombic(particles[i], particles[j]);
            handleColl(particles[i], particles[j]);
        }
    }
    let netField;
    let com=new Vector(0,0);
    particles.forEach(function (p) {

        netField = superpose(fields, p.pos);
        p.applyForce(netField.scalarMult(p.mass));

        p.update();
        com.x+=p.pos.x*p.mass;
        com.y+=p.pos.y*p.mass;
    });
        com=com.scalarDiv(tM);
    //Draw
    drawField(fields, red, 25, 25);
    drawCentreOfMass(com);
    //vec.draw(new Vector(200,200),red);

    for (let i = 0; i < particles.length; i++)
        particles[i].draw();
    time=(time+0.05)%maxTime;
}
