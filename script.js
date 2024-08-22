// เริ่มต้นการเชื่อมต่อ WebSocket
// let webSocket = new WebSocket("ws://192.168.10.130:5000");
let webSocket = new WebSocket("ws://localhost:5000");

const pmValueElement = document.getElementById('pmValue');
const smileyImageElement = document.getElementById('smileyImage');
const containerElement = document.querySelector('.container');

webSocket.onmessage = function(event) {
    try {
        let pm = parseFloat(event.data);
        if (isNaN(pm)) {
            console.error("PM value is not a number: " + event.data);
            return;
        }

        let color, imageSource, backgroundImageSource;

        if (pm <= 25) {
            color = "#0000FF";
            imageSource = "./ImagePM/Img1.png";
            backgroundImageSource = "./ImagePM/ImPM1.png";
        } else if (pm <= 37) {
            color = "#00FF00";
            imageSource = "./ImagePM/Img2.png";
            backgroundImageSource = "./ImagePM/ImPM2.png";
        } else if (pm <= 50) {
            color = "#FFFF00";
            imageSource = "./ImagePM/Img3.png";
            backgroundImageSource = "./ImagePM/ImPM3.png";
        } else if (pm <= 90) {
            color = "#FFA500";
            imageSource = "./ImagePM/Img4.png";
            backgroundImageSource = "./ImagePM/ImPM4.png";
        } else {
            color = "#FF0000";
            imageSource = "./ImagePM/Img5.png";
            backgroundImageSource = "./ImagePM/ImPM14.png";
        }

        if (containerElement.style.backgroundColor !== color) {
            // containerElement.style.backgroundColor = color;  // ลบการตั้งค่าสีพื้นหลังออก
            pmValueElement.style.color = color;
            pmValueElement.textContent = Math.round(pm).toString();
            smileyImageElement.src = imageSource;
            console.log(`Setting background image to: ${backgroundImageSource}`);
            document.body.style.backgroundImage = `url('${backgroundImageSource}')`;
            document.body.style.backgroundSize = 'cover';
            document.body.style.backgroundRepeat = 'no-repeat';
            document.body.style.backgroundPosition = 'center';

        }
    } catch (e) {
        console.error("Failed to parse message to float: " + event.data);
    }
};

webSocket.onclose = function() {
    console.log("WebSocket connection closed, attempting to reconnect...");
    setTimeout(function() {
        webSocket = new WebSocket("ws://192.168.10.130:5000");
    }, 3000); // ลองเชื่อมต่อใหม่หลังจาก 3 วินาที
};

webSocket.onerror = function(error) {
    console.error("WebSocket error: ", error);
    alert("เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์");
};
