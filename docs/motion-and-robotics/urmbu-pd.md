---
sidebar_position: 1
---
# Urumbu PD


 
## Intro

Ever Since I worked on the Urumbu Project in Kochi’s Fabacademy 2024 machine week I’m in love with the Modularity of the Urumbu project([link](https://mtm.cba.mit.edu/2021/2021-01_urumbu/)) which is by Neil,  What we Build in Kochi in 2024 is an simplest application of it. The Project called Cut Urumbu ([link](https://fabacademy.org/2024/labs/kochi/machine_week/Cut-Urumbu/)), its a simple cake cutting machine that the students made with the Urumbu Board([Link](https://github.com/saheenpalayi/Urumbu_Project-SMD11C_DRV8825)) I’ve designed  with DRV8825 motor drivers and SAMD.  The Main issue while working with this was that I need to plug different power to the board because the DRV8825 wont support under 8V ,  so in order to make it simple I either forcefully used to use a 5V motor driver which is hard to get in India or I should plug an external 12 V supply.

To resolve this I need a USB HUB which also have PD capabilities , which is very hard to get so I made one already , Now I can make the Urumbu PD project

### objectives

- Make a modified Urumbu board from original design
- add USB C PD capabilities
- Impliment both PD and Data capabilites at a time
- 

## **PD Sink Controller**

![image.png](attachment:860639a3-5a47-4eb6-b195-94f4d646e88d:image.png)

this is a Cheap PD sink controller available in the market and its from a Chinese Manufacturer WCH. and to do PD negotiation only , we don't need to connect the DM DP lines, and the datasheet provides a example working Circuit which I already tested with a DIY PD Sink Board I’ve made.  

## Voltage regulator

## Motor Driver

![Image Credits:-https://www.allegromicro.com/-/media/files/datasheets/a4952-3-datasheet.pdf](attachment:bb731181-f792-49b5-a82f-283ea8289262:image.png)

Image Credits:-https://www.allegromicro.com/-/media/files/datasheets/a4952-3-datasheet.pdf

We have the Allegro A4953 sitting in the lab and it works in the range of  8 - 40 VM at 2Amps , so this more than enough for now. And the circuit of the driver is simple just few components needed, I’ll be using 2 of these H bridges to drive the stepper motor.

**Schematic**

![image.png](attachment:bd7af934-c364-41d2-b241-4f8fdd72fed1:image.png)

**PCB layout**

![image.png](attachment:5299d767-1625-4056-a67f-50091f06b316:image.png)

## PD Blink (Switching across Voltage levels)

[20260422 175021.m4v](attachment:b0f4bf8e-2059-4638-8064-fad2a1f063bc:20260422_175021.m4v)

### PD blink code

```arduino
//
// hello.SAMD11.Urumbu.PD.Blink.ino
//    A SAMD11 chip connected with CH224K Sink controller's
//    Config pins to switch voltages (5V, 9V, 12V, 15V, 20V)
//
// Saheen Palayi 20-08-2025
//
// This work may be reproduced, modified, distributed,
// performed, and displayed for any purpose, but must
// acknowledge this project. Copyright is retained and
// must be preserved. The work is provided as is; no
// warranty is provided, and users accept all liability.
//

// defininf the SAMD pins connected to the CH224K
#define CFG1 9
#define CFG2 15
#define CFG3 31

// Function to select the voltage
void setVoltage(bool c1, bool c2, bool c3) {

  // Set CFG pins
  digitalWrite(CFG1, c1);
  digitalWrite(CFG2, c2);
  digitalWrite(CFG3, c3);
  
  delay(500);
}

void setup() {

// making all the pins output
  pinMode(CFG1, OUTPUT);
  pinMode(CFG2, OUTPUT);
  pinMode(CFG3, OUTPUT);

  delay(500);
}

void loop() {
  // Example sequence (adjust per your CH224 variant table)

  // Request 5V
  setVoltage(1, 0, 0);
  delay(4000);

  // Request 9V
  setVoltage(0, 0, 0);
  delay(4000);

  // Request 12V
  setVoltage(0, 0, 1);
  delay(4000);

  // // Request 15V
   setVoltage(0, 1, 1);
  delay(4000);

  // // Request 20V
  setVoltage(0,1, 0);
  delay(4000);

}
```

# Motor Testing

![20260505_143027.jpg](attachment:a32e9ce8-8adc-472a-8ce2-db4831dc2388:20260505_143027.jpg)

```arduino
//
// SAMD11 + CH224K + A4953 stable stepper control
//

// ---------- CH224K CFG pins ----------
#define CFG1 9
#define CFG2 15
#define CFG3 31

// ---------- A4953 pins ----------
#define INA1 2
#define INA2 4
#define INB1 8
#define INB2 5
#define EN   14

// Request 12V from PD supply
void setPD_12V()
{
  digitalWrite(CFG1, LOW);
  digitalWrite(CFG2, LOW);
  digitalWrite(CFG3, HIGH);

  delay(1500);
}

// Half-step sequence (smoothest without sine PWM)
void halfStep(int d)
{
  digitalWrite(INA1,1); digitalWrite(INA2,0); digitalWrite(INB1,0); digitalWrite(INB2,0); delay(d);
  digitalWrite(INA1,1); digitalWrite(INA2,0); digitalWrite(INB1,1); digitalWrite(INB2,0); delay(d);
  digitalWrite(INA1,0); digitalWrite(INA2,0); digitalWrite(INB1,1); digitalWrite(INB2,0); delay(d);
  digitalWrite(INA1,0); digitalWrite(INA2,1); digitalWrite(INB1,1); digitalWrite(INB2,0); delay(d);
  digitalWrite(INA1,0); digitalWrite(INA2,1); digitalWrite(INB1,0); digitalWrite(INB2,0); delay(d);
  digitalWrite(INA1,0); digitalWrite(INA2,1); digitalWrite(INB1,0); digitalWrite(INB2,1); delay(d);
  digitalWrite(INA1,0); digitalWrite(INA2,0); digitalWrite(INB1,0); digitalWrite(INB2,1); delay(d);
  digitalWrite(INA1,1); digitalWrite(INA2,0); digitalWrite(INB1,0); digitalWrite(INB2,1); delay(d);
}

void setup()
{
  pinMode(CFG1, OUTPUT);
  pinMode(CFG2, OUTPUT);
  pinMode(CFG3, OUTPUT);

  pinMode(INA1, OUTPUT);
  pinMode(INA2, OUTPUT);
  pinMode(INB1, OUTPUT);
  pinMode(INB2, OUTPUT);
  pinMode(EN, OUTPUT);

  // Set motor current (~0.6–0.8A effective)
  analogWrite(EN, 110);

  delay(500);

  // Negotiate 12V from USB-PD
  setPD_12V();
}

void loop()
{
  // acceleration ramp
  for(int d = 10; d > 3; d--)
  {
    for(int i = 0; i < 200; i++)
      halfStep(d);
  }

  // steady rotation
  for(int i = 0; i < 2000; i++)
    halfStep(3);
}
```

[20260505 143316.m4v](attachment:08a4cfc2-397d-4185-8ae3-e53bd6fc71bf:20260505_143316.m4v)

```arduino
//
// SAMD11 + CH224K + A4953 microstepping version
//

// ---------- CH224K CFG pins ----------
#define CFG1 9
#define CFG2 15
#define CFG3 31

// ---------- A4953 pins ----------
#define INA1 2
#define INA2 4
#define INB1 8
#define INB2 5
#define EN   14

// Microstep PWM strength table (0–255)
// approximated sine weighting
uint8_t microPWM[8] = {255, 220, 180, 120, 60, 120, 180, 220};

// Request 12V from PD supply
void setPD_12V()
{
  digitalWrite(CFG1, LOW);
  digitalWrite(CFG2, LOW);
  digitalWrite(CFG3, HIGH);

  delay(1500);
}

// One microstep forward
void microStepForward(int stepDelay)
{
  // phase 1
  digitalWrite(INA1,1); digitalWrite(INA2,0);
  digitalWrite(INB1,0); digitalWrite(INB2,0);
  analogWrite(EN, microPWM[0]);
  delay(stepDelay);

  // phase 2
  digitalWrite(INA1,1); digitalWrite(INA2,0);
  digitalWrite(INB1,1); digitalWrite(INB2,0);
  analogWrite(EN, microPWM[1]);
  delay(stepDelay);

  // phase 3
  digitalWrite(INA1,0); digitalWrite(INA2,0);
  digitalWrite(INB1,1); digitalWrite(INB2,0);
  analogWrite(EN, microPWM[2]);
  delay(stepDelay);

  // phase 4
  digitalWrite(INA1,0); digitalWrite(INA2,1);
  digitalWrite(INB1,1); digitalWrite(INB2,0);
  analogWrite(EN, microPWM[3]);
  delay(stepDelay);

  // phase 5
  digitalWrite(INA1,0); digitalWrite(INA2,1);
  digitalWrite(INB1,0); digitalWrite(INB2,0);
  analogWrite(EN, microPWM[4]);
  delay(stepDelay);

  // phase 6
  digitalWrite(INA1,0); digitalWrite(INA2,1);
  digitalWrite(INB1,0); digitalWrite(INB2,1);
  analogWrite(EN, microPWM[5]);
  delay(stepDelay);

  // phase 7
  digitalWrite(INA1,0); digitalWrite(INA2,0);
  digitalWrite(INB1,0); digitalWrite(INB2,1);
  analogWrite(EN, microPWM[6]);
  delay(stepDelay);

  // phase 8
  digitalWrite(INA1,1); digitalWrite(INA2,0);
  digitalWrite(INB1,0); digitalWrite(INB2,1);
  analogWrite(EN, microPWM[7]);
  delay(stepDelay);
}

void setup()
{
  pinMode(CFG1, OUTPUT);
  pinMode(CFG2, OUTPUT);
  pinMode(CFG3, OUTPUT);

  pinMode(INA1, OUTPUT);
  pinMode(INA2, OUTPUT);
  pinMode(INB1, OUTPUT);
  pinMode(INB2, OUTPUT);
  pinMode(EN, OUTPUT);

  delay(500);

  // Negotiate 12V from USB-PD
  setPD_12V();

  // baseline current level
  analogWrite(EN, 120);
}

void loop()
{
  // acceleration ramp
  for(int d = 10; d > 3; d--)
  {
    for(int i = 0; i < 200; i++)
      microStepForward(d);
  }

  // steady rotation
  for(int i = 0; i < 2000; i++)
    microStepForward(3);
}
```

## AT8236 - After swapping the A4953 driver for AT8236

its a cheapest motor driver I found out that the Bambulab A1 series are using it 

**ZHONGKEWEI AT8236**

$ 0.51 per pcs (**47.23)** 

![Image Credits:-https://www.lcsc.com/product-detail/C2827823.html](attachment:873cf0a8-1d27-4e78-a0dc-3177be3ec0be:image.png)

Image Credits:-https://www.lcsc.com/product-detail/C2827823.html

- https://www.lcsc.com/product-detail/C2827823.html
- https://wiki.bambulab.com/a1/maintenance/toolhead-board/20250123-153719.jpg
- [Datasheet](https://cdn.semikey.com/upload/pdfs/51/40/5140c4ea37c46af4766d2602eb3747d8.pdf)

![image.png](attachment:2532cdc5-0be5-4327-8f76-8157e70b3aac:21f56b89-56b5-48e6-9615-0b02e7796fa0.png)

![image.png](attachment:97e3c9f8-fa88-4116-a560-1e782f309858:image.png)

AT8236  Pinout

The swapping is very easy due to the matching pinout of both A4953 and AT8236  

### Running in 12V PD

[At8236-12V.m4v](attachment:0fe90dfd-90c2-4498-80c8-f31fcde07e87:At8236-12V.m4v)


:::tip[Oh Wait!!]


  this Driver can run in 5V!! 🙂

:::


### Running in 5V PD

```arduino
//
// SAMD11 + CH224K + AT8236 microstepping version
//

// ---------- CH224K CFG pins ----------
#define CFG1 9
#define CFG2 15
#define CFG3 31

// ---------- AT8236 pins ----------
#define INA1 2
#define INA2 4
#define INB1 8
#define INB2 5
#define EN 14

// Microstep PWM strength table (0–255)
// approximated sine weighting
uint8_t microPWM[8] = { 255, 220, 180, 120, 60, 120, 180, 220 };

// Request 12V from PD supply
void setPD_12V() {
  digitalWrite(CFG1, LOW);
  digitalWrite(CFG2, LOW);
  digitalWrite(CFG3, HIGH);

  delay(1500);
}

// Request 12V from PD supply
void setPD_5V() {
  digitalWrite(CFG1, HIGH);
  digitalWrite(CFG2, LOW);
  digitalWrite(CFG3, LOW);

  delay(1500);
}

// One microstep forward
void microStepForward(int stepDelay) {
  // phase 1
  digitalWrite(INA1, 1);
  digitalWrite(INA2, 0);
  digitalWrite(INB1, 0);
  digitalWrite(INB2, 0);
  analogWrite(EN, microPWM[0]);
  delay(stepDelay);

  // phase 2
  digitalWrite(INA1, 1);
  digitalWrite(INA2, 0);
  digitalWrite(INB1, 1);
  digitalWrite(INB2, 0);
  analogWrite(EN, microPWM[1]);
  delay(stepDelay);

  // phase 3
  digitalWrite(INA1, 0);
  digitalWrite(INA2, 0);
  digitalWrite(INB1, 1);
  digitalWrite(INB2, 0);
  analogWrite(EN, microPWM[2]);
  delay(stepDelay);

  // phase 4
  digitalWrite(INA1, 0);
  digitalWrite(INA2, 1);
  digitalWrite(INB1, 1);
  digitalWrite(INB2, 0);
  analogWrite(EN, microPWM[3]);
  delay(stepDelay);

  // phase 5
  digitalWrite(INA1, 0);
  digitalWrite(INA2, 1);
  digitalWrite(INB1, 0);
  digitalWrite(INB2, 0);
  analogWrite(EN, microPWM[4]);
  delay(stepDelay);

  // phase 6
  digitalWrite(INA1, 0);
  digitalWrite(INA2, 1);
  digitalWrite(INB1, 0);
  digitalWrite(INB2, 1);
  analogWrite(EN, microPWM[5]);
  delay(stepDelay);

  // phase 7
  digitalWrite(INA1, 0);
  digitalWrite(INA2, 0);
  digitalWrite(INB1, 0);
  digitalWrite(INB2, 1);
  analogWrite(EN, microPWM[6]);
  delay(stepDelay);

  // phase 8
  digitalWrite(INA1, 1);
  digitalWrite(INA2, 0);
  digitalWrite(INB1, 0);
  digitalWrite(INB2, 1);
  analogWrite(EN, microPWM[7]);
  delay(stepDelay);
}

void setup() {
  pinMode(CFG1, OUTPUT);
  pinMode(CFG2, OUTPUT);
  pinMode(CFG3, OUTPUT);

  pinMode(INA1, OUTPUT);
  pinMode(INA2, OUTPUT);
  pinMode(INB1, OUTPUT);
  pinMode(INB2, OUTPUT);
  pinMode(EN, OUTPUT);

  delay(500);

  // Negotiate 12V from USB-PD
  // setPD_12V();

  // Negotiate 5V from USB-PD
  setPD_5V();

  // baseline current level
  analogWrite(EN, 120);
}

void loop() {
  // acceleration ramp
  for (int d = 10; d > 3; d--) {
    for (int i = 0; i < 200; i++)
      microStepForward(d);
  }

  // steady rotation
  for (int i = 0; i < 2000; i++)
    microStepForward(3);
}
```

### Acceleration ramp

[At8236-5V-Acceleration.m4v](attachment:9d065611-5f0a-489f-8372-3d6ed17c3f1c:At8236-5V-Acceleration.m4v)

### Steady rotation

[At8236-5V-Fast.m4v](attachment:b127f3bc-9e05-4a51-b6ef-8eff74722b37:At8236-5V-Fast.m4v)

## Future Scope

- Add Sensor less Homing
- Motor current control
- Micro stepping
- Power delivery(PD) Status Indication
- MCU upgrade

### References

- https://github.com/saheenpalayi/CH224K_USB_PD-Module
- https://www.laskakit.cz/user/related_files/ch224ds1.pdf
- https://toshiba.semicon-storage.com/info/TB67H451AFNG_datasheet_en_20201217.pdf?did=70456&prodName=TB67H451AFNG
- https://github.com/opensourcemanufacturing/OpenBL/tree/main