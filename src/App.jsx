import { Link } from "react-router-dom";
import "./app.css";

const App = () => {
  return (
    <section className="app">
      <h1 className="title">Some Games</h1>
      <div className="container">
        <div className="item">
          <Link to="/TikTokToe" >TikTokToe</Link >
        </div>
        <div className="item">
          <Link to="/WordHunt">WordHunt</Link >
        </div>
        <div className="item">
          <Link to="/MemoryGame">MemoryGame</Link >
        </div>
        <div className="item">
          <Link to="/DinoGame">DinoGame</Link >
        </div>
        <div className="item">
          <Link to="/FlappyBird">FlappyBird</Link >
        </div>
      </div>
    </section>
  )
}

export default App