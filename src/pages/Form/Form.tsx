import React from "react";
import TitleBox from "../../components/TitleBox/TitleBox";
import QuestionList from "../../components/QuestionList/QuestionList";

export default function Form() {
  return (
    <>
      <h1 className="a11y-hidden">구글 설문지</h1>
      <TitleBox />
      <QuestionList />
    </>
  );
}
