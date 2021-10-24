import React,{useState} from 'react';
import Carousel from 'react-bootstrap/Carousel';

function Herosection() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
      <div >
    <Carousel className ="herosection" activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://res.cloudinary.com/tarscano/image/upload/c_scale,h_500,w_1920/v1630419772/images/photo-1576556047303-7838c29bede0_ecmhbt.jpg"
          alt="First slide"
        />
        <Carousel.Caption>
          
          
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://res.cloudinary.com/tarscano/image/upload/c_scale,h_500,w_1920/v1629714038/images/photo-1506031765313-0bc574a405f0_tisrbs.jpg"
          alt="Second slide"
        />

        <Carousel.Caption>
          
          
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://res.cloudinary.com/tarscano/image/upload/c_scale,h_500,w_1920/v1629714176/images/photo-1612858250434-b5358e2b3625_ah5cnd.jpg"
          alt="Third slide"
        />

        <Carousel.Caption>
          
          
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    </div>
  );
}
//render(<ControlledCarousel />);
export default Herosection;