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
  PreviewAlertP,
} from "./PreviewStyle";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/Modal/Modal";

interface IState {
  questionListTitle: { value: string };
  questionListItem: { value: any[] };
}

export default function Preview() {
  const questionListItem = useSelector(
    (state: IState) => state.questionListItem.value
  );
  const [isActive, setIsActive] = useState<Record<number, boolean>>({});
  const [selectedOption, setSelectedOption] = useState<Record<number, string>>(
    {}
  );
  const [unAnsweredIndex, setUnAnsweredIndex] = useState<number>(-1);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const showModal = () => {
    setIsModalVisible(true);
  };
  const closeModal = () => {
    setIsModalVisible(false);
  };
  const navigate = useNavigate();

  const handleResult = () => {
    const inputValues = Object.entries(inputRefs.current).reduce(
      (acc: any, [key, refMap]: [string, any]) => {
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
    const unAnsweredIndex = checkRequiredAnswers(inputValues, selectedOption);
    if (unAnsweredIndex === -1) {
      navigate("/result", {
        state: {
          inputValues: inputValues,
          selectedOption: selectedOption,
        },
      });
    } else {
      setUnAnsweredIndex(unAnsweredIndex);
    }
  };
  const checkRequiredAnswers = (
    inputValues: any,
    selectedOption: Record<number, string>
  ) => {
    const unAnsweredIndex = questionListItem.findIndex((item, index) => {
      if (!item.required) return false;
      const id = index;
      switch (item.type) {
        case "단답형":
        case "장문형":
          return !(inputValues.shortAnswer[id] || inputValues.longAnswer[id]);
        case "객관식 질문":
          return !(
            Object.values(inputValues.checkRadio[id] || {}).some(
              (checked) => checked
            ) || inputValues.checkedRadioEtc[id]
          );
        case "체크박스":
          return !(
            Object.values(inputValues.checkBox[id] || {}).some(
              (checked) => checked
            ) || inputValues.checkedBoxEtc[id]
          );
        case "드롭다운":
          return !selectedOption[id];
        default:
          return false;
      }
    });
    return unAnsweredIndex >= 0 ? unAnsweredIndex : -1;
  };

  const [checkedSquare, setCheckedSquare] = useState<boolean[]>(
    new Array(
      questionListItem.filter(
        (item) => item.type === "체크박스" && item.etc
      ).length
    ).fill(false)
  );
  const [checkedRadio, setCheckedRadio] = useState<boolean[]>(
    new Array(
      questionListItem.filter(
        (item) => item.type === "객관식 질문" && item.etc
      ).length
    ).fill(false)
  );

  const inputRefs = useRef<{
    shortAnswer: any;
    longAnswer: any;
    radioEtc: any;
    checkboxEtc: any;
    checkBox: any;
    checkRadio: any;
    checkedRadioEtc: any;
    checkedBoxEtc: any;
  }>({
    shortAnswer: {}, // 단답형
    longAnswer: {}, // 장문형
    radioEtc: {}, // 객관식 질문 기타란
    checkboxEtc: {}, // 체크박스 기타란
    checkBox: {}, // 체크박스 체크 유무
    checkRadio: {}, // 라디오 체크 유무
    checkedRadioEtc: {}, // 기타라디오 체크 유무
    checkedBoxEtc: {}, // 기타 체크박스 체크 유무
  });
  const handleCheckboxEtcClick = (index: number) => {
    setCheckedSquare((prevCheckedSquare) => {
      const newCheckedSquare = [...prevCheckedSquare];
      newCheckedSquare[index] = !newCheckedSquare[index];
      return newCheckedSquare;
    });
    if (unAnsweredIndex === index) {
      setUnAnsweredIndex(-1);
    }
  };
  const handleCheckboxEtcClickRadio = (index: number) => {
    setCheckedRadio((prevCheckedRadio) => {
      const newCheckedRadio = [...prevCheckedRadio];
      newCheckedRadio[index] = !newCheckedRadio[index];
      return newCheckedRadio;
    });
    if (unAnsweredIndex === index) {
      setUnAnsweredIndex(-1);
    }
  };
  const handleInputEtcClickRadio = (index: number) => {
    setCheckedRadio((prevCheckedRadio) => {
      const newCheckedRadio = [...prevCheckedRadio];
      newCheckedRadio[index] = true;
      return newCheckedRadio;
    });
    if (unAnsweredIndex === index) {
      setUnAnsweredIndex(-1);
    }
  };
  const handleInputEtcClick = (index: number) => {
    setCheckedSquare((prevCheckedSquare) => {
      const newCheckedSquare = [...prevCheckedSquare];
      newCheckedSquare[index] = true;
      return newCheckedSquare;
    });
    if (unAnsweredIndex === index) {
      setUnAnsweredIndex(-1);
    }
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
    Object.values(
      inputRefs.current.shortAnswer as { [key: string]: HTMLInputElement }
    ).forEach((ref) => ref && (ref.value = ""));
    Object.values(
      inputRefs.current.longAnswer as { [key: string]: HTMLInputElement }
    ).forEach((ref) => ref && (ref.value = ""));
    Object.values(
      inputRefs.current.radioEtc as { [key: string]: HTMLInputElement }
    ).forEach((ref) => ref && (ref.value = ""));
    Object.values(
      inputRefs.current.checkboxEtc as { [key: string]: HTMLInputElement }
    ).forEach((ref) => ref && (ref.value = ""));
    Object.values(
      inputRefs.current.checkBox as { [key: string]: HTMLInputElement }
    ).forEach((ref) => ref && (ref.checked = false));
    Object.values(
      inputRefs.current.checkRadio as { [key: string]: HTMLInputElement }
    ).forEach((ref) => ref && (ref.checked = false));
    Object.values(
      inputRefs.current.checkedRadioEtc as { [key: string]: HTMLInputElement }
    ).forEach((ref) => ref && (ref.checked = false));
    Object.values(
      inputRefs.current.checkedBoxEtc as { [key: string]: HTMLInputElement }
    ).forEach((ref) => ref && (ref.checked = false));
    setIsActive({});
    setSelectedOption({});
    setIsModalVisible(false);
  };
  return (
    <>
      <h1 className="a11y-hidden">구글 설문지</h1>
      <TitleBox disabled preview />
      {questionListItem.map((item, index) => {
        return (
          <QuestionItemWrap
            key={index}
            alert={unAnsweredIndex === index ? "true" : "false"}
          >
            <QuestionItemDragDiv />
            <QuestionItemTitle
              title={item.title === "" && !item.required ? "false" : "true"}
            >
              {item.title}
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
                  onChange={() =>
                    unAnsweredIndex === index && setUnAnsweredIndex(-1)
                  }
                />
                <AnimatedPreviewShortSpan
                  alert={unAnsweredIndex === index ? "true" : "false"}
                />
              </AnimatePreviewShortDiv>
            )}
            {item.type === "장문형" && (
              <AnimatePreviewLongDiv>
                <PreviewLongInput
                  type="text"
                  placeholder="내 답변"
                  ref={(el) => (inputRefs.current.longAnswer[index] = el)}
                  onChange={() =>
                    unAnsweredIndex === index && setUnAnsweredIndex(-1)
                  }
                />
                <AnimatedPreviewLongSpan
                  alert={unAnsweredIndex === index ? "true" : "false"}
                />
              </AnimatePreviewLongDiv>
            )}
            {item.type === "객관식 질문" && (
              <ul>
                {item.items.map((item: string[], optionIdx: number) => {
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
                        onChange={() =>
                          unAnsweredIndex === index && setUnAnsweredIndex(-1)
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
                      onClick={() => handleInputEtcClickRadio(index)}
                      ref={(el) => (inputRefs.current.radioEtc[index] = el)}
                    />
                    <AnimatedPreviewEtcSpan />
                  </AnimatePreviewEtcDiv>
                </PreviewEtcDiv>
              </QuestionListWrapDiv>
            )}
            {item.type === "체크박스" && (
              <ul>
                {item.items.map((item: string[], optionIdx: number) => {
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
                        onChange={() =>
                          unAnsweredIndex === index && setUnAnsweredIndex(-1)
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
                      onClick={() => handleInputEtcClick(index)}
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
                  {item.items.map((item: string, idx: number) => (
                    <li key={idx}>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedOption((prev) => ({
                            ...prev,
                            [index]: item as string,
                          }));
                          setIsActive(() => ({
                            [index]: false,
                          }));
                          unAnsweredIndex === index && setUnAnsweredIndex(-1);
                        }}
                      >
                        {item}
                      </button>
                    </li>
                  ))}
                </ul>
              </QuestionTypeSelect>
            )}
            {unAnsweredIndex === index && (
              <PreviewAlertP>필수 질문입니다.</PreviewAlertP>
            )}
          </QuestionItemWrap>
        );
      })}
      <BtnWrap>
        <SubmitBtn type="submit" onClick={handleResult}>
          제출
        </SubmitBtn>
        <ResetBtn type="button" onClick={showModal}>
          양식 지우기
        </ResetBtn>
      </BtnWrap>
      {isModalVisible && <Modal closeModal={closeModal} reset={reset} />}
    </>
  );
}
