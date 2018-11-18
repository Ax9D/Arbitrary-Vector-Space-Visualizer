var k = 0.01;
var thresh = 5;
var constForce = 0.00001;

function applyCoulombic(p1, p2) {
    p1_pos = p1.pos;
    p2_pos = p2.pos;

    let vector_to_p1 = p1_pos.add(p2_pos.negate());
    let unit_vec_to_p1 = vector_to_p1.getUnit();

    //console.log(dist);

    let force_Mag;


    let dist = vector_to_p1.getMag();
    if (dist >= thresh) {
        force_Mag = k * p1.mass * p2.mass;
        force_Mag /= dist ** 2;
        //force_Mag=constForce;
    }
    else
        force_Mag = constForce;


    //Find force on p1 due to p2
    let forceVector = unit_vec_to_p1.negate().scalarMult(force_Mag);
    p1.applyForce(forceVector);

    //Find force on p2 due to p1
    forceVector = unit_vec_to_p1.scalarMult(force_Mag);
    p2.applyForce(forceVector);

}
function isColl(p1, p2) {
    //console.log("Radial:"+(p1.rad+p2.rad));
    //console.log("Dist:"+p1.pos.dist(p2.pos));
    if (p1.pos.dist(p2.pos) + 25 <= p1.rad + p2.rad) {
        //console.log(p1.pos.dist(p2.pos)-p1.rad-p2.rad);
        //p1.vel=new Vector(0,0);
        //p2.vel=new Vector(0,0);
        return true;
    }
    else
        return false;
}


function superpose(fields, pos) {
    let netField = new Vector(0, 0);
    for (let i = 0; i < fields.length; i++) {
        netField = netField.add(fields[i].getField(pos));
    }
    return netField;
}

function handleColl(p1, p2) {
    if (isColl(p1, p2)) {
        m1 = p1.mass;
        m2 = p2.mass;

        u1x = p1.vel.x;
        u2x = p2.vel.x;

        u1y = p1.vel.y;
        u2y = p2.vel.y;

        v1x = ((m1 - m2) / (m1 + m2)) * u1x + (2 * m2 / (m1 + m2)) * u2x;
        v1y = ((m1 - m2) / (m1 + m2)) * u1y + (2 * m2 / (m1 + m2)) * u2y;

        v2x = (2 * m1 / (m1 + m2)) * u1x - ((m1 - m2) / (m1 + m2)) * u2x;
        v2y = (2 * m1 / (m1 + m2)) * u1y - ((m1 - m2) / (m1 + m2)) * u2y;

        p1.vel = new Vector(v1x, v1y);
        p2.vel = new Vector(v2x, v2y);
    }
}