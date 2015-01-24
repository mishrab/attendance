document.addEventListener('DOMContentLoaded', function () {
   var xhr = new XMLHttpRequest();
   xhr.open('POST', '/browserinfo');
   xhr.setRequestHeader('accept', 'application/json');
   xhr.addEventListener('readystatechange', function () {
       if( xhr.readyState === 4 && xhr.status === 200 ) {
           var obj = JSON.parse(xhr.responseText);
           console.log(obj);
       }
   });
   var json = JSON.stringify({
       userAgent: navigator.userAgent
   });
   xhr.send(json);
});