// ./components/MyButton
// make the title or content of the button say 'click me' passed as a destructured prop
import { useState } from "react";
const MyButton = ({ title }) => {
  const [clickCount, setClickCount] = useState(0);
  const handleClick = () => {
    setClickCount((prevClickCount) => {
      return prevClickCount + 1;
    });
  };
  console.log(clickCount);
  return (
    <>
      <button type="button" onClick={handleClick}>
        {title}
      </button>

      <span>Count: {clickCount}</span>
      <br></br>
    </>
  );
};
export default MyButton;
