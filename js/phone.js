// load data

const loadPhone = async (searchText='13', isShowAll) => {
  const res = await fetch(
  `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phones = data.data;
  // console.log(phones);
  displayPhone(phones, isShowAll);
};

// show display phone
const displayPhone = (phones, isShowAll) => {
  // console.log(phones)
  const containerDiv = document.getElementById('phone-container');
  containerDiv.textContent = '';

// show all btn for onekguli products thakle btn dekhabe
const showAllBtn = document.getElementById('show-all');
if (phones.length > 12 && !isShowAll){
  showAllBtn.classList.remove('hidden');
}
else{
  showAllBtn.classList.add('hidden')
}
// phone er length 12 ta pojonto dekhabe and show all button dekhabe na
if(!isShowAll){
  phones = phones.slice(0,12);
}
// console.log('is show all ', isShowAll)

  phones.forEach((phone) => {
    // console.log(phone);
    const phoneCard = document.createElement("div");
    phoneCard.classList = `card  bg-base-100 shadow-xl`;
    phoneCard.innerHTML = `
   <figure><img src="${phone.image}" alt="Shoes" /></figure>
        <div class="card-body">
          <h2 class="card-title">${phone.phone_name}</h2>
      <p>${ phone.slug}</p>
          <div class="card-actions justify-center">
            <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-secondary">Show Details</button>
          </div>
  `;
  containerDiv.appendChild(phoneCard);
  });
  toggleSpinner(false)
};

// handle search button
const handleSearchButton = (isShowAll) =>{
  toggleSpinner(true)
  const searchField = document.getElementById('search-field');
  const searchText = searchField.value;
  loadPhone(searchText, isShowAll)
}

// loader ba spinner
const toggleSpinner= (isLoading) =>{
  const loader = document.getElementById('loading');
  
  if(isLoading){
    loader.classList.remove('hidden')
  }
  else{
    loader.classList.add('hidden')
  }
}
// show details button onclick
const handleShowDetails = async (id) =>{
  // console.log('object',id )
  const res = await fetch (` https://openapi.programming-hero.com/api/phone/${id}`);
  const data = await res.json();
  const phone = data.data;
  showPhoneDetails(phone);
}
// show phone details on modal
const showPhoneDetails =(phone) =>{
  console.log(phone);
  const phoneName = document.getElementById('phone-name');
  phoneName.innerText = phone.name;
const showDetailContainer = document.getElementById('show-detail-container');
showDetailContainer.innerHTML = `
<img src="${phone?.image}" alt="" />
<p> <span>storage: ${phone?.mainFeatures?.storage}</span></p>
<p> <span>slug: ${phone?.slug}</span></p>
<p> <span>gps: ${phone?.others?.GPS || 'no gps here'}</span></p>
<p> <span>brand: ${phone?.brand}</span></p>
<p> <span>memory: ${phone?.mainFeatures?.memory}</span></p>
<p> <span>sensors: ${phone?.mainFeatures?.sensors[0]}</span></p>
<p> <span>sensors2: ${phone?.mainFeatures?.sensors[1]}</span></p>
`
  // show modal
  my_show_modal.showModal()
}

// handle show all button onclick
const handleShowAll = () => {
  handleSearchButton(true);
}

loadPhone();
