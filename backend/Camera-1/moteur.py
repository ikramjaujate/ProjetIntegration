from flask import Flask, Response, render_template
from flask_cors import CORS
import face_recognition
import cv2
from flask.wrappers import Response
import numpy as np
import os # pour importer toutes les images d'un coup
from datetime import datetime

app = Flask(__name__)


# code pour définir le moteur / led
import RPi.GPIO as GPIO
import time



#Set function to calculate percent from angle
def angle_to_percent (angle) :
    if angle > 180 or angle < 0 :
        return False

    start = 4
    end = 12.5
    ratio = (end - start)/180 #Calcul ratio from angle to percent

    angle_as_percent = angle * ratio

    return start + angle_as_percent



cors = CORS(app, resources={r"/*": {"origins": "*"}})

path = './images'
images = []     # listes contenant toutes les images
className = []    # listes contenant toutes les nom de classe

myList = [x for x in os.listdir(path) if x.endswith('.jpg')]
cap = cv2.VideoCapture("0")

cap.set(3,680)

cap.set(4,680)
print("Nombre de classes détectées",len(myList))
for x,cl in enumerate(myList):
        curImg = cv2.imread(f'{path}/{cl}')
        images.append(curImg)
        className.append(os.path.splitext(cl)[0])

#les encoder
def findEncodings(images):
    encodeList = []
    for img in images:
        #print(img)
        img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        encode = face_recognition.face_encodings(img)[0]
        encodeList.append(encode)
        
        

    return encodeList

flag = True
encodeListKnown = findEncodings(images)
print('Encodings Complete')


# Convertir les resolutions 


@app.route('/')
def index():
    return "Message par default"

def gen(captur):
    cap = cv2.VideoCapture(0)
    frame_width = int(cap.get(3))
    frame_height = int(cap.get(4))
    print(captur)
    
    #Défénition du GPIO
    GPIO.setmode(GPIO.BOARD)
    # Set pin 11 as an output, and set servo1 as pin 11 as PWM
    GPIO.setup(12,GPIO.OUT)
    servo1 = GPIO.PWM(12,50) # Note 11 is pin, 50 = 50Hz pulse
    servo1.start(0)

    # Définition LED Rouge => refusé
    LEDRefuse = 7
    GPIO.setup(LEDRefuse,GPIO.OUT)
    
     # Définition LED Vert => accepté
    LEDaccepte = 8
    GPIO.setup(LEDaccepte,GPIO.OUT)
  
    
    out = cv2.VideoWriter('outpy.avi',cv2.VideoWriter_fourcc('M','J','P','G'), 10, (frame_width,frame_height))
    temps =round(time.time())-20
    tempsFermeture =round(time.time())-20

    
    while True:
        success, img = cap.read()
        if(captur=='photo'): 
            
            now = str(datetime.now())
            now = now[0:19]
            d = datetime.strptime(now, "%Y-%m-%d %H:%M:%S")
           
            img_name = "image-client/frame_{}.jpeg".format(str(d))

            cv2.imwrite(img_name, img)
            print(" written!")
        
            captur = "vid"
            break
            
            
        
        imgS = cv2.resize(img, (0, 0), fx=0.25, fy=0.25) # redimensionner pour garder les performances
        imgS = cv2.cvtColor(imgS, cv2.COLOR_BGR2RGB)

        facesCurFrame = face_recognition.face_locations(imgS)
        encodesCurFrame = face_recognition.face_encodings(imgS, facesCurFrame)
        if (round(time.time()) >= tempsFermeture+10) :
            GPIO.output(LEDaccepte, GPIO.LOW)  #eteindre la led d'acces  
            servo1.ChangeDutyCycle(2) #refermer
            time.sleep(0.5)
            servo1.ChangeDutyCycle(0)
            print("je referme")


        
        for encodeFace,faceLoc in zip(encodesCurFrame,facesCurFrame):
            matches = face_recognition.compare_faces(encodeListKnown, encodeFace)
            faceDis = face_recognition.face_distance(encodeListKnown, encodeFace)

            matchIndex = np.argmin(faceDis)
            
                

            if faceDis[matchIndex]< 0.50:
                if (round(time.time()) >= temps +20) :
                    GPIO.output(LEDRefuse, GPIO.LOW)
                    GPIO.output(LEDaccepte, GPIO.HIGH)
                    servo1.ChangeDutyCycle(12) # mettre a 180°
                    time.sleep(0.5)
                    servo1.ChangeDutyCycle(0) # relacher le moteur
                    tempsFermeture =round(time.time())
                    
                    temps = round(time.time())
                    print("la porte s'ouvre")
                    time.sleep(0.5)
                
                name = className[matchIndex].upper()
                #print(name)
                y1,x2,y2,x1 = faceLoc
                y1, x2, y2, x1 = y1*4,x2*4,y2*4,x1*4
                cv2.rectangle(img,(x1,y1),(x2,y2),(0,255,0),2)
                cv2.rectangle(img,(x1,y2-35),(x2,y2),(0,255,0),cv2.FILLED)
                cv2.putText(img,name,(x1+6,y2-6),cv2.FONT_HERSHEY_COMPLEX,1,(255,255,255),2)
                #time.sleep(5)
                
            else: 
                GPIO.output(LEDRefuse, GPIO.HIGH)
                name = 'Unknown'
                #print(name)
                y1,x2,y2,x1 = faceLoc
                y1, x2, y2, x1 = y1*4,x2*4,y2*4,x1*4
                cv2.rectangle(img,(x1,y1),(x2,y2),(0,0,255),2)
                cv2.rectangle(img,(x1,y2-35),(x2,y2),(0,0,255),cv2.FILLED)
                cv2.putText(img,name,(x1+6,y2-6),cv2.FONT_HERSHEY_COMPLEX,1,(255,255,255),2)
                    
        
        out.write(img)
        # encode OpenCV raw frame to jpg and displaying it
        ret, buffer = cv2.imencode('.jpg', img)
        frame = buffer.tobytes()
        yield (b'--frame\r\n'
                b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

    servo1.stop()
    GPIO.cleanup()


@app.route('/video')
def video():
    global cap
    res = Response(gen('vid'), mimetype='multipart/x-mixed-replace; boundary=frame')
    #new_headers = [('Cache-Control', 'no-store')]
    #new_headers = [('Cache-Control', 'no-cache')]
    res.headers['Cache-Control'] = 'no-store'
    return res

@app.route('/photo')
def photo():
    global cap
    return Response(gen('photo'), mimetype='multipart/x-mixed-replace; boundary=myboundary')

@app.route('/shutdown')
def shutdown():
    global flag, cap
    flag = 1
    return ""
    
@app.route('/up')
def up():
    global flag, cap
    flag = 0
    #cap = cv2.VideoCapture(0)
    return ""

if __name__ == '__main__':
    app.run(host='0.0.0.0', port='6060',debug=True)