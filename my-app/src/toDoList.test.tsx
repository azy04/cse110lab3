import { render, screen, fireEvent } from "@testing-library/react";
import {within} from '@testing-library/dom'
import { ToDoList } from "./toDoList";
import App from "./App"
import { BrowserRouter } from "react-router-dom";

describe("Initialize ToDoList", () => {
    test("render todolist", () => {
        render(<ToDoList />);

        expect(screen.getByText("Items bought: 0")).toBeInTheDocument();
        expect(screen.getByText("Apples")).toBeInTheDocument();
        expect(screen.getByText("Bananas")).toBeInTheDocument();
    });

    test("render ABC todolist", () => {
        render(
            <BrowserRouter>
                <App />
            </BrowserRouter>
        );
        const ABCButton = screen.getByText("ABC To Do List");
        fireEvent.click(ABCButton);

        expect(screen.getByText("ABC's To Do List")).toBeInTheDocument();
        expect(screen.getByText("Items bought: 0")).toBeInTheDocument();
        expect(screen.getByText("Apples")).toBeInTheDocument();
        expect(screen.getByText("Bananas")).toBeInTheDocument();
    });

    test("render DEF todolist", () => {
        render(
            <BrowserRouter>
                <App />
            </BrowserRouter>
        );
        const DEFButton = screen.getByText("DEF To Do List");
        fireEvent.click(DEFButton);

        expect(screen.getByText("DEF's To Do List")).toBeInTheDocument();
        expect(screen.getByText("Items bought: 0")).toBeInTheDocument();
        expect(screen.getByText("Apples")).toBeInTheDocument();
        expect(screen.getByText("Bananas")).toBeInTheDocument();
    });
});

describe("Check ToDoList", () => {    
    test("click checkboxes", () => {
        render(<ToDoList />);

        const checkboxes = document.getElementsByTagName("input");

        //Click Apples
        fireEvent.click(screen.getByRole("checkbox", {name: "Apples"}));
        expect(screen.queryByText("Items bought: 1")).toBeInTheDocument();

        //Click Bananas
        fireEvent.click(screen.getByRole("checkbox", {name: "Bananas"}));
        expect(screen.queryByText("Items bought: 2")).toBeInTheDocument();

        //Unclick Apples
        fireEvent.click(screen.getByRole("checkbox", {name: "Apples"}));
        expect(screen.queryByText("Items bought: 1")).toBeInTheDocument();

        //Unclick Bananas
        fireEvent.click(screen.getByRole("checkbox", {name: "Bananas"}));
        expect(screen.queryByText("Items bought: 0")).toBeInTheDocument();
    });
});