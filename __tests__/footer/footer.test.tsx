import { render } from "@testing-library/react";
import Footer from "../../components/footer/footer.component";

it("shows footer component", () => {
  const { asFragment } = render(<Footer />);
  expect(asFragment()).toMatchSnapshot();
});
