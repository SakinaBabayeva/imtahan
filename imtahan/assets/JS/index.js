const productsAll=document.getElementById("productsAll");

let page = 1
let limit = 3


const renderProducts = () => {
    axios.get(`https://65680f8f9927836bd97407de.mockapi.io/basket?limit${limit}&page${page}`)
        .then((res) => {
            db = res.data
            db.map((item) => {
                let miniDiv = document.createElement("div")
                // miniDiv.className='boxDiv col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12 ';
                miniDiv.className="miniDiv col-xl-4 col-lg-4 col-md-6 col-sm-12 ";
                miniDiv.innerHTML = `
            <img src="${item.image}" alt="">
            <h2>${item.title}</h2>
            <div class="wishAdd">
                <button onclick = "addToCart(${item.id})">+ ADD TO CART</button>
            <button class="wish" onclick = "addToWish(${item.id})"><i class="fa-solid fa-heart"></i></button>
</div>

            `
                productsAll.append(miniDiv)
            })
            page++
        })
}


loadMore.addEventListener("click", renderProducts)




function addToCart(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let productItem = cart.find(item => item.id == index)
    if(productItem) {
        productItem.count = (productItem.count || 1) + 1
    } else {
        cart.push(db.find((item) => item.id == index));
    }
    localStorage.setItem("cart", JSON.stringify(cart));
}

function addTowishlist(index) {
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    let productItem = wishlist.find(item => item.id == index)

    if(productItem){
        alert('Aye var!')
    }else {
        wishlist.push(db.find((item) => item.id == index));
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
    }

}

window.onload = () => {
    renderProducts()
}



