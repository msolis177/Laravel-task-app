const FriendsName = (props) => {
  // console.log(props.color);
  const color = props.color;

  return (
    <>
      <h2>My friend is everyone!</h2>
      <h2>My friend's age is {props.age}</h2>
      <h2>My friend's favorite color is {color}</h2>
    </>
  );
};
export default FriendsName;
