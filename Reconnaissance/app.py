from flask import Flask, Response, render_template, request
from flask_cors import CORS
import face_recognition
import cv2
from flask.wrappers import Response
import numpy as np
import os # pour importer toutes les images d'un coup
from datetime import datetime
import time
app = Flask(__name__)

cors = CORS(app, resources={r"/*": {"origins": "*"}})

path = './Reconnaissance/images'
images = []     # listes contenant toutes les images
className = []    # listes contenant toutes les nom de classe

myList = [x for x in os.listdir(path) if x.endswith('.jpg')]

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


encodeListKnown = findEncodings(images)
print('Encodings Complete')

cap = cv2.VideoCapture(0)
flag = 0

# Convertir les resolutions 


@app.route('/')
def index():
    return "Message par default"

def gen(captur):
    cap = cv2.VideoCapture(0)
    frame_width = int(cap.get(3))
    frame_height = int(cap.get(4))
    print(captur)
    out = cv2.VideoWriter('outpy.avi',cv2.VideoWriter_fourcc('M','J','P','G'), 10, (frame_width,frame_height))
    
    

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
            

        if flag == 1:
            #flag = 0
            cap.release()
                
                

        imgS = cv2.resize(img, (0, 0), fx=0.25, fy=0.25) # redimensionner pour garder les performances
        imgS = cv2.cvtColor(imgS, cv2.COLOR_BGR2RGB)

        facesCurFrame = face_recognition.face_locations(imgS)
        encodesCurFrame = face_recognition.face_encodings(imgS, facesCurFrame)
        
        for encodeFace,faceLoc in zip(encodesCurFrame,facesCurFrame):
            matches = face_recognition.compare_faces(encodeListKnown, encodeFace)
            faceDis = face_recognition.face_distance(encodeListKnown, encodeFace)

            matchIndex = np.argmin(faceDis)

            

            if faceDis[matchIndex]< 0.50:
                name = className[matchIndex].upper()
                #print(name)
                y1,x2,y2,x1 = faceLoc
                y1, x2, y2, x1 = y1*4,x2*4,y2*4,x1*4
                cv2.rectangle(img,(x1,y1),(x2,y2),(0,255,0),2)
                cv2.rectangle(img,(x1,y2-35),(x2,y2),(0,255,0),cv2.FILLED)
                cv2.putText(img,name,(x1+6,y2-6),cv2.FONT_HERSHEY_COMPLEX,1,(255,255,255),2)

                
                
            else: 
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


@app.route('/video')
def video():
    global cap
    return Response(gen('vid'), mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/photo')
def photo():
    global cap
    return Response(gen('photo'), mimetype='multipart/x-mixed-replace; boundary=myboundary')

@app.route('/shutdown')
def shutdown():
    global flag, cap
    flag = 1
    return True
    
@app.route('/up')
def up():
    
    global flag, cap
    flag = 0
    cap = cv2.VideoCapture(0)
    return False

if __name__ == '__main__':
    app.run(host='0.0.0.0', port='6060',debug=True)





