var sin = Math.sin;
var cos = Math.cos;
var PI = Math.PI;

function round(number, toNearest){
    var rounded = Math.round(toNearest * number) / toNearest;
    console.log('rounded', rounded);
    return rounded;
};

function Sensor(radius, theta, offset, response) {
    var phi = offset + response;
  
	this.xOfSource = radius * round(cos(theta), 1e3);
	this.yOfSource = radius * round(sin(theta), 1e3);

	this.xOfDirection = round(cos(phi), 1e3);
	this.yOfDirection = round(sin(phi), 1e3);
};


var sensor1 = new Sensor(3, 0, 0, 3*PI/4);
var sensor2 = new Sensor(1.2, PI, 0, PI/4);

console.log('sensor1.xOfSource', sensor1.xOfSource)
console.log('sensor1.yOfSource', sensor1.yOfSource)
console.log('sensor2.xOfSource', sensor2.xOfSource)
console.log('sensor2.yOfSource', sensor2.yOfSource)
console.log('sensor1.xOfDirection', sensor1.xOfDirection)
console.log('sensor1.yOfDirection', sensor1.yOfDirection)
console.log('sensor2.xOfDirection', sensor2.xOfDirection)
console.log('sensor2.yOfDirection', sensor2.yOfDirection)

var dx = sensor2.xOfSource - sensor1.xOfSource;
var dy = sensor2.yOfSource - sensor1.yOfSource;
console.log('dx', dx)
console.log('dy', dy)

var det = (sensor2.xOfDirection * sensor1.yOfDirection) - (sensor2.yOfDirection * sensor1.xOfDirection);
det = round(det, 1e6);
console.log('det',det);

var u = ((dy * sensor2.xOfDirection) - (dx * sensor2.yOfDirection)) / det;
var v = ((dy * sensor1.xOfDirection) - (dx * sensor1.yOfDirection)) / det;
console.log('u',u);

var pXA = sensor1.xOfSource + sensor1.xOfDirection * u;
var pXB = sensor2.xOfSource + sensor2.xOfDirection * v;

var pYA = sensor1.yOfSource + sensor1.yOfDirection * u;
var pYB = sensor2.yOfSource + sensor2.yOfDirection * v;

console.log('pXA', pXA);
console.log('pXB', pXB);
console.log('pYA', pYA);
console.log('pYB', pYB);

var d = document;
var body = d.body;

var sensor1Div = d.createElement('div');
sensor1Div.style.width = '1rem';
sensor1Div.style.height = '1.5rem';
sensor1Div.style.backgroundColor = 'green';
sensor1Div.style.position = 'absolute';
sensor1Div.style.x = sensor1.xOfSensor;
sensor1Div.style.y = sensor1.yOfSensor;

body.appendChild(sensor1Div);
console.log('body', body)

