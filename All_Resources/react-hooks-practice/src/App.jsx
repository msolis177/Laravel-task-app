import MyName from "./components/MyName";
import FriendsName from "./components/FriendsName";
import MyButton from "./components/MyButton";
function App() {
  // pass two props to the FriendsName component
  // utilize them in the component file
  // through props.property
  // and const property = props.property
  return (
    <>
      <MyButton title="Increase" someProp=""/>
      <MyButton title="Decrease" someProp=""/>
      {/* <h1>Hello World</h1>
      <MyName name="Ryan" />
      <FriendsName age="18" color="green" /> */}
    </>
  );
}

export default App;
