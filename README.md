# Field-and-Particle-Simulation

Basic Mass/Charge Particle simulation written in JS using p5.js for rendering, with fully programmable fields (using lambdas).
The lambda should take a position and define the field at that position (by returning a vector object).
E.g.

```javascript
var f=new Field(function(pos)
	{
			if(pos.x<=100)
				return new Vector(0.001,0);
			else
				return new Vector(1,pos.y**2);
	});
```

This field objects represents a field which is uniform in the region x=0 to x=100(given by 0.001 i) and has the vector form of i + y^2 j 
where i and j are the orthogonal base vectors (directed horizontally and downwards respectively) and x and y (pos.x and pos.y) are the distances 
from the the top left of the canvas.

Fields can also be visualized using the drawField function.

Superposition of fields is also supported.
Also the green circle is the centre of mass/charge.

