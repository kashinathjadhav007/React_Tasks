import { useLocation } from "react-router";

const ViewPage = () => {
  const location = useLocation();
  let Data = location.state;
  console.log(typeof Data.data1);

  return (
    <>
      <br></br>
      <br></br>
      <h5>Title: {Data.title}</h5>
      <h5>date: {Data.date}</h5>
      <h5>Name:{Data.name}</h5>
      <h5>Info:{Data.info}</h5>
    </>
  );
};
export default ViewPage;
