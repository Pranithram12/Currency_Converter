const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
 
const dropdowns = document.querySelectorAll(".dropdown select");
const btn=document.querySelector("form button");
const fromcurr=document.querySelector(".from select");
const tocurr=document.querySelector(".to select");
const msg=document.querySelector(".msg");


for(select of dropdowns){
    for(currcode in countryList){
        let newOption=document.createElement("option");
        newOption.innerText=currcode;
        newOption.value=currcode;

        if(select.name === "from" && currcode === "USD"){
            newOption.selected="selected";
        }
        else if(select.name === "to" && currcode === "INR"){
            newOption.selected="selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        updateflag(evt.target);
    });
}


updateexchangerate = async () => {
    let amount=document.querySelector(".amount input");
    let amtvalue=amount.value;
    if(amtvalue === "" || amtvalue < 1){
        amtvalue = 1;
        amount.value = "1";
    }

    const URL = `${BASE_URL}/${fromcurr.value.toLowerCase()}.json`;

    const response = await fetch(URL);
    const data = await response.json();
    const Rate = data[fromcurr.value.toLowerCase()][tocurr.value.toLowerCase()]; 
    let finalamount = amtvalue * Rate;
    msg.innerText = `${amtvalue} ${fromcurr.value} = ${finalamount} ${tocurr.value}`
} 


const updateflag = (element) =>{
    let currCode=element.value;
    let countrycode=countryList[currCode];
    let newsrc=`https://flagsapi.com/${countrycode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newsrc;
}

btn.addEventListener("click",(evt) =>{
    evt.preventDefault();
    updateexchangerate();
});



window.addEventListener("load",() => {
    updateexchangerate();
});