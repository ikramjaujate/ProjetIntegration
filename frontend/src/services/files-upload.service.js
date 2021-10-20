import http from "../http-common";

class FileUploadService {
    upload(file, onUploadProgress){  // using FormData to store key-value pairs. It helps to build an object which corresponds to HTML form using append() method
        let formData = new FormData(); // passing onUploadProgress to exposes progress events. This progress event are expensive (change detection for each event)

        formData.append("file", file);

        return http.post("/upload", formData, { // POST method to send files
            headers: {
                "Content-Type": "multipart/form-data"
            },
            onUploadProgress
        });
    }

    getFiles(){
        return http.get("/files") // GET method to see all files sent
    }
}

export default new FileUploadService();