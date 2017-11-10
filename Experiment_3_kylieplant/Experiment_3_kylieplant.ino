// Kylie Caraway
//Digital Futures, Creation and Computation DIGF 6037
//Resources for Code: Creatron INC. and ITP Physical Computing
// Dry Soil = 40-100%
// Wet Soil = 0-40%

int sensorPin = A0;    // select the input pin for the soil sensor
int sensorValue = 0;  // variable to store the value coming from the sensor

void setup() {
  // declare the ledPin as an OUTPUT:
   Serial.begin(9600); // initialize serial communications
}

void loop() {
  // read the value from the sensor:
  sensorValue = analogRead(sensorPin);    
  delay(1000); // check every 1 second          
  int mappedMoisture = map(sensorValue, 0, 1023, 0, 100); // remap the value to fit in percentile
 Serial.println(mappedMoisture); // print it out the serial port

}
