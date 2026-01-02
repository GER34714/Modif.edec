const STORE_NAME = "Tu Emprendimiento";
const WHATSAPP_NUMBER = "5491112345678";

let products = [];
let cart = {};

const $ = id => document.getElementById(id);

fetch("productos.json")
  .then(r => r.json())
  .then(data => {
    products = data;
    render();
  });

function render(){
  const grid = $("grid");
  grid.innerHTML = "";

  products.forEach(p=>{
    const el = document.createElement("div");
    el.className = "p";
    el.innerHTML = `
      <h3>${p.nombre}</h3>
      <p>$${p.precio}</p>
      <button onclick="add('${p.id}')">Agregar</button>
    `;
    grid.appendChild(el);
  });
}

function add(id){
  cart[id] = (cart[id]||0)+1;
  $("cartCount").textContent = Object.values(cart).reduce((a,b)=>a+b,0);
}

$("btnOpenCart").onclick = openCart;
$("btnStickyCart").onclick = openCart;
$("btnCloseCart").onclick = closeCart;
$("overlay").onclick = closeCart;

function openCart(){
  $("drawer").classList.add("show");
  $("overlay").classList.add("show");
}

function closeCart(){
  $("drawer").classList.remove("show");
  $("overlay").classList.remove("show");
}

$("btnSendWA").onclick = ()=>{
  let msg = "Pedido:%0A";
  for(const id in cart){
    const p = products.find(x=>x.id===id);
    msg += `- ${p.nombre} x${cart[id]}%0A`;
  }
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`);
};
