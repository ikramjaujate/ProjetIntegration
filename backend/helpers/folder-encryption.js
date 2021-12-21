const folderEncrypt = require('folder-encrypt') ;
const fs = require('fs') ;
const dotenv = require("dotenv") ;
dotenv.config() ;


/**
 * Put the program in sleep for a specific time
 *
 * @author Ikram Jaujate Ouldkhala <i.jaujateouldkhala@students.ephec.be>
 * @author Clémentine Sacré <c.sacre@students.ephec.be>
 * @param {integer} ms number of milliseconds during which the program must sleep
 */
function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}


/**
 * Encrypt a folder
 *
 * @author Ikram Jaujate Ouldkhala <i.jaujateouldkhala@students.ephec.be>
 * @author Clémentine Sacré <c.sacre@students.ephec.be>
 * @param {string} folderPath path of the folder to encrypt
 */
//TODO : faire try catch
async function encryptFolder(folderPath) {
  await sleep(1000);
  try {
    await folderEncrypt.encrypt({
        password: process.env.PASSWORD_FOLDER,
        input: folderPath
    })
    .then(() => {
      try {
        fs.rmSync(folderPath, { recursive: true, force : true });
      }
      catch(e) {console.log("fs encrypt : ", e)}
    })
    .catch((err) => {console.log("err encrypt : ", err);});
  }
  catch(e) {console.log("error encrypt : ", e)}
}


/**
 * Decrypt a file
 *
 * @author Ikram Jaujate Ouldkhala <i.jaujateouldkhala@students.ephec.be>
 * @author Clémentine Sacré <c.sacre@students.ephec.be>
 * @param {string} folderPath path of the file to decrypt
 */
async function decryptFolder(folderPath) {
  try {
    await folderEncrypt.decrypt({
      password: process.env.PASSWORD_FOLDER,
      input: folderPath
    })
    .then(() => {
      try {    
        fs.rmSync(folderPath, { recursive: true});
      }
      catch (e) {console.log("fs decrypt : ", e)}
    })
    .catch((err) => {console.log("err decrypt : ", err);});
  }
  catch (e) {console.log("error decrypt : ", e)}
}

module.exports = {encryptFolder, decryptFolder} ;