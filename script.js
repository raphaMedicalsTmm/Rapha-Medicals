function upload() {
  window.open('form.html', '_self')
}

function home() {
  window.open('index.html', '_self')
}

function wp(){
  window.open('https://wa.me/919488512461')
}






// form script

const scriptURL = 'https://script.google.com/macros/s/AKfycbzvKAP9OWGkThWc8IPnUSUyLy7cT6Dmc6v0riTfdOUJrkoC5OClTmo0HATUScNjx7d2Pw/exec';
let url = "https://script.google.com/macros/s/AKfycbwrFdZYKgTtktrLxzUXsrR97oA9K27o-q8HFdFzFbIUGu7wjTxPPce7o3jTslUHyZ--XA/exec"; //url of the seperate app script project(https://script.google.com/home/projects/1s74sqraE-Ctf0GrGydq6Ipb6AYCkkZ7566HXLSOj1l0zvyj5_eBhjdRE/edit)


let form = document.forms['submit-to-google-sheet'];
let file = document.querySelector("#upload");
let img = document.querySelector("img");
let submitBtn = document.querySelector("input[type='submit']");

form.addEventListener('submit', (e) => {
  e.preventDefault();

  submitBtn.value = "Placing your order...";
  submitBtn.style.backgroundColor = 'grey';

  if (file.files.length > 0) {
    let fr = new FileReader();
    fr.addEventListener('loadend', () => {
      let res = fr.result;
      let spt = res.split("base64,")[1];
      let obj = {
        base64: spt,
        type: file.files[0].type,
        name: file.files[0].name
      };
      fetch(url, {
        method: "POST",
        body: JSON.stringify(obj)
      })
        .then(r => r.text())
        .then(data => console.log(data));
    });
    fr.readAsDataURL(file.files[0]);
  }
  fetch(scriptURL, { method: 'POST', body: new FormData(form) })
    .then(response => {
      console.log('Success!', response);
      window.open('thank.html', '_self');
    })
    .catch(error => console.error('Error!', error.message))
});


