const loadallPhones = async(status,brandName) => {
    // console.log("wow 3 sec gone")
    console.log(brandName);
    document.getElementById("spinner").style.display = "none";

    // fetch(`https://openapi.programming-hero.com/api/phones?search=iphone`)
    // .then(res => res.json())
    // .then(data => console.log(data))

    const response = await fetch(`https://openapi.programming-hero.com/api/phones?search=${brandName?brandName:"iphone"}`);
    const data = await response.json();
    console.log(data);

    if (status)
    {
        displayAllphone(data.data)
    }
    displayAllphone(data.data.slice(0,6))
    
}


const displayAllphone = (phones) => {
    // console.log(phones)
    const phoneContainer = document.getElementById("phones-container");
 phones.forEach (phone => 
 {
    // console.log(phone);
    const {brand, image , slug} = phone; //object destrucring
    const div = document.createElement('div');
    div.innerHTML= `
    <div class="card m-2 bg-base-100 w-96 shadow-xl">
  <figure class="px-10 pt-10">
    <img
      src=${image}
      alt="Shoes"
      class="rounded-xl" />
  </figure>
  <div class="card-body items-center text-center">
    <h2 class="card-title">${brand}</h2>
    <p>${slug}</p>
    <div class="card-actions">
      <button onClick="phoneDetails('${slug}')" class="btn btn-primary">Show Details</button>
    </div>
  </div>
</div>
    `;
    phoneContainer.appendChild(div);
 });
}

const handleShowAll = () =>
{
loadallPhones(true);
}

const handleSearch = () => {
// console.log("hello")
//callbackfunction

document.getElementById("spinner").style.display = "block";
const searchText = document.getElementById("search-box").value;
    setTimeout(function ()
{
    loadallPhones(false,searchText)
},3000)
}


const phoneDetails = async(slugs) => {
    // console.log(slug);

    const response = await fetch(`https://openapi.programming-hero.com/api/phone/${slugs}`);
    const data = await response.json();
    console.log(data.data);
    const {brand,image,slug} = data.data;

    const modalContainer = document.getElementById("modal-container");
    modalContainer.innerHTML = `
    <!-- Open the modal using ID.showModal() method -->
<button class="btn" onclick="my_modal_1.showModal()">open modal</button>
<dialog id="my_modal_1" class="modal">
  <div class="modal-box">
    <h3 class="text-lg font-bold">${brand}</h3>
    <img
      src=${image}
      alt="Shoes"
      class="rounded-xl" />
    <div class="modal-action">
      <form method="dialog">
        <!-- if there is a button in form, it will close the modal -->
        <button class="btn">${slug}</button>
      </form>
    </div>
  </div>
</dialog>
    `
    my_modal_1.showModal()

}





//global call
loadallPhones(false,"iphone");