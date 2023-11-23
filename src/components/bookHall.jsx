import Auth from "./axios";

export default function BookHall() {
  function fetchData() {
    const response = Auth.get("userdetails/");
    console.log(response);
  }
  fetchData();

  return (
    <>
      <div></div>
    </>
  );
}
