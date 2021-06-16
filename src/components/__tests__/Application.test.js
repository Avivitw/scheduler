import React from "react";

import { render, cleanup, waitForElement, fireEvent, getByText, getAllByTestId, act, getByAltText, getByPlaceholderText, queryByText, getByTestId } from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

describe("Application", () => {

  it("changes the schedule when a new day is selected", async() => {
    const { getByText } = render(<Application />);

    await waitForElement(() => getByText("Monday"));

      act(() => {fireEvent.click(getByText("Tuesday"))});
      
      expect(getByText("Leopold Silvers")).toBeInTheDocument();
    
  });

  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async() => {
    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointment = getAllByTestId(container, "appointment")[0];
    
    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    fireEvent.click(getByText(appointment, "Save"));
    
    expect(getByText(appointment, "Saving")).toBeInTheDocument(); 

    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));
    
    const day = getAllByTestId(container, "day").find(day => queryByText(day, "Monday"));

    expect(getByText(day, "no spots remaining")).toBeInTheDocument();

  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    const { container } = render(<Application />);
  
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointment = getAllByTestId(container, "appointment")[1];
    //find the delete icon and click it
    fireEvent.click(getByAltText(appointment, "Delete"));
    //check the confirm display
    expect(getByText(appointment, "Are you sure you want to delete?")).toBeInTheDocument();

    //Added more tests to check  the cancel button
    fireEvent.click(getByText(appointment, "Cancel"));

    fireEvent.click(getByAltText(appointment, "Delete"));

    //check the confirm display
    expect(getByText(appointment, "Are you sure you want to delete?")).toBeInTheDocument();

    //click on confirm button
    fireEvent.click(getByText(appointment, "Confirm"));
    //verify deleting state
    expect(getByText(appointment, "Deleting")).toBeInTheDocument(); 

    await waitForElement(() => getByAltText(appointment, "Add"));

    //confimr spots increases by 1
    const day = getAllByTestId(container, "day").find(day => queryByText(day, "Monday"));

    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
 
  });
  
  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    const { container } = render(<Application />);
  
    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
    //find the Edit icon and click it
    fireEvent.click(getByAltText(appointment, "Edit"));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: " vivi" }
    });

      //click on save button
    fireEvent.click(getByText(appointment, "Save"));
    //verify deleting state
    expect(getByText(appointment, "Saving")).toBeInTheDocument(); 
    //confimr didn't changed
    const day = getAllByTestId(container, "day").find(day => queryByText(day, "Monday"));

    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
 
  });

});