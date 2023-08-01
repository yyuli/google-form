import React, { useState, useRef } from "react";
import TitleBox from "../../components/TitleBox/TitleBox";
import { useSelector } from "react-redux";
import {
  QuestionItemWrap,
  QuestionItemTitle,
  QuestionItemLi,
  QuestionListWrapDiv,
  QuestionItemRequiredSpan,
  QuestionItemDragDiv,
} from "../../components/QuestionItem/QuestionItemStyle";
import { QuestionTypeSelect } from "../../components/QuestionBox/QuestionBoxStyle";
import {
  PreviewEtcDiv,
  PreviewEtcLabel,
  AnimatedPreviewEtcSpan,
  AnimatePreviewEtcDiv,
  PreviewEtcInput,
  PreviewCustomInput,
  PreviewCustomLabel,
  PreviewCustomRadio,
  AnimatedPreviewShortSpan,
  AnimatePreviewShortDiv,
  PreviewShortInput,
  AnimatedPreviewLongSpan,
  AnimatePreviewLongDiv,
  PreviewLongInput,
  BtnWrap,
  SubmitBtn,
  ResetBtn,
} from "./PreviewStyle";
import { useNavigate } from "react-router-dom";

export default function Preview() {
  const questionListItem = useSelector((state) => state.questionListItem.value);
  const [isActive, setIsActive] = useState({});
  const [selectedOption, setSelectedOption] = useState({});
  const navigate = useNavigate();
  const handleResult = () => {
    const inputValues = Object.entries(inputRefs.current).reduce(
      (acc, [key, refMap]) => {
        acc[key] = {};
        for (const id in refMap) {
          if (key === "checkRadio" || key === "checkBox") {
            const [outerIndex, , innerIndex] = id.split("_");
            const checkboxValue = refMap[id]?.checked;
            acc[key][outerIndex] = {
              ...acc[key][outerIndex],
              [innerIndex]: checkboxValue,
            };
          } else if (key === "checkedRadioEtc" || key === "checkedBoxEtc") {
            acc[key][id] = refMap[id]?.checked;
          } else {
            acc[key][id] = refMap[id]?.value;
          }
        }
        return acc;
      },
      {}
    );
    navigate("/result", {
      state: {
        inputValues: inputValues,
        selectedOption: selectedOption,
      },
    });
  };

  const [checkedSquare, setCheckedSquare] = useState(
    new Array(
      questionListItem.filter(
        (item) => item.type === "체크박스" && item.etc
      ).length
    ).fill(false)
  );
  const [checkedRadio, setCheckedRadio] = useState(
    new Array(
      questionListItem.filter(
        (item) => item.type === "객관식 질문" && item.etc
      ).length
    ).fill(false)
  );

  const inputRefs = useRef({
    shortAnswer: {}, // 단답형
    longAnswer: {}, // 장문형
    radioEtc: {}, // 객관식 질문 기타란
    checkboxEtc: {}, // 체크박스 기타란
    checkBox: {}, // 체크박스 체크 유무
    checkRadio: {}, // 라디오 체크 유무
    checkedRadioEtc: {}, // 기타 라디오 체크 유무
    checkedBoxEtc: {}, // 기타 체크박스 체크 유무
  });
  const handleCheckboxEtcClick = (index) => {
    // const newCheckedSquare = [...checkedSquare];
    // newCheckedSquare[index] = !newCheckedSquare[index];
    // setCheckedSquare(newCheckedSquare);
    setCheckedSquare((prevCheckedSquare) => {
      const newCheckedSquare = [...prevCheckedSquare];
      newCheckedSquare[index] = !newCheckedSquare[index];
      return newCheckedSquare;
    });
  };
  const handleCheckboxEtcClickRadio = (index) => {
    // const newCheckedRadio = [...checkedRadio];
    // newCheckedRadio[index] = !newCheckedRadio[index];
    // setCheckedRadio(newCheckedRadio);
    setCheckedRadio((prevCheckedRadio) => {
      const newCheckedRadio = [...prevCheckedRadio];
      newCheckedRadio[index] = !newCheckedRadio[index];
      return newCheckedRadio;
    });
  };
  const randomId = () => {
    return "_" + Math.random().toString(36).substring(2, 9) + "_";
  };
  const reset = () => {
    setCheckedSquare(
      new Array(
        questionListItem.filter(
          (item) => item.type === "체크박스" && item.etc
        ).length
      ).fill(false)
    );
    setCheckedRadio(
      new Array(
        questionListItem.filter(
          (item) => item.type === "객관식 질문" && item.etc
        ).length
      ).fill(false)
    );
    Object.values(inputRefs.current.shortAnswer).forEach(
      (ref) => ref && (ref.value = "")
    );
    Object.values(inputRefs.current.longAnswer).forEach(
      (ref) => ref && (ref.value = "")
    );
    Object.values(inputRefs.current.radioEtc).forEach(
      (ref) => ref && (ref.value = "")
    );
    Object.values(inputRefs.current.checkboxEtc).forEach(
      (ref) => ref && (ref.value = "")
    );
    Object.values(inputRefs.current.checkBox).forEach(
      (ref) => ref && (ref.checked = false)
    );
    Object.values(inputRefs.current.checkRadio).forEach(
      (ref) => ref && (ref.checked = false)
    );
    Object.values(inputRefs.current.checkedRadioEtc).forEach(
      (ref) => ref && (ref.checked = false)
    );
    Object.values(inputRefs.current.checkedBoxEtc).forEach(
      (ref) => ref && (ref.checked = false)
    );
    setIsActive({});
    setSelectedOption({});
  };
  return (
    <>
      <h1 className="a11y-hidden">구글 설문지</h1>
      <TitleBox disabled />
      {questionListItem.map((item, index) => {
        return (
          <QuestionItemWrap key={index}>
            <QuestionItemDragDiv />
            <QuestionItemTitle>
              {item.title === "" ? "질문" : item.title}
              {item.required && (
                <QuestionItemRequiredSpan>*</QuestionItemRequiredSpan>
              )}
            </QuestionItemTitle>
            {item.type === "단답형" && (
              <AnimatePreviewShortDiv>
                <PreviewShortInput
                  type="text"
                  placeholder="내 답변"
                  ref={(el) => (inputRefs.current.shortAnswer[index] = el)}
                />
                <AnimatedPreviewShortSpan />
              </AnimatePreviewShortDiv>
            )}
            {item.type === "장문형" && (
              <AnimatePreviewLongDiv>
                <PreviewLongInput
                  type="text"
                  placeholder="내 답변"
                  ref={(el) => (inputRefs.current.longAnswer[index] = el)}
                />
                <AnimatedPreviewLongSpan />
              </AnimatePreviewLongDiv>
            )}
            {item.type === "객관식 질문" && (
              <ul>
                {item.items.map((item, optionIdx) => {
                  const itemId = `${randomId()}`;
                  return (
                    <QuestionItemLi key={optionIdx}>
                      <PreviewCustomRadio
                        type="checkbox"
                        id={itemId}
                        ref={(el) =>
                          (inputRefs.current.checkRadio[
                            `${index}${itemId}${optionIdx}`
                          ] = el)
                        }
                      />
                      <PreviewCustomLabel htmlFor={itemId}>
                        {item}
                      </PreviewCustomLabel>
                    </QuestionItemLi>
                  );
                })}
              </ul>
            )}
            {item.type === "객관식 질문" && item.etc && (
              <QuestionListWrapDiv>
                <PreviewCustomRadio
                  type="checkbox"
                  checked={checkedRadio[index]}
                  onChange={() => handleCheckboxEtcClickRadio(index)}
                  ref={(el) => (inputRefs.current.checkedRadioEtc[index] = el)}
                />
                <PreviewEtcDiv>
                  <PreviewEtcLabel
                    onClick={() => handleCheckboxEtcClickRadio(index)}
                  >
                    기타:
                  </PreviewEtcLabel>
                  <AnimatePreviewEtcDiv>
                    <PreviewEtcInput
                      type="text"
                      onClick={() => handleCheckboxEtcClickRadio(index)}
                      ref={(el) => (inputRefs.current.radioEtc[index] = el)}
                    />
                    <AnimatedPreviewEtcSpan />
                  </AnimatePreviewEtcDiv>
                </PreviewEtcDiv>
              </QuestionListWrapDiv>
            )}
            {item.type === "체크박스" && (
              <ul>
                {item.items.map((item, optionIdx) => {
                  const itemId = `${randomId()}`;
                  return (
                    <QuestionItemLi key={optionIdx}>
                      <PreviewCustomInput
                        type="checkbox"
                        id={itemId}
                        ref={(el) =>
                          (inputRefs.current.checkBox[
                            `${index}${itemId}${optionIdx}`
                          ] = el)
                        }
                      />
                      <PreviewCustomLabel htmlFor={itemId}>
                        {item}
                      </PreviewCustomLabel>
                    </QuestionItemLi>
                  );
                })}
              </ul>
            )}
            {item.type === "체크박스" && item.etc && (
              <QuestionListWrapDiv>
                <PreviewCustomInput
                  type="checkbox"
                  ref={(el) => (inputRefs.current.checkedBoxEtc[index] = el)}
                  checked={checkedSquare[index]}
                  onChange={() => handleCheckboxEtcClick(index)}
                />
                <PreviewEtcDiv>
                  <PreviewEtcLabel
                    onClick={() => handleCheckboxEtcClick(index)}
                  >
                    기타:
                  </PreviewEtcLabel>
                  <AnimatePreviewEtcDiv>
                    <PreviewEtcInput
                      type="text"
                      onClick={() => handleCheckboxEtcClick(index)}
                      ref={(el) => (inputRefs.current.checkboxEtc[index] = el)}
                    />
                    <AnimatedPreviewEtcSpan />
                  </AnimatePreviewEtcDiv>
                </PreviewEtcDiv>
              </QuestionListWrapDiv>
            )}
            {item.type === "드롭다운" && (
              <QuestionTypeSelect
                onClick={() =>
                  setIsActive(() => ({
                    [index]: true,
                  }))
                }
                className={isActive[index] ? "active" : ""}
              >
                <button type="button">{selectedOption[index] || "선택"}</button>
                <ul>
                  {item.items.map((item, idx) => (
                    <li key={idx}>
                      <button
                        type="button"
                        onClick={(e, prev) => {
                          e.stopPropagation();
                          setSelectedOption((prev) => ({
                            ...prev,
                            [index]: item,
                          }));
                          setIsActive(() => ({
                            [index]: false,
                          }));
                        }}
                      >
                        {item}
                      </button>
                    </li>
                  ))}
                </ul>
              </QuestionTypeSelect>
            )}
          </QuestionItemWrap>
        );
      })}
      <BtnWrap>
        <SubmitBtn type="submit" onClick={handleResult}>
          제출
        </SubmitBtn>
        <ResetBtn type="button" onClick={reset}>
          양식 지우기
        </ResetBtn>
      </BtnWrap>
    </>
  );
}
