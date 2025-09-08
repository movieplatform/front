// src/pages/Main.jsx
import React from "react";

function Main() {
  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>🎬 Movie Reservation Platform</h1>
      </header>

      <main style={styles.main}>
        <p>환영합니다! 여기서 영화를 예매할 수 있습니다.</p>
        <button style={styles.button}>영화 보러가기</button>
      </main>

      <footer style={styles.footer}>
        <small>© 2025 Movie Reservation Platform</small>
      </footer>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    textAlign: "center",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  header: {
    backgroundColor: "#222",
    color: "white",
    padding: "1rem",
  },
  main: {
    flex: 1,
    padding: "2rem",
  },
  button: {
    padding: "0.75rem 1.5rem",
    fontSize: "1rem",
    marginTop: "1rem",
    cursor: "pointer",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#ff4d4f",
    color: "white",
  },
  footer: {
    backgroundColor: "#f1f1f1",
    padding: "1rem",
  },
};

export default Main;
