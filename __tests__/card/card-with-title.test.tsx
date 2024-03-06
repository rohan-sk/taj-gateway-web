import { render } from "@testing-library/react";
import CardWithTitle from "../../components/card/card-with-title.component";

it("shows card with title component", () => {
  const { asFragment } = render(<CardWithTitle />);
  expect(asFragment()).toMatchSnapshot();
});
