import React from "react";
import { render } from "@testing-library/react";
import Header from "../../components/header/header.component";

const data = [
  {
    logo: "image-eaf9ae941361d173fdbd613ba600197b69471d50-100x88-png",
    detailList: [
      { title: "DESTINATIONS" },
      { title: "HOTELS" },
      { title: "REWARDS" },
      { title: "DINING" },
      { title: "HOLIDAYS" },
      { title: "MORE" },
    ],
    loginList: [{ title: "LOGIN" }, { title: "EN" }],
    primaryAction: [{ title: "BOOK A STAY" }],
  },
];

it("shows header", () => {
  const { asFragment } = render(<Header {...data} />);
  expect(asFragment()).toMatchSnapshot();
});
