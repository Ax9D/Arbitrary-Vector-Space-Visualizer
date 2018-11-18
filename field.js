paddingX=7.5;
paddingY=4;

class Field {
    constructor(fn_pos)
    {
        this.fn_pos=fn_pos;
    }
    getField(pos) {
        return this.fn_pos(pos);
    }
}

function drawField(fields,col,xint,yint)
{
    for(let i=0+paddingX;i<800;i+=xint)
    {
        for(let j=0+paddingY;j<600;j+=yint)
        {
            let curPos=new Vector(i,j);

            superpose(fields,curPos).draw(curPos,col);
        }
    }
}