import { useState, useEffect } from "react";
import "./App.css";

export default function App() {
  const [page, setPage] = useState("login");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    const loggedIn = localStorage.getItem("loggedIn");

    if (loggedIn === "true") {
      setPage("dashboard");
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    if (username === "admin" && password === "1234") {
      localStorage.setItem("loggedIn", "true");
      setPage("dashboard");
      return;
    }

    const storedUser = localStorage.getItem("username");
    const storedPass = localStorage.getItem("password");

    if (username === storedUser && password === storedPass) {
      localStorage.setItem("loggedIn", "true");
      setPage("dashboard");
    } else {
      alert("Invalid username or password!");
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    localStorage.setItem("username", newUsername);
    localStorage.setItem("password", newPassword);
    localStorage.setItem("loggedIn", "true");

    setPage("dashboard");
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    setPage("login");
  };

  const products = [
    {
      name: "Makeup Pack",
      price: "₹1700",
      discount: "50% OFF",
      image:
        "https://www.dermablogger.com/images/posts/10-must-have-cosmetics-for-every-woman-s-beauty-routine-md.jpg",
    },
    {
      name: "Dress",
      price: "₹240",
      discount: "40% OFF",
      image:
        "https://i.pinimg.com/originals/99/dc/61/99dc61b035b5596ee7af93c6c8465616.jpg",
    },
    {
      name: "Women Suit",
      price: "₹203",
      discount: "30% OFF",
      image:
        "https://i.pinimg.com/originals/65/f5/26/65f52629be77028d1b4c5a98684cdceb.png",
    },
    {
      name: "Coat",
      price: "₹800",
      discount: "20% OFF",
      image:
        "https://i5.walmartimages.com/seo/Pea-Coats-for-Women-Womens-Fashion-Winter-Long-Trench-Coat-Jackets-Notch-Collar-Open-Front-Cardigans-Outwear_f05efe24-9afc-4605-884c-c50d934202a7.08846bd58f794e9506bdfef63a55b763.jpeg",
    },
    {
      name: "Women Shoes",
      price: "₹300",
      discount: "20% OFF",
      image:
        "https://m.media-amazon.com/images/I/71IhuPi7iTL._AC_SL1500_.jpg",
    },
    {
      name: "Women Heels",
      price: "₹4000",
      discount: "20% OFF",
      image:
        "https://tse3.mm.bing.net/th/id/OIP.6WubmIz0gUgb8aURM3ArsAHaHa?r=0",
    },
    {
      name: "Watch",
      price: "₹2000",
      discount: "20% OFF",
      image:
        "https://i.etsystatic.com/25605644/r/il/288464/4127036743/il_1588xN.4127036743_s68w.jpg",
    },
    {
      name: "Bracelet",
      price: "₹1440",
      discount: "20% OFF",
      image:
        "https://www.besttohave.com/images/adjustable-women-s-bracelet-925-sterling-silver-with-created-diamond-p550-4145_zoom.jpg",
    },
    {
      name: "Flora Dress",
      price: "₹2399",
      discount: "20% OFF",
      image:
        "https://i.pinimg.com/originals/7c/05/25/7c052579112694f094b19529a2c92b28.jpg",
    },
  ];

  if (page === "login") {
    return (
      <div className="auth-container">
        <div className="login-box">
          <img
            src="https://cdn5.vectorstock.com/i/1000x1000/79/79/beautiful-woman-shopping-composed-in-a-circle-vector-6157979.jpg"
            alt="Logo"
          />

          <h2>WELCOME USER</h2>

          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Enter Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button type="submit">Login</button>
          </form>

          <div className="register-link">
            If not have an account{" "}
            <span onClick={() => setPage("signup")}>
              Register here
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (page === "signup") {
    return (
      <div className="auth-container">
        <div className="signup-box">
          <img
            src="https://cdn5.vectorstock.com/i/1000x1000/79/79/beautiful-woman-shopping-composed-in-a-circle-vector-6157979.jpg"
            alt="Logo"
          />

          <h2>Create Account</h2>

          <form onSubmit={handleSignup}>
            <input
              type="text"
              placeholder="Enter Username"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Enter Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            <button type="submit">Register</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="banner">
        <img
          src="https://images.pexels.com/photos/36730407/pexels-photo-36730407.jpeg"
          alt="Banner"
        />

        <button className="logout" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="products">
        {products.map((item, index) => (
          <div className="card" key={index}>
            <img src={item.image} alt={item.name} />

            <h3>{item.name}</h3>

            <p className="price">{item.price}</p>

            <p>{item.discount}</p>

            <button className="buy-button">Buy</button>
          </div>
        ))}
      </div>
    </>
  );
}