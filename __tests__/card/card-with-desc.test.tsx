import { render } from "@testing-library/react";
import dynamic from "next/dynamic";
const CardWithDesc = dynamic(
  () => import("../../components/card/card-with-desc.component")
)

it("shows card with description component", () => {
  const { asFragment } = render(<CardWithDesc />);
  expect(asFragment()).toMatchSnapshot();
});
