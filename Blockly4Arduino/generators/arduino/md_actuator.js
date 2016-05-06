/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Generating Microduino code for procedure (function) blocks.
 *
 */
'use strict';

goog.provide('Blockly.Arduino.md_actuator');

goog.require('Blockly.Arduino');


/**
 * Value for defining a servo type.
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
Blockly.Arduino['mcookie_servo_type'] = function(block) {
  var code = block.getFieldValue('SERVOTYPE');
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

/**
 * The servo setup block
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Arduino['mcookie_servo_setup'] = function(block) {
  var servoTop = block.getFieldValue('NAMETOPSERVO');
  var servoBot = block.getFieldValue('NAMEBOTTOMSERVO');
  var topType = Blockly.Arduino.valueToCode(
      block, 'SERVOTOPTYPE', Blockly.Arduino.ORDER_ATOMIC) || 'NOSERVO';
  var bottomType = Blockly.Arduino.valueToCode(
      block, 'SERVOBOTTOMTYPE', Blockly.Arduino.ORDER_ATOMIC) || 'NOSERVO';
  
  //the hub saved the connector in the attached block
  var hubconnector = block['connector'] || ['0', '1']
  //compute the pins, normally only possible to attach at valid pins
  var pintop = hubconnector[0];
  var pinbottom = hubconnector[1];
  
  if (topType != 'NOSERVO') {
    var servoName = 'myServo' + servoTop;
    var pin = pintop;
    //servoTop is a variable containing the used pins
    Blockly.Arduino.addVariable(servoTop,
      'int ' + servoTop + ' = ' + pin + ';', true);
    //Blockly.Arduino.reservePin(block, pintop, Blockly.Arduino.PinTypes.SERVO, 'Servo Write');
    Blockly.Arduino.addInclude('servo', '#include <Servo.h>');
    Blockly.Arduino.addDeclaration('servo_' + servoName, 'Servo ' + servoName + ';');
    Blockly.Arduino.reservePin(
      block, pin, Blockly.Arduino.PinTypes.SERVO, 'Servo Microduino Use');
    var setupCode = servoName + '.attach(' + pin + ');';
    Blockly.Arduino.addSetup('servo_' + servoName, setupCode, true);
  }
  if (bottomType != 'NOSERVO') {
    var servoName = 'myServo' + servoBot;
    var pin = pinbottom;
    //servoTop is a variable containing the used pins
    Blockly.Arduino.addVariable(servoBot,
      'int ' + servoBot + ' = ' + pin + ';', true);
    //Blockly.Arduino.reservePin(block, pintop, Blockly.Arduino.PinTypes.SERVO, 'Servo Write');
    Blockly.Arduino.addInclude('servo', '#include <Servo.h>');
    Blockly.Arduino.addDeclaration('servo_' + servoName, 'Servo ' + servoName + ';');
    Blockly.Arduino.reservePin(
      block, pin, Blockly.Arduino.PinTypes.SERVO, 'Servo Microduino Use');
    var setupCode = servoName + '.attach(' + pin + ');';
    Blockly.Arduino.addSetup('servo_' + servoName, setupCode, true);
  }

  return '';
};


/**
 * Code generator to set an angle (Y) value to a servo PWM pin (X).
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Arduino['mcookie_servo_write'] = function(block) {
  var servoInstanceName = block.getFieldValue('SERVO_NAME');
  var servoAngle = Blockly.Arduino.valueToCode(
      block, 'SERVO_ANGLE', Blockly.Arduino.ORDER_ATOMIC) || '90';
  var servoName = 'myServo' + servoInstanceName;

  var code = servoName + '.write(' + servoAngle + ');\n';
  return code;
};

/**
 * Code generator to set a spped value to a servo PWM pin.
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Arduino['mcookie_servo_write2'] = function(block) {
  var servoInstanceName = block.getFieldValue('SERVO_NAME');
  var servoSpeed = Blockly.Arduino.valueToCode(
      block, 'SERVO_SPEED', Blockly.Arduino.ORDER_ATOMIC) || '90';
  var servoName = 'myServo' + servoInstanceName;

  //convert -100 .. 100 to 0..180 
  var code = servoName + '.write(constrain(map(' + servoSpeed + ', -100, 100, 0, 180), 0, 180));\n';
  return code;
};

/**
 * Code generator to read an angle value from a servo PWM pin (X).
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
Blockly.Arduino['mcookie_servo_read'] = function(block) {
  var servoInstanceName = block.getFieldValue('SERVO_NAME');
  var servoName = 'myServo' + servoInstanceName;

  var code = servoName + '.read()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

