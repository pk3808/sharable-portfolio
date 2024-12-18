import React, { useState, useEffect, useRef } from "react";
import Home from "../pages/Home";
import Blogs from "../pages/Blogs";
import Projects from "../pages/Projects";
import Skills from "../pages/Skills";
import Contact from "../pages/Contact";
import AboutMe from "../pages/AboutMe";
import left from "../assets/left.png";
import rotate from "../assets/rotate.png";
import TimeLine from "../components/TimeLIne";
import { useNavigate } from "react-router-dom";

const BrickBreaker = ({ darkMode }) => {
  console.log("Rendering BrickBreaker with darkMode:", darkMode);
  const paddleHitSound = useRef(null);
  const brickHitSound = useRef(null);
  const specialBrickHitSound = useRef(null);
  const gameOverSound = useRef(null);
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  
  const [paddle, setPaddle] = useState({
    x: 150,
    y: 450,
    width: 100,
    height: 10,
  });
  const [ball, setBall] = useState({
    x: 200,
    y: 300,
    dx: 1.5,
    dy: 1.5,
    radius: 5,
  });
  const [bricks, setBricks] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [modalComponent, setModalComponent] = useState(null);
  const [modalTitle, setModalTitle] = useState(""); // Add state for modal title
  const [showOptions, setShowOptions] = useState(false);

  // Initialize bricks
  useEffect(() => {
    const brickRows = 4;
    const brickCols = 6;
    const brickWidth = 45.5;
    const brickHeight = 20;
    const padding = 10;
    const offsetTop = 50;
    const offsetLeft = 35;

    const initialBricks = [];
    for (let row = 0; row < brickRows; row++) {
      for (let col = 0; col < brickCols; col++) {
        const isSpecial =
          (row === brickRows - 2 && (col === 1 || col === 3 || col === 5)) ||
          (row === brickRows - 3 && (col === 0 || col === 4));
        initialBricks.push({
          x: col * (brickWidth + padding) + offsetLeft,
          y: row * (brickHeight + padding) + offsetTop,
          width: brickWidth,
          height: brickHeight,
          hit: false,
          isSpecial,
          title: getComponentByBrick(col + row * brickCols).title, // Get title
        });
      }
    }
    setBricks(initialBricks);
  }, []);

  // Function to assign component and title by brick
  const getComponentByBrick = (index) => {
    switch (index) {
      case 13:
        return { component: <TimeLine darkMode={darkMode} bg={true} />, title: "TimeLine" };
      case 17:
        return { component: <AboutMe darkMode={darkMode} />, title: "AboutMe" };
      case 6:
        return { component: <Projects darkMode={darkMode} h={false} />, title: "Projects" };
      case 15:
        return { component: <Skills darkMode={darkMode} show={true} hide={true} />, title: "Skills" };
      case 10:
        return { component: <Contact darkMode={darkMode} />, title: "Contact" };
      case 14:
        return { component: <AboutMe darkMode={darkMode} />, title: "AboutMe" };
      default:
        return { component: null, title: "" };
    }
  };

  // Paddle movement for keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      setPaddle((prev) => {
        if (e.key === "ArrowLeft") {
          return { ...prev, x: Math.max(prev.x - 20, 0) };
        } else if (e.key === "ArrowRight") {
          return { ...prev, x: Math.min(prev.x + 20, 400 - prev.width) };
        }
        return prev;
      });
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Mobile touch control for paddle movement
  const handleTouchMove = (e) => {
    const touchX = e.touches[0].clientX;
    const canvasRect = canvasRef.current.getBoundingClientRect();
    const relativeTouchX = touchX - canvasRect.left;

    setPaddle((prev) => ({
      ...prev,
      x: Math.min(
        Math.max(relativeTouchX - prev.width / 2, 0),
        canvasRect.width - prev.width
      ),
    }));
  };

  // Game loop for ball movement and collision detection
  useEffect(() => {
    if (gameOver || modalComponent) return; // Stop ball movement if game over or modal is open

    const interval = setInterval(() => {
      setBall((prev) => {
        let { x, y, dx, dy, radius } = prev;

        // Check collision with walls
        if (x + dx < radius || x + dx > 400 - radius) dx = -dx;
        if (y + dy < radius) dy = -dy;

        // Check collision with paddle
        if (
          y + dy > paddle.y - radius &&
          x > paddle.x &&
          x < paddle.x + paddle.width
        ) {
          dy = -dy;
          dx *= 1.15; // Optional: Slightly increase speed on paddle hit
          dy *= 1.15; // Optional: Slightly increase speed on paddle hit
          paddleHitSound.current.play();
        }

        // Check collision with bricks and open modal on special brick hit
        const updatedBricks = bricks.map((brick, index) => {
          if (
            !brick.hit &&
            x > brick.x &&
            x < brick.x + brick.width &&
            y > brick.y &&
            y < brick.y + brick.height
          ) {
            dy = -dy;
            dx *= 1.05; // Optional: Slightly increase speed on brick hit
            dy *= 1.05; // Optional: Slightly increase speed on brick hit
            console.log(`Brick hit: ${index + 1}`);
            brickHitSound.current.play();
            // Special brick hit logic
            if (brick.isSpecial) {
              specialBrickHitSound.current.play();
              console.log(`Special brick hit at index: ${index}`);
              const { component, title } = getComponentByBrick(index);
              setModalComponent(component);
              setModalTitle(title);
            }

            return { ...brick, hit: true };
          }
          return brick;
        });
        setBricks(updatedBricks);

        // Check if ball falls below paddle
        if (y + dy > 500) {
          setGameOver(true);
          gameOverSound.current.play();
          return prev;
        }

        return { ...prev, x: x + dx, y: y + dy, dx, dy };
      });
    }, 16);

    return () => clearInterval(interval);
  }, [ball, bricks, gameOver, paddle, modalComponent]);

  // Draw everything on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, 400, 500);

    // Draw paddle
    ctx.fillStyle = "#5f5de6";
    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);

    // Draw ball
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();

    // Draw bricks and their titles
    bricks.forEach((brick) => {
      if (!brick.hit) {
        ctx.fillStyle = brick.isSpecial ? "#FFD700" : "#FF6347"; // Special bricks in gold color
        ctx.fillRect(brick.x, brick.y, brick.width, brick.height, brick.radius);
        if (brick.isSpecial) {
          ctx.fillStyle = "#000"; // Set color for text
          ctx.font = "11px Arial"; // Set font for text
          ctx.textAlign = "center"; // Center the text
          ctx.fillText(
            brick.title,
            brick.x + brick.width / 2,
            brick.y + brick.height / 2 + 4,
            brick.radius
          ); // Draw the title
        }
      }
    });

    if (gameOver) {
      ctx.font = "20px Arial";
      ctx.fillStyle = "red";
      ctx.fillText("Game Over", 200, 250);
    }
  }, [paddle, ball, bricks, gameOver]);

  const handleRestart = () => {
    setBall({ x: 200, y: 300, dx: 1, dy: 1, radius: 5 });
    setGameOver(false);
    setBricks((prev) => prev.map((brick) => ({ ...brick, hit: false })));
    setModalComponent(null);
    setModalTitle("");
  };
  useEffect(() => {
    const timer = setTimeout(() => setShowOptions(true), 1500);
    return () => clearTimeout(timer);
  }, []);
  const handleNavigate = () => {
    navigate("/home");
  };
  return (
    <>
      <div
        className="flex flex-col items-center p-5 bg-[#1a1a2e]  min-h-screen text-gray-200 justify-center w-[100vw] h-[100vh] "
        onTouchMove={handleTouchMove}
      >
        <div
          className="absolute left-10 top-10 text-lg hidden md:block"

        >
          <button className="text-yellow-400 text-xl" onClick={handleNavigate}>⪡</button> Check out default Mode
        </div>
        <div
          className=" text-lg md:hidden my-2"
        >
          <span className="text-yellow-400" onClick={handleNavigate}>⪡</span> Check out default Mode
        </div>

        <canvas
          ref={canvasRef}
          width="400"
          height="480"
          className="border-2 border-[#5f5de6] rounded-lg bg-[#16213e] w-full max-w-md mx-6"
        />
        {gameOver && (
          <button
            onClick={handleRestart}
            className="mt-5 px-6 py-2 bg-[#5f5de6] text-white rounded-lg hover:bg-[#5f5de6] bg-[#5f5de6] "
          >
            <img src={rotate} alt="Restart" className="w-6 h-6" />
          </button>
        )}

        {/* Modal for special brick components */}
        {modalComponent && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 overflow-y-auto w-full">
            <div className="bg-[#172c2c]  rounded-lg w-full max-w-[95vw] relative">
              <h2 className="text-xl font-bold text-center mb-4 mt-4">{modalTitle}</h2>

              {/* Close Button - Positioned at the top right corner */}
              <button
                onClick={() => setModalComponent(null)}
                className="absolute top-4 right-2 text-gray-500 bg-transparent hover:text-white"
              >
                ✖
              </button>

              {/* Modal Content Area */}
              <div className="modal-content max-h-[85vh] overflow-auto">
                {modalComponent}
              </div>

            </div>
          </div>
        )}
        <audio ref={paddleHitSound} src="sound/hit.mp3" preload="auto"></audio>
        <audio ref={brickHitSound} src="sound/brickhit.mp3" preload="auto"></audio>
        <audio ref={specialBrickHitSound} src="sound/special.mp3" preload="auto"></audio>
        <audio ref={gameOverSound} src="sound/over.mp3" preload="auto"></audio>
      </div>
    </>
  );
};

export default BrickBreaker;
