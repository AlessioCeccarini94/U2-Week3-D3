const library = "https://striveschool-api.herokuapp.com/books"

const KEY = "book"

let cart = []

// localStorage.setItem(KEY), JSON.stringify(cart)

const getBooks = function () {
  fetch(library)
    .then((response) => {
      if (response.ok === true) {
        return response.json()
      } else {
        throw new Error("Errore")
      }
    })
    .then((books) => {
      books.forEach((book) => {
        const newCard = document.getElementById("card-section")
        newCard.innerHTML += `
        <div class=col col-4 col-md-3 col-lg-2>
        <div class="card m-2 p-5 bg-dark-subtle">
        <img src="${book.img}" class="card-img-top" alt="">
        <div class="card-body d-flex justify-content-center">
        <h5 class="card-title text-center">title:${book.title}</h5>
        <p class="card-text">${book.category}</p><span><p class="card-text">${book.price} $</p>
        <a href="#" class="add-to-cart btn btn-info fs-5 my-2"data-title=${book.title} data-price=${book.price}>AGGIUNGI AL CARRELLO</a>
        <a href="#" class="remove-from-cart btn btn-danger fs-5">RIMUOVI DAL CARRELLO</a>
        </div>
        </div>
      </div>`
      })
      const btns = document.querySelectorAll(".add-to-cart")
      btns.forEach((btn) => {
        btn.textContent === "AGGIUNGI AL CARRELLO"
        btn.addEventListener("click", addToCart)
      })
      const removeBtns = document.querySelectorAll(".remove-from-cart")
      removeBtns.forEach((btn) => {
        btn.textContent === "RIMUOVI DAL CARRELLO"
        btn.addEventListener("click", removeFromCart)
      })
    })
    .catch((error) => {
      console.log(error)
    })
}

const addToCart = (event) => {
  const button = event.target
  const title = button.dataset.title
  const price = button.dataset.price
  const cartElement = { title, price }
  cart.push(cartElement)
  localStorage.setItem(KEY, JSON.stringify(cart))
}

const removeFromCart = () => {
  localStorage.removeItem(KEY)
}
getBooks()
