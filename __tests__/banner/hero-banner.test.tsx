import { render } from "@testing-library/react";
import HeroBanner from "../../components/banner/hero-banner.component";

const data = {
  image: "image-7d387f6df85235372783105d5f0db1d2d7d64bab-640x1307-png",
  largeImage: "image-6b856950349f3c128c7940e49d4023962f775597-1920x930-png",
};

it("shows hero banner", () => {
  const { asFragment } = render(<HeroBanner {...data} />);
  expect(asFragment()).toMatchSnapshot();
});

// describe("Home page components", () => {
//   it("renders a Header component", () => {
//     render(<Header {...data} />)
//   })

//   // it("should render without throwing an error", function () {
//   //   const wrapper = shallow(<Header {...data} />)
//   //   const test = wrapper.find(<AppBar />).length
//   //   expect(test).toEqual(1)
//   //   // expect(wrapper.find("p").text()).toBe("HOTELS")
//   // })
// })
