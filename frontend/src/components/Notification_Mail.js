import React from 'react';
import emailjs from 'emailjs-com';
import{ init } from 'emailjs-com';


function sendMail() {
    
    /* jsdoc
   
   
    */

    init("user_LHFMoI6uv3conWaZcO9j6");
    emailjs.send("service_mail", "template_cajacci", {
        grade: "toto",
    }).then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
}

sendMail()