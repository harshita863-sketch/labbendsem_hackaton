import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

/* ---------- Styles ---------- */
const css = `
*{
    margin:0;
    padding:0;
    box-sizing:border-box;
    font-family:Arial, Helvetica, sans-serif;
}

body{
    background:#f5f5f5;
}

/* ---------- Header ---------- */
.banner{
    position:relative;
    background:#7851a9;
    height:300px;
}

.banner-img{
    width:100%;
    height:300px;
    object-fit:cover;
}

.top-left{
    position:absolute;
    top:15px;
    left:20px;
    display:flex;
    align-items:center;
    gap:15px;
}

.top-buttons{
    position:absolute;
    top:20px;
    right:20px;
    display:flex;
    gap:10px;
}

.top-buttons button{
    padding:10px 18px;
    border:none;
    border-radius:25px;
    cursor:pointer;
    font-size:15px;
    transition:0.3s;
}

.logout{
    background:#dc3545;
    color:white;
}

.logout:hover{
    background:#b02a37;
}

.merchant-button{
    display:flex;
    align-items:center;
    gap:8px;
    padding:10px 22px;
    border:2px solid white;
    border-radius:25px;
    cursor:pointer;
    font-size:15px;
    font-weight:bold;
    color:white;
    background:linear-gradient(135deg, #11998e, #38ef7d);
    box-shadow:0 0 10px rgba(0,0,0,0.4);
    transition:0.3s;
}

.merchant-button:hover{
    transform:scale(1.07);
    box-shadow:0 0 15px rgba(56,239,125,0.9);
}

.merchant-button .icon{
    font-size:18px;
}

.cart-button{
    background:white;
    color:#7851a9;
    font-weight:bold;
    box-shadow:0 0 8px rgba(0,0,0,0.4);
    display:flex;
    align-items:center;
    gap:8px;
}

.cart-button:hover{
    background:#f8d7e3;
    transform:scale(1.05);
}

.cart-button .icon{
    font-size:20px;
}

#cartCount{
    background:#dc3545;
    color:white;
    min-width:22px;
    height:22px;
    border-radius:50%;
    font-size:13px;
    display:inline-flex;
    align-items:center;
    justify-content:center;
}

/* ---------- My Account ---------- */
.account-button{
    background:linear-gradient(135deg, #7851a9, #c06cd8);
}

.account-button:hover{
    box-shadow:0 0 15px rgba(192,108,216,0.9);
}

.badge{
    display:inline-block;
    padding:3px 10px;
    border-radius:12px;
    font-size:12px;
    font-weight:bold;
    color:white;
    background:#7851a9;
}

.badge.Packed{ background:#f0a500; }
.badge.Shipped{ background:#1e88e5; }
.badge.Delivered{ background:#28a745; }
.badge.Cancelled{ background:#dc3545; }

.steps{
    display:flex;
    margin:22px 0 12px;
}

.step{
    flex:1;
    text-align:center;
    position:relative;
    font-size:13px;
    color:#888;
}

.step .dot{
    width:30px;
    height:30px;
    border-radius:50%;
    background:#ddd;
    color:white;
    margin:0 auto 6px;
    display:flex;
    align-items:center;
    justify-content:center;
    font-weight:bold;
    position:relative;
    z-index:1;
}

.step::before{
    content:"";
    position:absolute;
    top:14px;
    left:-50%;
    width:100%;
    height:3px;
    background:#ddd;
    z-index:0;
}

.step:first-child::before{
    display:none;
}

.step.done{
    color:#222;
    font-weight:bold;
}

.step.done .dot{
    background:#28a745;
}

.step.done::before{
    background:#28a745;
}

.track-note{
    text-align:center;
    font-size:14px;
    color:#444;
    margin-bottom:10px;
}

.cancel-note{
    text-align:center;
    color:#dc3545;
    font-weight:bold;
    margin:15px 0;
}

.profile-stats{
    display:flex;
    gap:12px;
    margin-bottom:5px;
}

.profile-stats div{
    flex:1;
    background:#f8d7e3;
    border-radius:8px;
    padding:10px;
    text-align:center;
    font-size:14px;
}

.profile-stats b{
    display:block;
    font-size:20px;
    color:#7851a9;
}

/* ---------- Delivery guarantee ---------- */
.panel .guarantee-box{
    display:flex;
    gap:10px;
    align-items:flex-start;
    margin-top:15px;
    padding:12px;
    border:2px dashed #7851a9;
    border-radius:10px;
    background:#f4eefb;
    cursor:pointer;
    font-weight:normal;
    font-size:14px;
    line-height:1.5;
}

.panel .guarantee-box input{
    width:20px;
    height:20px;
    padding:0;
    margin-top:2px;
    cursor:pointer;
}

.guarantee-box b{
    color:#7851a9;
}

.guarantee-tag{
    display:inline-block;
    background:#f4eefb;
    color:#7851a9;
    border:1px solid #7851a9;
    border-radius:12px;
    padding:2px 10px;
    font-size:12px;
    font-weight:bold;
}

/* ---------- Search and sort ---------- */
.search-section{
    display:flex;
    justify-content:center;
    flex-wrap:wrap;
    gap:12px;
    padding:25px 20px 0;
}

.search-section input{
    width:100%;
    max-width:450px;
    padding:12px 18px;
    border:2px solid #7851a9;
    border-radius:25px;
    font-size:16px;
    outline:none;
}

.search-section input:focus{
    box-shadow:0 0 8px #c9b3e6;
}

.search-section select{
    padding:12px 18px;
    border:2px solid #7851a9;
    border-radius:25px;
    font-size:16px;
    background:white;
    color:#7851a9;
    cursor:pointer;
    outline:none;
}

.search-section select:focus{
    box-shadow:0 0 8px #c9b3e6;
}

/* ---------- Category grid ---------- */
.section-title{
    text-align:center;
    color:#7851a9;
    margin:30px 0 10px;
}

.categories{
    display:grid;
    grid-template-columns:repeat(5, 1fr);
    gap:15px;
    padding:10px 40px;
}

.category{
    background:white;
    border:2px solid #f8d7e3;
    border-radius:10px;
    padding:18px 10px;
    text-align:center;
    cursor:pointer;
    transition:0.3s;
}

.category:hover{
    transform:translateY(-5px);
    box-shadow:0 0 10px gray;
}

.category.active{
    background:#7851a9;
    border-color:#7851a9;
    color:white;
}

.category .icon{
    font-size:30px;
    display:block;
}

.category .name{
    display:block;
    margin-top:6px;
    font-weight:bold;
}

.category .count{
    font-size:13px;
}

/* ---------- Products ---------- */
.products{
    display:grid;
    grid-template-columns:repeat(3, 1fr);
    gap:25px;
    padding:30px 40px 40px;
}

.card{
    background:#f8d7e3;
    border-radius:10px;
    text-align:center;
    box-shadow:0 0 10px gray;
    padding:20px;
    transition:transform 0.3s;
}

.card:hover{
    transform:translateY(-6px);
}

.card img,
.no-image{
    width:170px;
    height:200px;
    object-fit:contain;
    background:white;
    border-radius:10px;
}

.no-image{
    display:flex;
    align-items:center;
    justify-content:center;
    margin:0 auto;
    color:#7851a9;
    font-size:40px;
    text-align:center;
}

.card h3{
    margin:10px;
    color:#7851a9;
}

.price{
    color:#333;
    font-size:22px;
    font-weight:bold;
    margin:10px;
}

.card p{
    margin:6px;
}

.stock{
    font-size:14px;
    color:#555;
}

.stock.low{
    color:#dc3545;
    font-weight:bold;
}

.buy-button{
    padding:10px 25px;
    background:#7851a9;
    color:white;
    border:none;
    border-radius:5px;
    cursor:pointer;
    margin-top:10px;
    transition:0.3s;
}

.buy-button:hover{
    background:#5e3d85;
}

.buy-button:disabled{
    background:gray;
    cursor:not-allowed;
}

#noResult{
    text-align:center;
    color:#7851a9;
    font-size:20px;
    padding:20px;
}

/* ---------- Toast ---------- */
#toast{
    position:fixed;
    bottom:30px;
    left:50%;
    transform:translateX(-50%);
    background:#333;
    color:white;
    padding:12px 22px;
    border-radius:25px;
    opacity:0;
    transition:opacity 0.4s;
    z-index:3000;
    pointer-events:none;
}

#toast.show{
    opacity:1;
}

/* ---------- Cart drawer ---------- */
#cartBox{
    position:fixed;
    top:0;
    right:0;
    width:360px;
    height:100%;
    background:white;
    box-shadow:0 0 10px gray;
    padding:20px;
    overflow:auto;
    z-index:1000;
    transform:translateX(100%);
    transition:transform 0.4s;
}

#cartBox.open{
    transform:translateX(0);
}

#cartBox h2{
    color:#7851a9;
    margin-bottom:15px;
    text-align:center;
}

.cart-row{
    display:flex;
    justify-content:space-between;
    align-items:center;
    background:#f8d7e3;
    border-radius:8px;
    padding:10px;
    margin-bottom:10px;
}

.cart-row .info span{
    font-size:14px;
}

.qty-box{
    display:flex;
    align-items:center;
    gap:6px;
}

.qty-box button{
    width:26px;
    height:26px;
    background:#7851a9;
    color:white;
    border:none;
    border-radius:50%;
    cursor:pointer;
}

.cart-total{
    text-align:center;
    margin:15px 0;
    color:#333;
}

.cart-action{
    padding:9px 14px;
    background:#7851a9;
    color:white;
    border:none;
    border-radius:5px;
    cursor:pointer;
    margin:5px;
    transition:0.3s;
}

.cart-action:hover{
    background:#5e3d85;
}

.cart-action.green{
    background:#28a745;
}

.cart-action.red{
    background:#dc3545;
}

.cart-buttons{
    text-align:center;
}

/* ---------- Popups ---------- */
.overlay{
    position:fixed;
    top:0;
    left:0;
    width:100%;
    height:100%;
    background:rgba(0,0,0,0.6);
    z-index:2000;
    overflow:auto;
}

.panel{
    background:white;
    width:420px;
    max-width:92%;
    margin:40px auto;
    padding:25px;
    border-radius:10px;
    box-shadow:0 0 10px gray;
}

.panel.wide{
    width:850px;
}

.panel h2{
    color:#7851a9;
    text-align:center;
    margin-bottom:15px;
}

.panel h3{
    color:#7851a9;
    margin:15px 0 8px;
}

.panel label{
    display:block;
    margin-top:12px;
    font-weight:bold;
    color:#333;
}

.panel input,
.panel textarea,
.panel select{
    width:100%;
    padding:10px;
    margin-top:5px;
    border:2px solid #f8d7e3;
    border-radius:5px;
    font-size:15px;
}

.panel input:focus,
.panel textarea:focus,
.panel select:focus{
    outline:none;
    border-color:#7851a9;
}

#orderSummary{
    background:#f8d7e3;
    border-radius:8px;
    padding:10px;
    margin-top:15px;
    font-size:15px;
}

/* ---------- Merchant panel ---------- */
.tabs{
    display:flex;
    justify-content:center;
    gap:10px;
    margin-bottom:15px;
}

.tabs button{
    padding:9px 20px;
    border:2px solid #7851a9;
    background:white;
    color:#7851a9;
    border-radius:20px;
    cursor:pointer;
}

.tabs button.active{
    background:#7851a9;
    color:white;
}

.table-wrap{
    overflow-x:auto;
}

table{
    width:100%;
    border-collapse:collapse;
}

th{
    background:#7851a9;
    color:white;
    padding:10px;
    text-align:left;
}

td{
    padding:8px 10px;
    border-bottom:1px solid #f8d7e3;
}

td button{
    padding:5px 10px;
    margin-right:4px;
    background:#7851a9;
    color:white;
    border:none;
    border-radius:4px;
    cursor:pointer;
}

td button.red{
    background:#dc3545;
}

.form-row{
    display:grid;
    grid-template-columns:repeat(2, 1fr);
    gap:0 15px;
}

.order-box{
    background:#f8d7e3;
    border-radius:8px;
    padding:12px;
    margin-bottom:12px;
    font-size:14px;
    line-height:1.6;
}

.order-box.cancelled{
    background:#f1f1f1;
    border-left:5px solid #dc3545;
}

.order-box select{
    width:auto;
    margin-top:0;
    padding:5px;
}

.cancel-text{
    color:#dc3545;
    font-weight:bold;
}

footer{
    background:#7851a9;
    color:white;
    text-align:center;
    padding:15px;
}

/* ---------- Responsive ---------- */
@media (max-width:900px){
    .categories{
        grid-template-columns:repeat(3, 1fr);
    }
    .products{
        grid-template-columns:repeat(2, 1fr);
    }
}

@media (max-width:600px){
    .categories{
        grid-template-columns:repeat(2, 1fr);
        padding:10px 20px;
    }
    .products{
        grid-template-columns:1fr;
        padding:20px;
    }
    #cartBox{
        width:100%;
    }
    .top-buttons{
        top:auto;
        bottom:15px;
        right:10px;
        flex-wrap:wrap;
        justify-content:flex-end;
    }
    .top-left{
        left:10px;
    }
    .form-row{
        grid-template-columns:1fr;
    }
}
`;

/* ---------- Data ---------- */
const defaultProducts = [
    { id:1,  name:"Makeup Pack",    category:"makeup",    price:1700, discount:50, stock:10, icon:"💄",
      image:"https://www.dermablogger.com/images/posts/10-must-have-cosmetics-for-every-woman-s-beauty-routine-md.jpg" },
    { id:2,  name:"Dress",          category:"dress",     price:240,  discount:40, stock:10, icon:"👗",
      image:"https://i.pinimg.com/originals/99/dc/61/99dc61b035b5596ee7af93c6c8465616.jpg" },
    { id:3,  name:"Women Suit",     category:"dress",     price:203,  discount:30, stock:10, icon:"👗",
      image:"https://i.pinimg.com/originals/65/f5/26/65f52629be77028d1b4c5a98684cdceb.png" },
    { id:4,  name:"Coat",           category:"dress",     price:800,  discount:20, stock:10, icon:"🧥",
      image:"https://i5.walmartimages.com/seo/Pea-Coats-for-Women-Womens-Fashion-Winter-Long-Trench-Coat-Jackets-Notch-Collar-Open-Front-Cardigans-Outwear_f05efe24-9afc-4605-884c-c50d934202a7.08846bd58f794e9506bdfef63a55b763.jpeg" },
    { id:5,  name:"Women Shoes",    category:"shoes",     price:300,  discount:20, stock:10, icon:"👟",
      image:"https://m.media-amazon.com/images/I/71IhuPi7iTL._AC_SL1500_.jpg" },
    { id:6,  name:"Women Heels",    category:"shoes",     price:4000, discount:20, stock:10, icon:"👠",
      image:"https://tse3.mm.bing.net/th/id/OIP.6WubmIz0gUgb8aURM3ArsAHaHa?r=0&pid=ImgDet&w=474&h=474&rs=1&o=7&rm=3" },
    { id:7,  name:"Watch",          category:"accessory", price:2000, discount:20, stock:10, icon:"⌚",
      image:"https://i.etsystatic.com/25605644/r/il/288464/4127036743/il_1588xN.4127036743_s68w.jpg" },
    { id:8,  name:"Bracelet",       category:"accessory", price:1440, discount:20, stock:10, icon:"📿",
      image:"https://www.besttohave.com/images/adjustable-women-s-bracelet-925-sterling-silver-with-created-diamond-p550-4145_zoom.jpg" },
    { id:9,  name:"Flora Dress",    category:"dress",     price:2399, discount:20, stock:10, icon:"👗",
      image:"https://i.pinimg.com/originals/7c/05/25/7c052579112694f094b19529a2c92b28.jpg" }
];

const categoryTiles = [
    { key:"all",       icon:"🛍️", name:"All" },
    { key:"accessory", icon:"⌚",  name:"Accessories" },
    { key:"dress",     icon:"👗",  name:"Dress" },
    { key:"shoes",     icon:"👠",  name:"Shoes" },
    { key:"makeup",    icon:"💄",  name:"Makeup" }
];

const statuses = ["Placed", "Packed", "Shipped", "Delivered", "Cancelled"];
const trackSteps = ["Placed", "Packed", "Shipped", "Delivered"];

const trackMessages = {
    Placed:    "We have received your order.",
    Packed:    "The seller has packed your order.",
    Shipped:   "Your order is on the way.",
    Delivered: "Your order has been delivered."
};

const emptyProfile = { name:"", phone:"", email:"", address:"" };
const GUARANTEE_FEE = 100;
const emptyCheckout = { fullName:"", phone:"", email:"", address:"", payment:"", pin:"", guarantee:false };
const emptyProductForm = { id:"", name:"", category:"accessory", price:"", discount:"", stock:"" };

/* ---------- Storage helpers ---------- */

function load(key, fallback){
    try{
        const value = JSON.parse(localStorage.getItem(key));
        return value || fallback;
    }
    catch(e){
        return fallback;
    }
}

function loadProducts(){
    return load("shopProducts", defaultProducts).filter(function(p){
        return p.category != "merch";
    });
}

/* ---------- Simple API (all data access goes through here) ---------- */
/* Uses localStorage now. To use a real server, change only these bodies, e.g.
   getProducts: async function(){ return (await fetch("/api/products")).json(); } */

const api = {
    getProducts:  async function(){ return loadProducts(); },
    saveProducts: async function(list){ localStorage.setItem("shopProducts", JSON.stringify(list)); },

    getOrders:    async function(){ return load("shopOrders", []); },
    saveOrders:   async function(list){ localStorage.setItem("shopOrders", JSON.stringify(list)); },

    getProfile:   async function(){ return load("shopProfile", emptyProfile); },
    saveProfile:  async function(p){ localStorage.setItem("shopProfile", JSON.stringify(p)); }
};

/* ---------- Product picture ---------- */

function ProductImage({ p }){

    const [failed, setFailed] = useState(false);

    if(p.image == ""){
        return <div className="no-image">{p.icon}</div>;
    }
    if(failed){
        return <div className="no-image">{p.name}</div>;
    }
    return <img src={p.image} alt={p.name} onError={function(){ setFailed(true); }} />;
}

/* ---------- Main component ---------- */

export default function Dashboard(){

    const navigate = useNavigate();

    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [profile, setProfile] = useState(emptyProfile);
    const [cart, setCart] = useState(function(){ return load("shopCart", []); });

    const [currentCategory, setCurrentCategory] = useState("all");
    const [search, setSearch] = useState("");
    const [sortType, setSortType] = useState("default");
    const [bannerFailed, setBannerFailed] = useState(false);

    const [cartOpen, setCartOpen] = useState(false);
    const [checkoutOpen, setCheckoutOpen] = useState(false);
    const [checkout, setCheckout] = useState(emptyCheckout);

    const [loginOpen, setLoginOpen] = useState(false);
    const [merchantId, setMerchantId] = useState("");
    const [merchantPassword, setMerchantPassword] = useState("");
    const [merchantOpen, setMerchantOpen] = useState(false);
    const [merchantTitle, setMerchantTitle] = useState("Merchant Dashboard");
    const [tab, setTab] = useState("inventory");
    const [form, setForm] = useState(emptyProductForm);

    const [accountOpen, setAccountOpen] = useState(false);
    const [accountTab, setAccountTab] = useState("history");
    const [trackId, setTrackId] = useState("");

    const [toastText, setToastText] = useState("");
    const [toastShow, setToastShow] = useState(false);

    const toastTimer = useRef(null);
    const formRef = useRef(null);
    const nameRef = useRef(null);

    // load everything from the api when the page opens
    useEffect(function(){
        api.getProducts().then(function(list){
            setProducts(list);
            // drop basket items whose product no longer exists
            setCart(function(old){
                return old.filter(function(c){
                    return list.some(function(p){ return p.id == c.id; });
                });
            });
        });
        api.getOrders().then(setOrders);
        api.getProfile().then(setProfile);
    }, []);

    function saveProducts(list){
        setProducts(list);
        api.saveProducts(list);
    }

    function saveOrders(list){
        setOrders(list);
        api.saveOrders(list);
    }

    function saveCart(list){
        setCart(list);
        localStorage.setItem("shopCart", JSON.stringify(list));
    }

    function findProduct(id){
        return products.find(function(p){ return p.id == id; }) || null;
    }

    function showToast(message){
        setToastText(message);
        setToastShow(true);
        clearTimeout(toastTimer.current);
        toastTimer.current = setTimeout(function(){ setToastShow(false); }, 1500);
    }

    /* ----- products, category, search, sort ----- */

    const list = products.slice();

    if(sortType == "high"){
        list.sort(function(a, b){ return b.price - a.price; });
    }
    else if(sortType == "low"){
        list.sort(function(a, b){ return a.price - b.price; });
    }

    const visible = list.filter(function(p){
        const matchName = p.name.toLowerCase().includes(search.toLowerCase());
        const matchCategory = (currentCategory == "all" || currentCategory == p.category);
        return matchName && matchCategory;
    });

    function countOf(key){
        if(key == "all"){
            return products.length;
        }
        return products.filter(function(p){ return p.category == key; }).length;
    }

    /* ----- cart ----- */

    function addToCart(id){

        const p = findProduct(id);

        if(p == null || p.stock == 0){
            return;
        }

        const existing = cart.find(function(c){ return c.id == id; });

        if(existing){

            if(existing.qty >= p.stock){
                showToast("Only " + p.stock + " available");
                return;
            }

            saveCart(cart.map(function(c){
                return c.id == id ? { ...c, qty:c.qty + 1 } : c;
            }));
        }
        else{
            saveCart([...cart, { id:p.id, name:p.name, price:p.price, qty:1 }]);
        }

        showToast(p.name + " added to basket");
    }

    function changeQty(index, change){

        const p = findProduct(cart[index].id);

        if(change > 0 && p != null && cart[index].qty >= p.stock){
            showToast("Only " + p.stock + " available");
            return;
        }

        const newCart = cart.map(function(c, i){
            return i == index ? { ...c, qty:c.qty + change } : c;
        }).filter(function(c){
            return c.qty > 0;
        });

        saveCart(newCart);
    }

    const total = cart.reduce(function(sum, c){ return sum + c.price * c.qty; }, 0);
    const cartCount = cart.reduce(function(sum, c){ return sum + c.qty; }, 0);

    const guaranteeFee = checkout.guarantee ? GUARANTEE_FEE : 0;
    const grandTotal = total + guaranteeFee;

    /* ----- checkout ----- */

    function openCheckout(){

        if(cart.length == 0){
            alert("Your basket is empty!");
            return;
        }

        setCheckout(function(old){
            return {
                ...old,
                fullName: old.fullName || profile.name,
                phone:    old.phone    || profile.phone,
                email:    old.email    || profile.email,
                address:  old.address  || profile.address
            };
        });

        setCheckoutOpen(true);
        setCartOpen(false);
    }

    function updateCheckout(field, value){
        setCheckout(function(old){
            const next = { ...old, [field]: value };
            if(field == "payment" && value != "Credit / Debit Card"){
                next.pin = "";
            }
            return next;
        });
    }

    async function placeOrder(event){

        event.preventDefault();

        // read the newest data through the api
        const savedOrders = await api.getOrders();
        const savedProducts = await api.getProducts();

        const orderId = "ORD" + (1001 + savedOrders.length);

        const items = cart.map(function(c){
            return { id:c.id, name:c.name, qty:c.qty, price:c.price };
        });

        const newProducts = savedProducts.map(function(p){
            const inCart = cart.find(function(c){ return c.id == p.id; });
            return inCart ? { ...p, stock:Math.max(0, p.stock - inCart.qty) } : p;
        });

        // note: the PIN is only checked by the form and is never saved
        const order = {
            id:orderId,
            name:checkout.fullName,
            phone:checkout.phone,
            address:checkout.address,
            payment:checkout.payment,
            items:items,
            itemsTotal:total,
            guarantee:checkout.guarantee,
            guaranteeFee:guaranteeFee,
            total:grandTotal,
            status:"Placed",
            date:new Date().toLocaleDateString()
        };

        saveOrders([...savedOrders, order]);
        saveProducts(newProducts);

        localStorage.setItem("lastOrder", JSON.stringify(order));

        setCheckout(emptyCheckout);
        saveCart([]);

        setCheckoutOpen(false);
        navigate("/payment");
    }

    /* ----- merchant ----- */

    function openMerchant(){
        setMerchantId("");
        setMerchantPassword("");
        setLoginOpen(true);
    }

    function merchantLogin(event){

        event.preventDefault();

        setMerchantTitle("Merchant Dashboard - " + merchantId);
        setLoginOpen(false);

        api.getOrders().then(setOrders);
        api.getProducts().then(setProducts);

        setTab("inventory");
        setMerchantOpen(true);
    }

    function switchTab(name){
        if(name == "orders"){
            api.getOrders().then(setOrders);
            api.getProducts().then(setProducts);
        }
        setTab(name);
    }

    function updateForm(field, value){
        setForm(function(old){ return { ...old, [field]: value }; });
    }

    function resetForm(){
        setForm(emptyProductForm);
    }

    function editProduct(id){

        const p = findProduct(id);

        setForm({
            id:p.id,
            name:p.name,
            category:p.category,
            price:p.price,
            discount:p.discount,
            stock:p.stock
        });

        if(formRef.current){
            formRef.current.scrollIntoView({ behavior:"smooth" });
        }
        if(nameRef.current){
            nameRef.current.focus();
        }
    }

    function saveProduct(event){

        event.preventDefault();

        const price = Number(form.price);
        const discount = Number(form.discount);
        const stock = Number(form.stock);

        if(form.id === ""){
            let newId = 1;
            products.forEach(function(p){
                if(p.id >= newId){
                    newId = p.id + 1;
                }
            });

            saveProducts([...products, {
                id:newId, name:form.name, category:form.category, price:price,
                discount:discount, stock:stock, icon:"🎁", image:""
            }]);
        }
        else{
            saveProducts(products.map(function(p){
                return p.id == form.id
                    ? { ...p, name:form.name, category:form.category, price:price, discount:discount, stock:stock }
                    : p;
            }));

            saveCart(cart.map(function(c){
                return c.id == form.id ? { ...c, name:form.name, price:price } : c;
            }));
        }

        resetForm();
        showToast("Product saved");
    }

    function deleteProduct(id){

        if(!window.confirm("Delete this product?")){
            return;
        }

        saveProducts(products.filter(function(p){ return p.id != id; }));
        saveCart(cart.filter(function(c){ return c.id != id; }));
    }

    function updateStatus(orderId, status){

        const target = orders.find(function(o){ return o.id == orderId; });

        // merchant cancelled the order: put the items back in stock
        if(status == "Cancelled"){
            saveProducts(products.map(function(p){
                const item = target.items.find(function(it){ return it.id == p.id; });
                return item ? { ...p, stock:p.stock + item.qty } : p;
            }));
        }

        saveOrders(orders.map(function(o){
            return o.id == orderId ? { ...o, status:status } : o;
        }));

        const last = load("lastOrder", null);
        if(last != null && last.id == orderId){
            last.status = status;
            localStorage.setItem("lastOrder", JSON.stringify(last));
        }

        showToast("Order status updated");
    }

    /* ----- customer account ----- */

    function openAccount(){
        api.getOrders().then(setOrders);
        setAccountTab("history");
        setAccountOpen(true);
    }

    function trackOrder(id){
        setTrackId(id);
        setAccountTab("track");
    }

    function updateProfile(field, value){
        setProfile(function(old){ return { ...old, [field]: value }; });
    }

    function saveProfile(event){
        event.preventDefault();
        api.saveProfile(profile);
        showToast("Profile saved");
    }

    // change "/login" if your login route has a different path
    function logout(){
        navigate("/login");
    }

    /* ---------- Screen ---------- */

    return (
        <>
            <style>{css}</style>

            <header className="banner">
                {!bannerFailed && (
                    <img
                        className="banner-img"
                        src="https://images.pexels.com/photos/36730407/pexels-photo-36730407.jpeg"
                        alt="Banner"
                        onError={function(){ setBannerFailed(true); }}
                    />
                )}

                <div className="top-left">
                    <button className="merchant-button" onClick={openMerchant}>
                        <span className="icon">🏪</span> Merchant
                    </button>

                    <button className="merchant-button account-button" onClick={openAccount}>
                        <span className="icon">👤</span> My Account
                    </button>
                </div>

                <div className="top-buttons">
                    <button className="cart-button" onClick={function(){ setCartOpen(true); }}>
                        <span className="icon">🛒</span> Basket <span id="cartCount">{cartCount}</span>
                    </button>

                    <button className="logout" onClick={logout}>Logout</button>
                </div>
            </header>

            <section className="search-section">
                <input
                    type="search"
                    id="searchBox"
                    placeholder="Search products..."
                    autoFocus
                    value={search}
                    onChange={function(e){ setSearch(e.target.value); }}
                />

                <select id="sortBox" value={sortType} onChange={function(e){ setSortType(e.target.value); }}>
                    <option value="default">Sort by: Default</option>
                    <option value="high">Price: High to Low</option>
                    <option value="low">Price: Low to High</option>
                </select>
            </section>

            <nav>
                <h2 className="section-title">Shop by Category</h2>

                <div className="categories">
                    {categoryTiles.map(function(c){
                        return (
                            <div
                                key={c.key}
                                className={"category" + (currentCategory == c.key ? " active" : "")}
                                onClick={function(){ setCurrentCategory(c.key); }}
                            >
                                <span className="icon">{c.icon}</span>
                                <span className="name">{c.name}</span>
                                <span className="count">{countOf(c.key)} items</span>
                            </div>
                        );
                    })}
                </div>
            </nav>

            <main>
                <section className="products">
                    {visible.map(function(p){
                        return (
                            <article className="card" key={p.id}>
                                <ProductImage p={p} />

                                <h3>{p.name}</h3>
                                <p className="price">₹{p.price}</p>
                                <p>{p.discount}% OFF</p>

                                {p.stock == 0 ? (
                                    <>
                                        <p className="stock low">Out of stock</p>
                                        <button className="buy-button" disabled>Buy</button>
                                    </>
                                ) : (
                                    <>
                                        {p.stock <= 3
                                            ? <p className="stock low">Only {p.stock} left</p>
                                            : <p className="stock">In stock</p>}
                                        <button className="buy-button" onClick={function(){ addToCart(p.id); }}>Buy</button>
                                    </>
                                )}
                            </article>
                        );
                    })}
                </section>

                {visible.length == 0 && <p id="noResult">No products found.</p>}
            </main>

            <footer>
                <p>&copy; 2026 E-Commerce Platform</p>
            </footer>

            <div id="toast" className={toastShow ? "show" : ""}>{toastText}</div>

            {/* Cart drawer */}
            <aside id="cartBox" className={cartOpen ? "open" : ""}>
                <h2>🛒 My Basket</h2>

                <div id="cartItems">
                    {cart.length == 0 && <p style={{ textAlign:"center" }}>Your basket is empty!</p>}

                    {cart.map(function(c, i){
                        return (
                            <div className="cart-row" key={c.id}>
                                <div className="info">
                                    <b>{c.name}</b><br />
                                    <span>₹{c.price} x {c.qty} = ₹{c.price * c.qty}</span>
                                </div>
                                <div className="qty-box">
                                    <button onClick={function(){ changeQty(i, -1); }}>-</button>
                                    <span>{c.qty}</span>
                                    <button onClick={function(){ changeQty(i, 1); }}>+</button>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <h3 className="cart-total">Total: ₹{total}</h3>

                <div className="cart-buttons">
                    <button className="cart-action" onClick={function(){ setCartOpen(false); }}>Close</button>
                    <button className="cart-action" onClick={function(){ saveCart([]); }}>Clear</button>
                    <button className="cart-action green" onClick={openCheckout}>Checkout</button>
                </div>
            </aside>

            {/* Checkout popup */}
            <section className="overlay" style={{ display: checkoutOpen ? "block" : "none" }}>
                <div className="panel">

                    <form onSubmit={placeOrder}>
                        <h2>Checkout</h2>

                        <div id="orderSummary">
                            <b>Order Summary</b><br />
                            {cart.map(function(c){
                                return <span key={c.id}>{c.name} x {c.qty} - ₹{c.price * c.qty}<br /></span>;
                            })}
                            {checkout.guarantee && (
                                <span>🛡️ Delivery Guarantee - ₹{guaranteeFee}<br /></span>
                            )}
                            <br /><b>Total: ₹{grandTotal}</b>
                        </div>

                        <label htmlFor="fullName">Full Name</label>
                        <input type="text" id="fullName" placeholder="Enter your name" required
                            value={checkout.fullName} onChange={function(e){ updateCheckout("fullName", e.target.value); }} />

                        <label htmlFor="phone">Phone Number</label>
                        <input type="tel" id="phone" placeholder="10 digit mobile number" pattern="[0-9]{10}" required
                            value={checkout.phone} onChange={function(e){ updateCheckout("phone", e.target.value); }} />

                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" placeholder="example@gmail.com" required
                            value={checkout.email} onChange={function(e){ updateCheckout("email", e.target.value); }} />

                        <label htmlFor="address">Address</label>
                        <textarea id="address" rows="3" placeholder="House no, street, city, pincode" required
                            value={checkout.address} onChange={function(e){ updateCheckout("address", e.target.value); }} />

                        <label htmlFor="payment">Payment Method</label>
                        <select id="payment" required
                            value={checkout.payment} onChange={function(e){ updateCheckout("payment", e.target.value); }}>
                            <option value="">-- Select --</option>
                            <option value="Cash on Delivery">Cash on Delivery</option>
                            <option value="Credit / Debit Card">Credit / Debit Card</option>
                        </select>

                        {checkout.payment == "Credit / Debit Card" && (
                            <div>
                                <label htmlFor="pin">Enter your PIN</label>
                                <input type="password" id="pin" placeholder="4 digit PIN" maxLength={4}
                                    pattern="[0-9]{4}" inputMode="numeric" required
                                    value={checkout.pin} onChange={function(e){ updateCheckout("pin", e.target.value); }} />
                            </div>
                        )}

                        <label className="guarantee-box" htmlFor="guarantee">
                            <input type="checkbox" id="guarantee"
                                checked={checkout.guarantee}
                                onChange={function(e){ updateCheckout("guarantee", e.target.checked); }} />
                            <span>
                                <b>🛡️ Delivery Guarantee - add ₹{GUARANTEE_FEE}</b><br />
                                Extra safety: we guarantee your delivery will not be delayed.
                                If it is late, the ₹{GUARANTEE_FEE} is refunded.
                            </span>
                        </label>

                        <div className="cart-buttons" style={{ marginTop:"20px" }}>
                            <button type="button" className="cart-action" onClick={function(){ setCheckoutOpen(false); }}>Back</button>
                            <button type="submit" className="cart-action green">Place Order</button>
                        </div>
                    </form>

                </div>
            </section>

            {/* My Account popup */}
            <section className="overlay" style={{ display: accountOpen ? "block" : "none" }}>
                <div className="panel" style={{ width:"620px" }}>

                    <h2>👤 My Account</h2>

                    <div className="tabs">
                        <button className={accountTab == "history" ? "active" : ""} onClick={function(){ setAccountTab("history"); }}>Order History</button>
                        <button className={accountTab == "track" ? "active" : ""} onClick={function(){ setAccountTab("track"); }}>Track Order</button>
                        <button className={accountTab == "profile" ? "active" : ""} onClick={function(){ setAccountTab("profile"); }}>Profile</button>
                    </div>

                    {accountTab == "history" && (
                        <div>
                            {orders.length == 0 && <p style={{ textAlign:"center" }}>You have no orders yet.</p>}

                            {orders.slice().reverse().map(function(o){
                                return (
                                    <div className={o.status == "Cancelled" ? "order-box cancelled" : "order-box"} key={o.id}>
                                        <b>{o.id}</b> ({o.date}) &nbsp;
                                        <span className={"badge " + o.status}>{o.status}</span><br />
                                        Items: {o.items.map(function(it){ return it.name + " x " + it.qty; }).join(", ")}<br />
                                        Total: ₹{o.total} | Payment: {o.payment}<br />
                                        {o.guarantee && (
                                            <><span className="guarantee-tag">🛡️ Delivery Guarantee</span><br /></>
                                        )}
                                        <button className="cart-action" style={{ margin:"6px 0 0" }} onClick={function(){ trackOrder(o.id); }}>
                                            Track Order
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    {accountTab == "track" && (function(){

                        if(orders.length == 0){
                            return <p style={{ textAlign:"center" }}>You have no orders to track.</p>;
                        }

                        const selected = orders.find(function(o){ return o.id == trackId; }) || orders[orders.length - 1];
                        const stepIndex = trackSteps.indexOf(selected.status);

                        return (
                            <div>
                                <label htmlFor="trackSelect" style={{ fontWeight:"bold" }}>Select order</label>
                                <select id="trackSelect" value={selected.id} onChange={function(e){ setTrackId(e.target.value); }}>
                                    {orders.slice().reverse().map(function(o){
                                        return <option key={o.id} value={o.id}>{o.id} - {o.date}</option>;
                                    })}
                                </select>

                                {selected.status == "Cancelled" ? (
                                    <div>
                                        <p className="cancel-note">✕ This order was cancelled</p>
                                        {selected.cancelReason && <p className="track-note">Reason: {selected.cancelReason}</p>}
                                    </div>
                                ) : (
                                    <div>
                                        <div className="steps">
                                            {trackSteps.map(function(s, i){
                                                return (
                                                    <div className={"step" + (i <= stepIndex ? " done" : "")} key={s}>
                                                        <div className="dot">{i <= stepIndex ? "✓" : i + 1}</div>
                                                        {s}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                        <p className="track-note">{trackMessages[selected.status]}</p>
                                    </div>
                                )}

                                <div className="order-box">
                                    <b>{selected.id}</b> ({selected.date})<br />
                                    {selected.items.map(function(it, i){
                                        return <span key={i}>{it.name} x {it.qty} - ₹{it.price * it.qty}<br /></span>;
                                    })}
                                    {selected.guarantee && (
                                        <>🛡️ Delivery Guarantee: ₹{selected.guaranteeFee}<br /></>
                                    )}
                                    <b>Total: ₹{selected.total}</b> | Payment: {selected.payment}<br />
                                    Deliver to: {selected.name} | {selected.phone}<br />
                                    Address: {selected.address}
                                </div>
                            </div>
                        );
                    })()}

                    {accountTab == "profile" && (
                        <form onSubmit={saveProfile}>

                            <div className="profile-stats">
                                <div>
                                    <b>{orders.length}</b>
                                    Orders placed
                                </div>
                                <div>
                                    <b>₹{orders.filter(function(o){ return o.status != "Cancelled"; })
                                              .reduce(function(sum, o){ return sum + o.total; }, 0)}</b>
                                    Total spent
                                </div>
                            </div>

                            <label htmlFor="profName">Full Name</label>
                            <input type="text" id="profName" placeholder="Enter your name" required
                                value={profile.name} onChange={function(e){ updateProfile("name", e.target.value); }} />

                            <label htmlFor="profPhone">Phone Number</label>
                            <input type="tel" id="profPhone" placeholder="10 digit mobile number" pattern="[0-9]{10}" required
                                value={profile.phone} onChange={function(e){ updateProfile("phone", e.target.value); }} />

                            <label htmlFor="profEmail">Email</label>
                            <input type="email" id="profEmail" placeholder="example@gmail.com" required
                                value={profile.email} onChange={function(e){ updateProfile("email", e.target.value); }} />

                            <label htmlFor="profAddress">Address</label>
                            <textarea id="profAddress" rows="3" placeholder="House no, street, city, pincode" required
                                value={profile.address} onChange={function(e){ updateProfile("address", e.target.value); }} />

                            <div className="cart-buttons" style={{ marginTop:"15px" }}>
                                <button type="submit" className="cart-action green">Save Profile</button>
                            </div>
                        </form>
                    )}

                    <div className="cart-buttons" style={{ marginTop:"20px" }}>
                        <button className="cart-action" onClick={function(){ setAccountOpen(false); }}>Close</button>
                    </div>

                </div>
            </section>

            {/* Merchant login popup */}
            <section className="overlay" style={{ display: loginOpen ? "block" : "none" }}>
                <div className="panel">

                    <form onSubmit={merchantLogin}>
                        <h2>Merchant Login</h2>

                        <label htmlFor="merchantId">Merchant ID</label>
                        <input type="text" id="merchantId" placeholder="Enter any ID" required
                            value={merchantId} onChange={function(e){ setMerchantId(e.target.value); }} />

                        <label htmlFor="merchantPassword">Password</label>
                        <input type="password" id="merchantPassword" placeholder="Enter any password" required
                            value={merchantPassword} onChange={function(e){ setMerchantPassword(e.target.value); }} />

                        <div className="cart-buttons" style={{ marginTop:"20px" }}>
                            <button type="button" className="cart-action" onClick={function(){ setLoginOpen(false); }}>Cancel</button>
                            <button type="submit" className="cart-action green">Login</button>
                        </div>
                    </form>

                </div>
            </section>

            {/* Merchant panel */}
            <section className="overlay" style={{ display: merchantOpen ? "block" : "none" }}>
                <div className="panel wide">

                    <h2>{merchantTitle}</h2>

                    <div className="tabs">
                        <button className={tab == "inventory" ? "active" : ""} onClick={function(){ switchTab("inventory"); }}>Inventory</button>
                        <button className={tab == "orders" ? "active" : ""} onClick={function(){ switchTab("orders"); }}>Orders</button>
                    </div>

                    {tab == "inventory" && (
                        <div>

                            <div className="table-wrap">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Product</th>
                                            <th>Category</th>
                                            <th>Price</th>
                                            <th>Discount</th>
                                            <th>Stock</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {products.map(function(p){
                                            return (
                                                <tr key={p.id}>
                                                    <td>{p.name}</td>
                                                    <td>{p.category}</td>
                                                    <td>₹{p.price}</td>
                                                    <td>{p.discount}%</td>
                                                    <td style={p.stock <= 3 ? { color:"#dc3545", fontWeight:"bold" } : {}}>{p.stock}</td>
                                                    <td>
                                                        <button onClick={function(){ editProduct(p.id); }}>Edit</button>
                                                        <button className="red" onClick={function(){ deleteProduct(p.id); }}>Delete</button>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>

                            <form ref={formRef} onSubmit={saveProduct}>
                                <h3>{form.id === "" ? "Add New Product" : "Update Product Details"}</h3>

                                <div className="form-row">
                                    <div>
                                        <label htmlFor="pName">Product Name</label>
                                        <input type="text" id="pName" placeholder="Product name" required ref={nameRef}
                                            value={form.name} onChange={function(e){ updateForm("name", e.target.value); }} />
                                    </div>

                                    <div>
                                        <label htmlFor="pCategory">Category</label>
                                        <select id="pCategory" required
                                            value={form.category} onChange={function(e){ updateForm("category", e.target.value); }}>
                                            <option value="accessory">Accessories</option>
                                            <option value="dress">Dress</option>
                                            <option value="shoes">Shoes</option>
                                            <option value="makeup">Makeup</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label htmlFor="pPrice">Price (₹)</label>
                                        <input type="number" id="pPrice" placeholder="Price" min="1" required
                                            value={form.price} onChange={function(e){ updateForm("price", e.target.value); }} />
                                    </div>

                                    <div>
                                        <label htmlFor="pDiscount">Discount (%)</label>
                                        <input type="number" id="pDiscount" placeholder="0 to 90" min="0" max="90" required
                                            value={form.discount} onChange={function(e){ updateForm("discount", e.target.value); }} />
                                    </div>

                                    <div>
                                        <label htmlFor="pStock">Stock (quantity)</label>
                                        <input type="number" id="pStock" placeholder="Quantity" min="0" required
                                            value={form.stock} onChange={function(e){ updateForm("stock", e.target.value); }} />
                                    </div>
                                </div>

                                <div className="cart-buttons" style={{ marginTop:"15px" }}>
                                    <button type="submit" className="cart-action green">
                                        {form.id === "" ? "Add Product" : "Update Product"}
                                    </button>
                                    <button type="button" className="cart-action" onClick={resetForm}>Clear Form</button>
                                </div>
                            </form>
                        </div>
                    )}

                    {tab == "orders" && (
                        <div>
                            {orders.length == 0 && <p style={{ textAlign:"center" }}>No orders yet.</p>}

                            {orders.slice().reverse().map(function(o){
                                return (
                                    <div className={o.status == "Cancelled" ? "order-box cancelled" : "order-box"} key={o.id}>
                                        <b>{o.id}</b> ({o.date})<br />
                                        Customer: {o.name} | {o.phone}<br />
                                        Address: {o.address}<br />
                                        Items: {o.items.map(function(it){ return it.name + " x " + it.qty; }).join(", ")}<br />
                                        Total: ₹{o.total} | Payment: {o.payment}<br />
                                        {o.guarantee && (
                                            <><span className="guarantee-tag">🛡️ Delivery Guarantee - deliver on time</span><br /></>
                                        )}

                                        {o.status == "Cancelled" ? (
                                            <>Status: <span className="cancel-text">Cancelled</span></>
                                        ) : (
                                            <>
                                                Status:{" "}
                                                <select value={o.status} onChange={function(e){ updateStatus(o.id, e.target.value); }}>
                                                    {statuses.map(function(s){
                                                        return <option key={s} value={s}>{s}</option>;
                                                    })}
                                                </select>
                                            </>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    <div className="cart-buttons" style={{ marginTop:"20px" }}>
                        <button className="cart-action" onClick={function(){ setMerchantOpen(false); }}>Close</button>
                    </div>

                </div>
            </section>
        </>
    );
}