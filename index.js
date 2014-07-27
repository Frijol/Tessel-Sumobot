var tessel = require('tessel');
var servolib = require('servo-pca9685');

var servo = servolib.use(tessel.port['A']);

var servos = [1, 2]; // We have servos plugged in at positions 1 and 2
var setting = 0.9

servo.on('ready', function () {
  var count = 0;
  var total = servos.length;
  servos.forEach(function (thisServo) {
    servo.configure(thisServo, 0.05, 0.12, function () {
      count ++;
      if (count == total) {
        setInterval(function () {
          servos.forEach(function (thisServo) {
            if (thisServo == 2) {
              pos = 1 - setting;
            } else {
              pos = setting;
            }
            servo.move(thisServo, pos);
          });
        }, 100);
      }
    });
  });
});