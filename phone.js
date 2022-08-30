const dataLoad = async (searchValue, datalimit)=>{
    const url =  `https://openapi.programming-hero.com/api/phones?search=${searchValue}`
    const res = await fetch(url)
    const data = await res.json()
    phoneData(data.data, datalimit);
}

const phoneCard = document.getElementById('phone-container');
const showAll = document.getElementById('show-all');
const infoTitle = document.getElementById('info-title')
    // card genaret function 

const phoneData = (data, datalimit)=>{

    phoneCard.textContent='';
    if(data.length === 0){
        infoTitle.innerText=`No Result Found
        Please Type Brand Name Correctly
        `
    }
    else{
        infoTitle.innerText=`
        ${data.length} results found
        `
    }

    if(datalimit && data.length > 9){
       data = data.slice(0,9)
        showAll.classList.remove('hidden')
    }
    else{
        showAll.classList.add('hidden');
    }


    data.forEach(phone => {
        // console.log(phone);
        const {brand,phone_name, slug, image} =phone;
        const div = document.createElement('div')
        div.innerHTML=`
        <div class="card w-96 bg-slate-800 shadow-xl">
                        <figure><img src="${image}" /></figure>
                        <div class="card-body">
                          <h2 class="card-title"> Brand : ${brand}</h2>
                          <h2 class="card-title">Phone Name : ${phone_name}</h2>
                          <div class="card-actions justify-center pt-3">
                          <label onclick="openModal('${slug}')" for="my-modal" class="btn modal-button btn-primary">See More</label>
                          </div>
                        </div>
                      </div>
        `
        phoneCard.appendChild(div);
    });
    toggleSpinner(false);
    
}

const openModal = (id)=>{
    fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    .then(res => res.json())
    .then(code => {
        console.log(code.data);
        const modalImg = document.getElementById('modal-body');
        modalImg.innerHTML =`
                        <label for="my-modal" class="btn btn-sm btn-circle sticky absolute right-2 top-2 ">✕</label>
                         <div id="modal-img" class="flex justify-center">
                         <img src="${code.data.image}" alt="">
                         </div>
                        <h3 class="font-bold text-lg">Name : ${code.data.name}</h3>
                        <h3 class="font-bold text-lg">Brand : ${code.data.brand}</h3>
                        <h3 class="font-bold text-lg">Release Date : ${code.data.releaseDate}</h3>
                        <br>
                        <p class="text-2xl"> Features :</p>
                        <p class="text-xl"> Storage :<span class="text-lg"> ${code.data.mainFeatures.storage}</span> </p>
                        <p class="text-xl"> Display Size :<span class="text-lg"> ${code.data.mainFeatures.displaySize}</span> </p>
                        <p class="text-xl"> chipSet :<span class="text-lg"> ${code.data.mainFeatures.chipSet}</span> </p>
                        <p class="text-xl"> memory :<span class="text-lg"> ${code.data.mainFeatures.memory}</span> </p>
                        <br>
                        <p class="text-2xl">Others Features :</p>
                        <p class="text-xl"> WLAN : <span class="text-lg"> ${code.data.others.WLAN}</span> </p>
                        <p class="text-xl"> Bluetooth : <span class="text-lg"> ${code.data.others.Bluetooth}</span> </p>
                        <p class="text-xl"> GPS : <span class="text-lg">${code.data.others.GPS}</span> </p>
                        <p class="text-xl"> NFC : <span class="text-lg"> ${code.data.others.NFC}</span> </p>
                        <p class="text-xl"> Radio : <span class="text-lg"> ${code.data.others.Radio}</span> </p>
                        <p class="text-xl"> USB : <span class="text-lg"> ${code.data.others.USB}</span> </p>
                        <br>
                        <p class="text-xl"> Sensors : <span class="text-lg"> ${code.data.mainFeatures.sensors.join(' , ')}</span> </p>
                        
                        <div class="modal-action">
                        <label for="my-modal" class="btn btn-warning">Buy It</label>
                        </div>
        `
    })
   
}

// seach button function 

const input =()=>{
    const searchValue = seach();
    dataLoad(searchValue, 10);
    toggleSpinner(true);
    
}

// input function 
const seach =()=>{
    const search = document.getElementById('search');
    const searchValue = search.value ;
    return searchValue;
}
// search inter 
document.getElementById('search').addEventListener('keyup',(e)=>{
    console.log(e.key);
    if(e.key === 'Enter'){
        const searchValue = seach();
        dataLoad(searchValue, 10);
        toggleSpinner(true); 
    }
})
    
// loader function 
const toggleSpinner = (isSpinner)=>{
    const loader = document.getElementById('loader')
        if( isSpinner == true){
            loader.classList.remove('hidden');
        }
        else{
            loader.classList.add('hidden');
        }
}


// show all button function 
const showAllBtn = ()=>{
    const searchValue = seach();
    dataLoad(searchValue);;
    showAll.classList.add('hidden');
}
// dataLoad('apple', 10)

 

