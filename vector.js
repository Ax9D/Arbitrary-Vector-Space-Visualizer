const l=15;
const w=3;
class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    add(v2) {
        return new Vector(this.x + v2.x, this.y + v2.y);
    }
    dist(v2) {
        return this.add(v2.negate()).getMag();
    }
    dot(v2) {
        return this.x * v2.x + this.y * v2.y;
    }
    scalarOperate(op) {
        let res = new Vector(op(this.x), op(this.y));
        return res;
    }
    scalarDiv(k) {
        return this.scalarOperate(function (val) {
            return val / k;
        }
        );
    }
    scalarMult(k) {
        return this.scalarOperate(function (val) {
            return val * k;
        }

        );
    }
    negate() {
        return this.scalarMult(-1);
    }
    getMag() {
        return Math.sqrt(this.x ** 2 + this.y ** 2);
    }
    getUnit() {
        let mag = this.getMag();
        let unitVec = this.scalarOperate(
            function (val) {
                return val / mag;
            }
        );
        return unitVec;
    }


    draw(pos,col)
    {
        let mag=this.getMag();
        if(mag==0)
            return;
        push();
            let skew_f=mapSpc(mag,0.5,100,15,0);
            skew_f=Math.abs(skew_f);
            fill(col[0]+skew_f,col[1]+skew_f,col[2]+skew_f);
            translate(pos.x,pos.y);
            
            let unitVec=this.getUnit();
            let theta=Math.atan2(unitVec.y,unitVec.x);

            rotate(theta);
            rect(0,0,l,w);
            triangle(0+l/2,w*1.5,0+l/2,-w*1.5,l,0);
        pop();
    }
}