const MyName = (props) => {
  console.log("this is the MyName component");
  const someProperty = props.someProperty;
  return (
    <>
      <h2>My name is {props.name}!</h2>
      <h3>{someProperty}</h3>
    </>
  );
};
export default MyName;
