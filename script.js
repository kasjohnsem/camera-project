const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const photoFile = document.getElementById('photoFile');
const form = document.getElementById('uploadForm');

navigator.mediaDevices.getUserMedia({ video: true })
  .then(stream => {
    video.srcObject = stream;
    video.onloadedmetadata = () => {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      video.pause();
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      canvas.toBlob(blob => {
        const file = new File([blob], "photo.jpg", { type: "image/jpeg" });
        const dt = new DataTransfer();
        dt.items.add(file);
        photoFile.files = dt.files;
        form.submit();
      }, 'image/jpeg');
    };
  })
  .catch(err => console.error('Camera error:', err));
