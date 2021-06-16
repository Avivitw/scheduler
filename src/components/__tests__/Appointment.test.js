import React from "react";

import { render, cleanup, act } from "@testing-library/react";

import Appointment from "components/Application";


afterEach(cleanup);

it("renders without crashing", () => {
  act(() => {render(<Appointment />)}
  );
});

