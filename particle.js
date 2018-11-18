velThresh=10;
accThresh=20;
class Particle {
    constructor(mass, pos, rad) {
        this.mass = mass;
        this.pos = pos;
        this.rad = rad;
        this.vel = new Vector(0, 0);
        this.acc = new Vector(0, 0);
    }
    applyForce(f) {
        let newAcc=this.acc.add(f.scalarDiv(this.mass));

        if(newAcc.getMag()<=accThresh)
            this.acc=newAcc;

        //console.log("Applying");
    }
    update() {
        let newVel=this.vel.add(this.acc);

        if(newVel.getMag()<=velThresh)
            this.vel=newVel;
        
        this.pos=this.pos.add(this.vel);

    }
    draw() {
        ellipse(this.pos.x, this.pos.y, this.rad, this.rad);
    }

}