siteNameInput = document.getElementById("site-name")
siteUrlInput = document.getElementById("site-url")
var Sites = []

if(localStorage.getItem("Sites")!=null){
  Sites = JSON.parse(localStorage.getItem("Sites"))
  displaySites()
}

function Submit(){

  if (validation()){
    var site = {
      name: siteNameInput.value,
      url: siteUrlInput.value,
     }
     Sites.push(site)
     localStorage.setItem("Sites",JSON.stringify(Sites))
     displaySites()
     clearForm()
  }else{
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Site name must contain at least 3 characters \n Site URL must be a valid one Ex:(www.google.com) ",
    });
  }
 
}

function Delete(Index) {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6", 
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  }).then((result) => {
    if (result.isConfirmed) {
      Sites.splice(Index , 1)
      localStorage.setItem("Sites",JSON.stringify(Sites))
      displaySites()
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success"
      });
    }
  });
 
}

function displaySites() {
  var trs =""
  for(var i=0; i < Sites.length; i++){
    trs+=`<tr>
    <td>${i+1}</td>
    <td>${Sites[i].name}</td>
    <td>
    <a href="https://${Sites[i].url}" target="_blank" class="btn btn-success px-3" id="site-url"><i class="fa-solid fa-eye me-2"></i>Visit</a>
    </td>
    <td>
      <button onclick="Delete(${i})" class="btn btn-danger"><i class="fa-solid fa-trash-can me-2"></i>Delete</button>
    </td>
      </tr>
    `
  }
  document.getElementById("tBody").innerHTML=trs
}

function clearForm() {
  siteNameInput.value=""
  siteUrlInput.value=""
}

function validation(){
  var url=siteUrlInput.value
  var name=siteNameInput.value
  var nameRegExp=/^.{3,}$/
  var urlRegExp = /^www\.([A-z]+)\.([A-z]{2,})$/
  return urlRegExp.test(url) && nameRegExp.test(name)

}
