// short hand for mathematical operators and constants
var PI = Math.PI,
    sin = Math.sin,
    cos = Math.cos,
    atan = Math.atan,
    sqrt = Math.sqrt,
    pow = Math.pow,
    abs = Math.abs;

// rounds first argument to order of second argument
function round(number, toNearest){
    var rounded = Math.round(toNearest * number) / toNearest;
    return rounded;
};

// A class for creating sensors
function Sensor(radius, theta, offset, response) {
    // the angle that cooresponds to the direction vector is the inital offset plus the response angle measured by the sensor
    var phi = offset + response;
  
    // convert radius and theta into cartesian coordinates of the source vector
	this.xOfSource = radius * round(cos(theta), 1e3);
	this.yOfSource = radius * round(sin(theta), 1e3);

    // convert radius and theta into cartesian coordinates of the direction vector
	this.xOfDirection = round(cos(phi), 1e3);
	this.yOfDirection = round(sin(phi), 1e3);
};

// create our 2 sensors
var sensor1 = new Sensor(3, 0, 0, 3*PI/4);
var sensor2 = new Sensor(3, PI, 0, PI/4);

// difference between our two sensor locations
var dx = sensor2.xOfSource - sensor1.xOfSource;
var dy = sensor2.yOfSource - sensor1.yOfSource;

// determinate
var det = (sensor2.xOfDirection * sensor1.yOfDirection) - (sensor2.yOfDirection * sensor1.xOfDirection);
det = round(det, 1e6);

// mag factors for the direction vectors
var u = ((dy * sensor2.xOfDirection) - (dx * sensor2.yOfDirection)) / det;
var v = ((dy * sensor1.xOfDirection) - (dx * sensor1.yOfDirection)) / det;

// cartesian coordiantes of the intersection
var pXA = sensor1.xOfSource + sensor1.xOfDirection * u;
var pXB = sensor2.xOfSource + sensor2.xOfDirection * v;
var pYA = sensor1.yOfSource + sensor1.yOfDirection * u;
var pYB = sensor2.yOfSource + sensor2.yOfDirection * v;

// test that the two values for x & y of the intersection are the same (within a certain threshold)
(function coordinatesAgree() {
    var threshold = 1e-4;
    (function testXOfP(){
        if (abs(pXB - pXA) <= threshold) console.log('x coordinates agree');
        else console.error('x coordinates disagree');
    })();
    (function testYOfP(){
        if (abs(pYB - pYA) <= threshold) console.log('y coordinates agree');
        else console.error('y coordinates disagree');
    })();
})();

// returns the average of the two inputs
function avg(a, b) { return (a + b) / 2; };

var pX = avg(pXA, pXB);
var pY = avg(pYA, pYB);

// convert cartesian coordinates of intersection to polar coordinated
var pointRadius = sqrt(pow(pX,2) + pow(pY, 2));
var pointTheta = atan(pY / pX);
(function renderResults() {
        // short hand for document and document.body
        var d = document;
        var body = d.body;

        /* RADIUS */
        // establishing an element for everything pertaining to radius
        var rContainer = d.createElement('div');
        rContainer.className = 'rContainer';

        // creating an element to hold the radius value
        var pointRDiv = d.createElement('div');
        pointRDiv.id = 'pointR';
        // setting the contents of this element to be the value calculated for the radius of the intersection point
        pointRDiv.innerHTML = pointRadius;

        // creating an element for the radius label
        var rLabel = d.createElement('label');
        rLabel.htmlFor = 'pointR';
        rLabel.innerHTML = 'r';
        
        // adding label element to container div
        rContainer.appendChild(rLabel);
        // adding radius element to container div
        rContainer.appendChild(pointRDiv);

        /* THETA */
        // establishing an element for everything pertaining to theta
        var thetaContainer = d.createElement('div');
        thetaContainer.className = 'thetaContainer';

        // creating an element to hold the theta value
        var pointThetaDiv = d.createElement('div');
        pointThetaDiv.id = 'pointTheta';
        // setting the contents of this element to be the value calculated for the theta of the intersection point
        pointThetaDiv.innerHTML = pointTheta;

        // creating an element for the theta label
        var thetaLabel = d.createElement('label');
        thetaLabel.htmlFor = 'pointTheta';
        thetaLabel.innerHTML = 'theta';

        // adding label element to container div
        thetaContainer.appendChild(thetaLabel);
        // adding radius element to container div
        thetaContainer.appendChild(pointThetaDiv);

        // adding radius container element to the document body
        body.appendChild(rContainer);
        // adding theta container element to the document body
        body.appendChild(thetaContainer);
 })()

