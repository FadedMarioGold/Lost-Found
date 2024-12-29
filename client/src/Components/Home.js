import React from "react";

const Home = () => {
  const isLoggedIn = JSON.parse(window.localStorage.getItem("user"));

  const handleNavigation = (path) => {
    window.location.href = isLoggedIn ? path : "/log-in";
  };

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      {/* Header Section */}
      <div style={{ marginBottom: "50px" }}>
        <h1 style={{ color: "#357ABD" }}>Find your Item!</h1>
        {/* <img
          src="https://i.ibb.co/P1NQV2n/vector1.png"
          alt="Illustration"
          style={{ width: "60%", maxWidth: "300px" }}
        /> */}
        <p style={{ color: "#194067" }}>
          We know how hard it is to lose your item, that's why we want to help
          you!
        </p>
        <button
          onClick={() => handleNavigation("/postitem")}
          style={{
            padding: "10px 20px",
            backgroundColor: "#357ABD",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            
          }}
        >
          Get Started
        </button>
      </div>

      {/* About Us Section */}
      <div
        style={{
          backgroundColor: "#357ABD",
          color: "#FEF0E9",
          padding: "30px",
          borderRadius: "10px",
        }}
      >
        <h2>About Us</h2>
        <p>
          We want to be a platform through which our users can find those items
          that are so important to them. Whether it's reporting a lost item or
          helping someone find their owner, we've got you covered!
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
          <button
            onClick={() => handleNavigation("/lostItems")}
            style={{
              padding: "10px 20px",
              backgroundColor: "#FEF0E9",
              color: "#357ABD",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Lost Item
          </button>
          <button
            onClick={() => handleNavigation("/founditems")}
            style={{
              padding: "10px 20px",
              backgroundColor: "#FEF0E9",
              color: "#357ABD",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Found Item
          </button>
          <button
            onClick={() => handleNavigation("/postitem")}
            style={{
              padding: "10px 20px",
              backgroundColor: "#FEF0E9",
              color: "#357ABD",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Post Lost Item
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
