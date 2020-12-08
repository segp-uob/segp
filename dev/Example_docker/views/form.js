
var email = document.getElementById("email").value;
var experience = document.getElementById("experience").value;

document.querySelector('#btnSubmit').addEventListener('click', () => {
  sessionStorage.email = email;
  sessionStorage.experience = experience;
  
  //downloadToFile(textArea.value.concat(payload), 'my-new-file.txt', 'text/plain');
});
