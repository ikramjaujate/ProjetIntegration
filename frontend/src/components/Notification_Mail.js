import React from 'react';
import emailjs from 'emailjs-com';
import{ init } from 'emailjs-com';


/** 
     * Sends an email with the grade of the person that's in front of the camera
     *
     * @author juliefino
     * 
     * @param {string} grade    Grade's name 
     * @return the email sending  
     */

function sendMail(grade_personne) {

    init("user_LHFMoI6uv3conWaZcO9j6");
    emailjs.send("service_mail", "template_cajacci", {
        grade: grade_personne,
    }).then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
}

sendMail()



//emailjs.send("service_mail","template_anonyme");