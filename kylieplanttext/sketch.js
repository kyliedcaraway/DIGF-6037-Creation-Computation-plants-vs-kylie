/*
Plants vs. Kylie
 Kylie Caraway
 OCAD Digital Futures
 Creation and Computation DIGF 6037

 Code sources:
 Sending data to Adafruit: Kate Hartman and Nick Puckett
 Receiving data from Arduino: ITP Physical computing

*/

var serial;          // variable to hold an instance of the serialport library
var portName = 'COM3'; //portname
var inData; // data variable coming from Arduino
var xPos = 0;  // fill in your serial port name here
var happygif;
var angrygif;
var sensorgif;
var aiokey = "d65cb58df8d347cf8f18dff4121661f8";//get this from your account
var userName = "kyliecaraway"; //get this from your account
var channelName1 = "kylieplantmoisture"; //choose a name
var channelName2 = ""; //choose a name
var pollingRate = 60000; // timer
var lastCheck = 0;


function preload() {
  happygif = loadGif("assets/happyplant.gif");
  angrygif = loadGif("assets/angryplant.gif");
  sensorgif = loadGif("assets/sensor.gif");

}
function setup() {

  serial = new p5.SerialPort();       // make a new instance of the serialport library
  serial.on('list', printList);  // set a callback function for the serialport list event
  serial.on('connected', serverConnected); // callback for connecting to the server
  serial.on('open', portOpen);        // callback for the port opening
  serial.on('data', serialEvent);     // callback for when new data arrives
  serial.on('error', serialError);    // callback for errors
  serial.on('close', portClose);      // callback for the port closing

  serial.list();                      // list the serial ports
  serial.open(portName);              // open a serial port

  createCanvas(windowWidth, windowHeight);
  background(60, 58, 50);
}

function printList(portList) {
 // portList is an array of serial port names
 for (var i = 0; i < portList.length; i++) {
 // Display the list the console:
 console.log(i + " " + portList[i]);
 }
}

function serverConnected() {
  console.log('connected to server.');
}

function portOpen() {
  console.log('the serial port opened.')
}

function serialEvent() {
  // read a string from the serial port:
   var inString = serial.readLine();
   // check to see that there's actually a string there:
   if (inString.length > 0 ) {
   // convert it to a number:
   inData = Number(inString);
   }
}

function serialError(err) {
  console.log('Something went wrong with the serial port. ' + err);
}

function portClose() {
  console.log('The serial port closed.');
}


function draw() {

  console.log(inData);
   background(60, 58, 50);
   fill(255);

   if (inData > 40 && inData < 100){  // if plant moisture is between 40 and 100 %
     imageMode(CENTER);
     image(angrygif, (windowWidth/2), ((windowHeight/2)-20));
   } else if (inData < 40) { // if plant moisture is less than 40
     imageMode(CENTER);
     image(happygif, (windowWidth/2), ((windowHeight/2)-20));
   } else if (inData = 100) { // if plant moisture is equal to 100
     imageMode(CENTER);
     image(sensorgif, (windowWidth/2), ((windowHeight/2)-20));
   }

   textSize(20);
   text("Plant Moisture: " + inData + "% Dry", ((windowWidth/2)-100), ((windowHeight/2)+340)); // display moisture percentage

   if(millis()-lastCheck>=pollingRate)
{
  var randVal1 = inData;
  iftttSend1(userName,aiokey,channelName1,randVal1); // send data to adafruit
 lastCheck=millis();
}
}


function windowResized()
{
  resizeCanvas(windowWidth, windowHeight);
}


function iftttSend1(uName, key, cName, cVal)
{
var sendURL = ("https://io.adafruit.com/api/groups/"+uName+"/send.json?x-aio-key="+key+"&"+cName+"="+cVal);
httpGet(sendURL);
}

function iftttSend2(uName, key, cName1, cVal1, cName2, cVal2)
{
var sendURL = ("https://io.adafruit.com/api/groups/"+uName+"/send.json?x-aio-key="+key+"&"+cName1+"="+cVal1+"&"+cName2+"="+cVal2);
httpGet(sendURL);
}
