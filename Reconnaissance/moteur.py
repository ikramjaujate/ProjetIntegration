import RPi.GPIO as GPIO
import time


#Fonction permettant de transformer l'angle en %
def angle_to_percent (angle) :
    if angle > 180 or angle < 0 :
        return False
    start = 4
    end = 12.5 # car 1°  = +/- 1.75%
    ratio = (end - start)/180 #Calcul le ratio d'angle en %

    angle_as_percent = angle * ratio

    return start + angle_as_percent


GPIO.setmode(GPIO.BOARD) 
GPIO.setwarnings(False) 

#Utiliser le gpio 12
pwm_gpio = 12
frequence = 50
GPIO.setup(pwm_gpio, GPIO.OUT)
pwm = GPIO.PWM(pwm_gpio, frequence)

#initialiser a 0°
pwm.start(angle_to_percent(0))
time.sleep(1)

#ouvrir la porte ( 110)°
pwm.ChangeDutyCycle(angle_to_percent(90))
time.sleep(1)


#fermer le gpio
pwm.stop()
GPIO.cleanup()