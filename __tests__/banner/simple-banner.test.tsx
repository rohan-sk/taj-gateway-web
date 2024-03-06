import { render } from "@testing-library/react";
import SimpleBanner from "../../components/banner/simple-banner.component";

const data = {
  image: "image-8bd59520af0028434a7ee36725f77ef0e608a27a-640x640-png",
  largeImage: "image-8e11aabadd082534345dd320fbd066f78a1be13d-1920x770-png",
};

it("shows simple banner", () => {
  const { asFragment } = render(<SimpleBanner {...data} />);
  expect(asFragment()).toMatchSnapshot();
});
