import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./notFound.css";
import { Button } from "@mui/material";

const NotFound: React.FC = () => {
  const searchIconRef = useRef<HTMLSpanElement | null>(null);
  const h1Ref = useRef<HTMLHeadingElement | null>(null);
  const h2Ref = useRef<HTMLHeadingElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const searchIcon = searchIconRef.current;
    const h1 = h1Ref.current;
    const h2 = h2Ref.current;

    if (!searchIcon || !h1 || !h2) return;

    searchIcon.style.transform = "translate(-200px, 100px)";
    searchIcon.style.opacity = "0";
    h1.style.transform = "translateY(50px)";
    h1.style.opacity = "0";
    h2.style.opacity = "0";

    setTimeout(() => {
      searchIcon.style.transition = "transform 1s ease-out, opacity 1s ease-out";
      searchIcon.style.transform = "translate(200px, -100px) rotate(40deg)";
      searchIcon.style.opacity = "1";

      setTimeout(() => {
        h1.style.transition = "transform 1s ease-out, opacity 1s ease-out";
        h1.style.transform = "translateY(0)";
        h1.style.opacity = "1";

        setTimeout(() => {
          searchIcon.style.transition = "transform 1s ease-in-out";
          searchIcon.style.transform = "translate(0, 0) rotate(0)";

          setTimeout(() => {
            h2.style.transition = "opacity 0.5s ease-in";
            h2.style.opacity = "1";
          }, 200);
        }, 1000);
      }, 1000);
    }, 100);

    return () => {
      searchIcon.style.transition = "";
      h1.style.transition = "";
      h2.style.transition = "";
    };
  }, []);

  return (
    <main className="not-found-page">
      <div className="container">
        <span ref={searchIconRef} className="material-symbols-outlined search">
          search
        </span>
        <h1 ref={h1Ref} className="h1">
          404
        </h1>
        <h2 ref={h2Ref}>Not Found</h2>
        <Button onClick={() => navigate("/")}>Go Home</Button>
      </div>
    </main>
  );
};

export default NotFound;
