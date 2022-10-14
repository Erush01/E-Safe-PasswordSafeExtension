
createDataBase()

function createDataBase(){
    let request = window.indexedDB.open("Safe",1)
    request.onupgradeneeded=function(event){
        let db  = event.target.result
        db.createObjectStore("Credentials",{keyPath:'id' ,autoIncrement:true})
    }
    request.onerror=function(event){
        console.log(request.error)
    }
}


function addData(data){
    const request = window.indexedDB.open("Safe",1)
    request.onsuccess=function(event){
        let db=event.target.result
        const transaction = db.transaction(["Credentials"],"readwrite")
        const store = transaction.objectStore("Credentials")
        const feedback = store.add(data)
        feedback.onsuccess=(event)=>{
            console.log("Data Added Successfully")
        }

    }
    request.onerror=function(){
        console.log("An error has Occurred",request.error)
    }
}





const copyBtn=document.getElementById("copy-btn-img")
const generateBtn=document.getElementById("generate-btn")
let passwordArea=document.getElementById("password-gen")
const tabBtn=document.getElementById("tab-btn-img")
const saveBtn=document.getElementById("save-btn")
let websiteArea=document.getElementById("website-input")
const emailArea=document.getElementById("email-name")
const passwordSafe=document.getElementById("password-safe")
const openSafeBtn=document.getElementById("open-safe")
let safeArea=document.getElementById("safe-area")
let errorArea=document.getElementsByClassName("popup")[0]


const Allowed = {
    Uppers: "QWERTYUIOPASDFGHJKLZXCVBNM",
    Lowers: "qwertyuiopasdfghjklzxcvbnm",
    Numbers: "1234567890",
    Symbols: "!@#$%^&*"
}
const getRandomCharFromString = (str) => str.charAt(Math.floor(Math.random() * str.length))

generateBtn.addEventListener("click",function(){
    length=12
    let pwd = "";
    pwd += getRandomCharFromString(Allowed.Uppers); //pwd will have at least one upper
    pwd += getRandomCharFromString(Allowed.Lowers); //pwd will have at least one lower
    pwd += getRandomCharFromString(Allowed.Numbers); //pwd will have at least one number
    pwd += getRandomCharFromString(Allowed.Symbols);//pwd will have at least one symbolo
    for (let i = pwd.length; i < length; i++)
        pwd += getRandomCharFromString(Object.values(Allowed).join('')); //fill the rest of the pwd with random characters
    passwordArea.value=pwd
    console.log(pwd)

})

copyBtn.addEventListener("click",function(){
    navigator.clipboard.writeText(passwordArea.value)
    if (passwordArea.value !=''){
        document.getElementsByClassName("popup")[1].classList.add("active")
    setTimeout(()=>{
        document.getElementsByClassName("popup")[1].classList.remove("active")
     },2500)
    }
    
})

tabBtn.addEventListener("click",function(){

    chrome.tabs.query({active:true, currentWindow:true}, function(tabs){

        let domain=new URL(tabs[0].url)
        websiteArea.value=domain.hostname
    })
})

saveBtn.addEventListener("click",function(){
    const data={
        website:websiteArea.value,
        email:emailArea.value,
        password:passwordSafe.value
    }
    if(data.website && data.email && data.password != '')
    {
        addData(data)
        document.getElementsByClassName("popup")[2].classList.add("active")
        setTimeout(()=>{
            document.getElementsByClassName("popup")[2].classList.remove("active")
         },2500)
        }
        
    else{
        errorArea.classList.add("active")
        setTimeout(()=>{
           errorArea.classList.remove("active")
        },2500)
        
    }
    websiteArea.value=""
    emailArea.value=""
    passwordSafe.value="" 
    
})

openSafeBtn.addEventListener("click",function(){
    $('#safe-area').fadeToggle();
      $(document).mouseup(function (e) {
        var container = $("#safe-area");
    
        if (!container.is(e.target) // if the target of the click isn't the container...
            && container.has(e.target).length === 0) // ... nor a descendant of the container
        {
            container.fadeOut();
        }
      });
})

