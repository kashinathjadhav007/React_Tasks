import { Carousel } from "react-bootstrap";
import img2 from "../Images/tree.jpg";
const Slider = () => {
  return (
    <div className="slider">
      <Carousel>
        <Carousel.Item interval={5000}>
          <img className="d-block w-100" src={img2} alt="First slide" />
        </Carousel.Item>
        <Carousel.Item interval={5000}>
          <img className="d-block w-100" src={img2} alt="Second slide" />
        </Carousel.Item>
        <Carousel.Item interval={5000}>
          <img className="d-block w-100" src={img2} alt="Third slide" />
        </Carousel.Item>
      </Carousel>
    </div>
  );
};
export default Slider;
