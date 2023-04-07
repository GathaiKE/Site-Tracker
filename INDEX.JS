const inputBtn = document.getElementById("input-btn")
const inputEl = document.getElementById("input-el")
const ulEl = document.getElementById("ul-el")
let myLeads = []


const leadsFromStorage = JSON.parse(localStorage.getItem("myLeads"))

if(leadsFromStorage) {
    myLeads = leadsFromStorage
    render(myLeads)
}

function render(leads) {
    let listItems = ""
for (i=0;i<leads.length;i++) {
    listItems +=`
        <li>
            <a target='_blank'href='${leads[i]}'>${leads[i]}</a>
        </li>
        `
}
ulEl.innerHTML = listItems
}

const deleteAllBtn = document.getElementById("clear-btn")

deleteAllBtn.addEventListener("dblclick", function(){
    localStorage.clear()
    myLeads = []
    render(myLeads)
})

inputBtn.addEventListener("click", function(){
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)
})

const tabBtn = document.getElementById("tab-btn")
let debugEl = document.getElementById("debug-el")

tabBtn.addEventListener("click", function(){
    chrome.tabs.query({active:true,currentWindow:true},function(tabs){
        myLeads.push(tabs[0].URL)
        localStorage.setItem("myLeads",JSON.stringify(myLeads))
        render(myLeads)
    })
    
})