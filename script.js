document.addEventListener('DOMContentLoaded', function() {
    var generateButton = document.getElementById('generate');
    var inputField = document.getElementById('text');
  
    function getRandomColor() {
      var letters = '0123456789ABCDEF';
      var color = '#';
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }
  
    function checkInput() {
      if (inputField.value.trim() === '') {
        generateButton.disabled = true;
      } else {
        generateButton.disabled = false;
      }
    }
  
    inputField.addEventListener('input', checkInput);
    inputField.addEventListener('keydown', function(event) {
      if (event.keyCode === 13) { 
        generateButton.click(); 
      }
    });
  
    checkInput();
  
    generateButton.addEventListener('click', function() {
      this.disabled = true;
  
      var text = inputField.value;
      var qrCode = document.getElementById('qrcode');
      var container = qrCode.parentNode;
  
      qrCode.innerHTML = '';
  
      var existingDownloadButton = document.getElementById('downloadButton');
      if (existingDownloadButton) {
        container.removeChild(existingDownloadButton);
      }
  
      var colorDark = getRandomColor();
      new QRCode(qrCode, {
        text: text,
        width: 200,
        height: 200,
        colorDark: colorDark,
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
      });
  
      setTimeout(function() {
        var qrCanvas = qrCode.getElementsByTagName('canvas')[0];
        var qrCodeImage = qrCanvas.toDataURL('image/png');
  
        var downloadButton = document.createElement('button');
        downloadButton.id = 'downloadButton';
        downloadButton.textContent = 'Download QR Code';
        downloadButton.className = 'button';
        downloadButton.style.display = 'block';
        downloadButton.style.margin = '10px auto';
  
        downloadButton.addEventListener('click', function() {
          var link = document.createElement('a');
          link.href = qrCodeImage;
          link.download = 'QRCode.png';
          link.click();
        });
  
        container.appendChild(downloadButton);
      }, 100);
    });
  });
