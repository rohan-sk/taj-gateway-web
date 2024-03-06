import { render } from "@testing-library/react";
import CardWithCta from "../../components/card/card-with-cta.component";

it("shows card with cta component", () => {
  const { asFragment } = render(<CardWithCta />);
  expect(asFragment()).toMatchSnapshot();
});
