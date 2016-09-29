function Sensor(radius, theta, offset, response) {
	var phi = offset + response;
  
	function round(number){
		var roundPoint = 1e3;
		return Math.round(roundPoint * number) / roundPoint);
	};
	var sin = Math.sin;
	var cos = Math.cos;

	this.xOfSource = radius * round(cos(theta));
	this.yOfSource = radius * round(sin(theta));

	this.xOfDirection = round(cos(phi));
	this.yOfDirection = round(sin(phi));
};


var sensor1 = new Sensor(10, 0, 0, 3*Math.PI/4);
var sensor2 = new Sensor(20, Math.PI, 0, Math.PI/4);

console.log('sensor1.xOfSource', sensor1.xOfSource)
console.log('sensor1.yOfSource', sensor1.yOfSource)
console.log('sensor2.xOfSource', sensor2.xOfSource)
console.log('sensor2.yOfSource', sensor2.yOfSource)

var dx = sensor2.xOfSource - sensor1.xOfSource;
var dy = sensor2.yOfSource - sensor1.yOfSource;

var det = (sensor2.xOfDirection * sensor1.yOfDirection) - (sensor2.yOfDirection * sensor1.xOfDirection);

var u = ((dy * sensor2.xOfDirection) - (dx * sensor2.yOfDirection)) / det;
var v = ((dy * sensor1.xOfDirection) - (dx * sensor1.yOfDirection)) / det;

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


console.log('body', body)

