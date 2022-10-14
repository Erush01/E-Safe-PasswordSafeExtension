let safe = document.getElementById("safe-table")
function getData(){
    const request = window.indexedDB.open("Safe",1)
    request.onsuccess=function(event){
        console.log("DB opened")
        let db=event.target.result
        db.transaction("Credentials").objectStore("Credentials").getAll().onsuccess=function(event){
            let array=event.target.result
            let html=""
            for(let i=0;i<array.length;i++){
                html+=`<tr>
                <td class="empty"><img src="images/clear.png" id="${array[i].id}" class="clear-img"></td>
                <td><a target="_blank" href="https://${array[i].website}">${array[i].website}</a></td>
                <td>${array[i].email}</td>
                <td>${array[i].password}<img src="images/copy2.png" id="${array[i].password}" class="copy-img"></td>
            </tr>`
                
            }
            safe.innerHTML+=html
        }
    }      
}
getData()
   

window.addEventListener('DOMSubtreeModified',(event)=>{
    clearBtns = document.getElementsByClassName("clear-img")
    copyBtns = document.getElementsByClassName("copy-img")
    console.log(copyBtns)
    if(clearBtns.length!=0){
        for(let i=0;i<clearBtns.length;i++){
            clearBtns[i].addEventListener('click',function(){
                console.log(clearBtns[i])
                const request = window.indexedDB.open("Safe",1)
                request.onsuccess=function(event){
                    let db=event.target.result
                    const request2 = db.transaction("Credentials","readwrite").objectStore("Credentials").delete(Number(clearBtns[i].id))
                    request2.onsuccess=function(event){
                        window.location.reload()
                    }
                    
                }
                // window.location.reload()

            })
        }
    }
    if(copyBtns.length!=0){
        for(let i=0; i<copyBtns.length;i++){
            copyBtns[i].addEventListener('click', function(){
                navigator.clipboard.writeText(copyBtns[i].id)
                console.log(copyBtns[i].id)
            })
            
        }
        
    }
    
})
