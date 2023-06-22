const socket = io();
/* Agregado de un producto */
const form = document.getElementById("productForm");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const price = document.getElementById("price").value;
  const code = document.getElementById("code").value;
  const img = document.getElementById("thumbnail").value;
  const stock = document.getElementById("stock").value;
  const category = document.getElementById("category").value;
  const status = document.getElementById("status").value;

  const formData = {
    title,
    description,
    price,
    code,
    img,
    stock,
    category,
    status,
  };

  socket.emit("new-product", formData);
});

socket.on("show-products", (products) => {
  let html = products.map((product) => {
    return `<h4>${product.title} </h4>
    
    <p>${product.description}</p>
    <p>${product.price}</p>
    <p>${product.code}</p>
    <p>${product.img}</p>
    <p>${product.stock}</p>
    <p>${product.category}</p>
    <p>${product.status}</p>
    `;
  });
  const prodA = document.getElementById("product-update");
  prodA.innerHTML = html;
});

/* Eliminar un producto */
const borrarP = document.getElementById("deleteProdForm");

borrarP.addEventListener("submit", (e) => {
  e.preventDefault();
  const pCode = document.getElementById("pcode").value;

  const borrarCode = {
    pCode,
  };

  socket.emit("delete-product", borrarCode);
});

socket.on("update-products", (msg) => {
  const prodA = document.getElementById("delete-prod");
});
