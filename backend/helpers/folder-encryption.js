import * as folderEncrypt from 'folder-encrypt';


async function encryptFolder(folderPath) {
    folderEncrypt.encrypt({
        password: '123', //TODO : A METTRE DANS LE ENV
        input: folderPath
    })
}

async function decryptFolder(folderPath) {
    folderEncrypt.decrypt({
        password: '123',//TODO : A METTRE DANS LE ENV
        input: folderPath
    })
}

module.exports = {encryptFolder, decryptFolder}