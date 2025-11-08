import React, { useEffect, useState } from "react";
import ClickSpark from "../components/ClickSparkProps";
import TextType from "../components/TextTypeProps";
import Aurora from "../components/AuroraProps";

const Homepage: React.FC = () => {
  const [fullname, setFullname] = useState<string>("");

  useEffect(() => {
    const storedName = localStorage.getItem("fullname");
    if (storedName) {
      setFullname(storedName);
    }
  }, []);

  return (
    <div className="relative h-screen bg-black overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 z-0">
        <ClickSpark>
          <Aurora
            colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
            blend={0.5}
            amplitude={1.0}
            speed={0.5}
          />
        </ClickSpark>
      </div>

      <div className="relative z-10 text-center space-y-6">
        <TextType
          className="text-white text-6xl font-bold"
          text={[`Xin chào ${fullname || "bạn"}`, "Happy coding!"]}
          typingSpeed={75}
          pauseDuration={1500}
          showCursor={true}
          cursorCharacter="|"
        />
        <p className="text-3xl text-white">
          Chào mừng đến với trang chủ đơn giản nhất quả đất.
        </p>
      </div>      
      <div className="absolute bottom-4 left-0 w-full text-center z-10">
      <p className="text-white text-sm">
          © TAK 2025
        </p>
      </div>  
    </div>
  );
};

export default Homepage;
