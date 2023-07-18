import React from "react";
import add from "../../assets/images/add.svg";
import show from "../../assets/images/show.svg";
import { NavigationBoxWrap } from "./NavigationBoxStyle";

export default function NavigationBox({ addItem }) {
  return (
    <NavigationBoxWrap>
      <button onClick={addItem}>
        <img src={add} alt="" />
      </button>
      <button>
        <img src={show} alt="" />
      </button>
    </NavigationBoxWrap>
  );
}
