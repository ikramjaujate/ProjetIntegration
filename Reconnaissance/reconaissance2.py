import face_recognition
import cv2
import numpy as np
import os # pour importer toutes les images d'un coup
import datetime

# charger les images et les convertir en RVB 
#imgIkram = face_recognition.load_image_file("C:\ProjetIntegration-1\Reconnaissance\ikram.JPG")
#imgIkram = cv2.cvtColor(imgIkram,cv2.COLOR_BGR2RGB)

path = './Reconnaissance/images'
images = []     # listes contenant toutes les images
className = []    # listes contenant toutes les nom de classe
myList = os.listdir(path)
print("Nombre de classes détectées",len(myList))
for x,cl in enumerate(myList):
        curImg = cv2.imread(f'{path}/{cl}')
        images.append(curImg)
        className.append(os.path.splitext(cl)[0])

#les encoder
def findEncodings(images):
    encodeList = []
    for img in images:
        img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        encode = face_recognition.face_encodings(img)[0]
        encodeList.append(encode)
    return encodeList

def markAttendance(name):
    with open('Attendance.csv','r+') as f:
        myDataList = f.readlines()
        nameList =[]
        for line in myDataList:
            entry = line.split(',')
            nameList.append(entry[0])
        if name not in  line:
            now = datetime.now()
            dt_string = now.strftime("%H:%M:%S")
            f.writelines(f'n{name},{dt_string}')

encodeListKnown = findEncodings(images)
print('Encodings Complete')

# capture vidéo
cap = cv2.VideoCapture(0)
while True:
    success, img = cap.read()
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
            markAttendance(name)
        
        else: 
            name = 'Unknown'
            #print(name)
            y1,x2,y2,x1 = faceLoc
            y1, x2, y2, x1 = y1*4,x2*4,y2*4,x1*4
            cv2.rectangle(img,(x1,y1),(x2,y2),(0,255,0),2)
            cv2.rectangle(img,(x1,y2-35),(x2,y2),(0,255,0),cv2.FILLED)
            cv2.putText(img,name,(x1+6,y2-6),cv2.FONT_HERSHEY_COMPLEX,1,(255,255,255),2)
        
    cv2.imshow('Webcam',img)
    cv2.waitKey(1)

# chercher les visages dans les images

#faceLoc = face_recognition.face_locations(imgIkram)[0]
#encodeElon = face_recognition.face_encodings(imgIkram)[0]
#cv2.rectangle(imgIkram,(faceLoc[3],faceLoc[0]),(faceLoc[1],faceLoc[2]),(255,0,255),2) # top, right, bottom, left
 
