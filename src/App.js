import TitleBox from "./components/TitleBox/TitleBox";
import { GlobalStyle } from "./styles/GlobalStyle"; 
import QuestionList from "./components/QuestionList/QuestionList";

function App() {
  return (
    <>
      <GlobalStyle/>
      <TitleBox/>
      <QuestionList/>
    </>
  );
}
export default App;
