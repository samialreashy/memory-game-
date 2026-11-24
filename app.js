const timer=document.querySelector("#timerId")
const startBtn=document.querySelector("#startID")
const playAgainBtn=document.querySelector("#playAgain")
const filpped=document.querySelectorAll(".card")
const attemps=document.querySelector("#attemps")

let timeleft=30
let timerid=null
let attempsNum=0
let firstElement=null
let lockcards=false

const test=filpped[0].parentElement


const randomFun=()=>{
    const remining=Array.from(filpped)
    filpped.forEach(()=>{
    let random=Math.floor(Math.random()*remining.length)
    let cards=remining.splice(random,1)[0]
    cards.classList.remove("flipped","matched")
    test.appendChild(cards)

})}




timer.textContent=timeleft



const updatetimer=()=>{
   timeleft=timeleft-1
    timer.textContent=timeleft
    
    attemps.textContent=attempsNum
    if (timeleft===0){
        clearInterval(timerid)
        timerid=null

    }
    
    

}

    startBtn.addEventListener('click',()=>{
        // if(timeleft===0){
        //     timer.textContent="Time up"
        //      clearInterval(timerid)
        //      timerid=null
        // }
        if(timerid){
            return
        }
        
        if(timeleft===0){
            timeleft=30
            timer.textContent=timeleft
            attempsNum=0
            attemps.textContent=attemps
            firstElement=null
            lockcards=false
        }
            randomFun()
        timerid=setInterval(updatetimer,1000)
        
       
    })
    
    filpped.forEach((item)=>{
    item.addEventListener('click',()=>{
        
        if(lockcards){
            return
        }
        if(!timerid){
            return
        }
        if(item===firstElement){
            return
        }
        //classlist.contains check if the this item have this mean i dont want same cards 
        if(item.classList.contains("matched")){
            
            return
        }
        item.classList.add("flipped")
        if(!firstElement){
            firstElement=item
            
            return
        }
        if(firstElement.dataset.name===item.dataset.name){
           firstElement.classList.add("matched")
           item.classList.add("matched")
            attempsNum++
            firstElement=null
        }
       else{
        lockcards=true
        
        let a=firstElement
        let b=item
        firstElement=null
        setTimeout(() => {
        filpped.forEach((item) => {
            a.classList.remove("flipped")
                b.classList.remove("flipped")
                lockcards=false

            })
                
          
       
    }, 500)
    firstElement=null
} 
        
    
})
})

    

playAgainBtn.addEventListener("click",()=>{
    filpped.forEach(card => card.classList.remove("flipped", "matched"))
    
    clearInterval(timerid)
    firstElement = null
    timerid=null
    lockcards=false

    timeleft=30
    timer.textContent=timeleft
    attempsNum=0
    attemps.textContent=attempsNum
    randomFun()
    
})