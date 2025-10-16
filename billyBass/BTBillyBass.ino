#include <MX1508.h>

enum MotorActionType {
	FORWARD,
	BACKWARD,
	HALT,
	END,
};

struct MotorInstruction {
	MotorActionType action;
	unsigned int duration; //ms
};

// pins to motor controllers and what motors they control
MX1508 tailMotor(2, 3);
MX1508 bodyMotor(5, 6);
MX1508 mouthMotor(7, 8);

const unsigned int SOUND_PIN = A3; // Sound input pin
const unsigned int SILENCE_THRESHOLD = 27; // sound above this triggers activity.

const unsigned int ACTIVITY_DURATION = 800; // activity lasts this ms without sound

int soundVolume = 0; // current analog audio value
unsigned long lastTime = 0;
unsigned long currentTime = 0; // ms

unsigned long activeTime; // timestamp to stop activity 
bool isActive = false; // if bass is currently active

// timestamps to start the next action
unsigned long tailSchedule = 0;
unsigned long bodySchedule = 0;
unsigned long mouthSchedule = 0;

int tailActionIndex = 0;
int mouthActionIndex = 0;
int bodyActionIndex = 0;

MotorInstruction tailSequence[] = {
	{FORWARD, 275},
	{HALT,    10},
	{BACKWARD,90},
	{END,    0}
};

MotorInstruction mouthSequence[] = {
	{BACKWARD, 100},
	{HALT, 10},
	{FORWARD, 100},
	{HALT, 10},
	{END, 0}
};

MotorInstruction bodySequence[] = {
	{BACKWARD, 3400},
	{HALT, 10},
	{END, 0}

};

void moveMotor(MX1508 &motor, MotorActionType action);
void SMBillyBass(); // main logic for motor controlling

void setup() {
	pinMode(SOUND_PIN, INPUT); // set sound pin to input mode

	tailMotor.setSpeed(255);
	bodyMotor.setSpeed(255);
	mouthMotor.setSpeed(255);

	Serial.begin(9600);
}

void loop() {
	lastTime = currentTime;
	currentTime = millis(); // tracks current time in ms, returns unsigned long

	if (currentTime < lastTime) { // after 50 days of uptime, currenTime will overflow, resets all scheduled times

		tailSchedule = 0;
		bodySchedule = 0;
		mouthSchedule = 0;

		tailActionIndex = 0;
		bodyActionIndex = 0;
		mouthActionIndex = 0;

		moveMotor(tailMotor, HALT);
		moveMotor(bodyMotor, HALT);
		moveMotor(mouthMotor, HALT);
	}

	soundVolume = analogRead(SOUND_PIN);
	if (soundVolume > 22) {
		Serial.println(soundVolume);
	}

	if (soundVolume > SILENCE_THRESHOLD) { // extend active time
		isActive = true;
		activeTime = currentTime + ACTIVITY_DURATION;
	}

	if (isActive) {
		SMBillyBass(); // main motor controlling logic
	}
}

void SMBillyBass() {
	if (currentTime > activeTime) {
		// action time is over
		isActive = false;

		tailSchedule = 0;
		bodySchedule = 0;
		mouthSchedule = 0;

		tailActionIndex = 0;
		bodyActionIndex = 0;
		mouthActionIndex = 0;

		moveMotor(tailMotor, HALT);
		moveMotor(bodyMotor, HALT);
		moveMotor(mouthMotor, HALT);

		return;
	}

	// tail
	if (currentTime > tailSchedule) {
		MotorInstruction currentInstruction = tailSequence[tailActionIndex];

		if (currentInstruction.action == END) {
			tailSchedule = currentTime + floor(random(400, 1100)); //schedule tail action
			tailActionIndex = 0;
		} else {
			//schedule next action
			moveMotor(tailMotor, currentInstruction.action);
			tailSchedule = currentTime + currentInstruction.duration;
			tailActionIndex++;
		}
	}

	// mouth
	if (currentTime > mouthSchedule) {
		MotorInstruction currentInstruction = mouthSequence[mouthActionIndex];

		if (currentInstruction.action == END) {
			mouthSchedule = currentTime + floor(random(50, 500)); //schedule mouth action
			mouthActionIndex = 0;
		} else {
			//schedule next action
			moveMotor(mouthMotor, currentInstruction.action);
			mouthSchedule = currentTime + currentInstruction.duration;
			mouthActionIndex++;
		}
	}

	// body
	if (currentTime > bodySchedule) {
		MotorInstruction currentInstruction = bodySequence[bodyActionIndex];

		if (currentInstruction.action == END) {
			bodySchedule = currentTime + floor(random(300, 4000)); //schedule body action
			bodyActionIndex = 0;
		} else {
			//schedule next action
			moveMotor(bodyMotor, currentInstruction.action);
			bodySchedule = currentTime + currentInstruction.duration;
			bodyActionIndex++;
		}
	}

}

void moveMotor(MX1508 &motor, MotorActionType action) {
	if (action == FORWARD) {
		motor.forward();
	} else if (action == BACKWARD) {
		motor.backward();
	} else if (action == HALT) {
		motor.halt();
	}
}