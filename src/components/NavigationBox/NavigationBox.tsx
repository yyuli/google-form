import React from "react";
import add from "../../assets/images/add.svg";
import show from "../../assets/images/show.svg";
import { NavigationBoxWrap } from "./NavigationBoxStyle";
import { useNavigate } from "react-router-dom";

interface NavigationBoxProps {
  addItem: () => void;
}

const NavigationBox = ({ addItem }: NavigationBoxProps) => {
  const navigate = useNavigate();
  const handlePreview = () => {
    navigate("/preview");
  };
  return (
    <NavigationBoxWrap>
      <h2 className="a11y-hidden">내비게이션 바</h2>
      <button onClick={addItem}>
        <img src={add} alt="" />
      </button>
      <button onClick={handlePreview}>
        <img src={show} alt="" />
      </button>
    </NavigationBoxWrap>
  );
};

export default NavigationBox;
