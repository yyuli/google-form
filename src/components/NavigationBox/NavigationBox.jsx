import React from "react";
import add from "../../assets/images/add.svg";
import show from "../../assets/images/show.svg";
import { NavigationBoxWrap } from "./NavigationBoxStyle";

export default function NavigationBox({ addItem, handlePreview }) {
  return (
    <NavigationBoxWrap>
      <button onClick={addItem}>
        <img src={add} alt="" />
      </button>
      <button onClick={handlePreview}>
        <img src={show} alt="" />
      </button>
    </NavigationBoxWrap>
  );
}
