import { render, screen, fireEvent } from "@testing-library/react";
import {within} from '@testing-library/dom'
import { StickyNotes } from "./stickyNotes";

describe("Initialize StickyNote List", () => {
    test("renders create note form", () => {
        render(<StickyNotes />);

        const createNoteButton = screen.getByText("Create Note");
        expect(createNoteButton).toBeInTheDocument();
    });

    test("renders all notes from DummyNotesList", () => {
        render(<StickyNotes />);

        //Test dummy note 1
        const note1 = document.getElementById("1");
        const note1Title = within(note1 as HTMLElement).getByTestId("title").innerHTML.trim();
        const note1Content = within(note1 as HTMLElement).getByTestId("content").innerHTML.trim();
        const note1Label = within(note1 as HTMLElement).getByTestId("label").innerHTML.trim();
        expect(note1Title).toBe("test note 1 title");
        expect(note1Content).toBe("test note 1 content");
        expect(note1Label).toBe("other");

        //Test dummy note 2
        const note2 = document.getElementById("2");
        const note2Title = within(note2 as HTMLElement).getByTestId("title").innerHTML.trim();
        const note2Content = within(note2 as HTMLElement).getByTestId("content").innerHTML.trim();
        const note2Label = within(note2 as HTMLElement).getByTestId("label").innerHTML.trim();
        expect(note2Title).toBe("test note 2 title");
        expect(note2Content).toBe("test note 2 content");
        expect(note2Label).toBe("personal");

        //Test dummy note 3
        const note3 = document.getElementById("3");
        const note3Title = within(note3 as HTMLElement).getByTestId("title").innerHTML.trim();
        const note3Content = within(note3 as HTMLElement).getByTestId("content").innerHTML.trim();
        const note3Label = within(note3 as HTMLElement).getByTestId("label").innerHTML.trim();
        expect(note3Title).toBe("test note 3 title");
        expect(note3Content).toBe("test note 3 content");
        expect(note3Label).toBe("work");

        //Test dummy note 4
        const note4 = document.getElementById("4");
        const note4Title = within(note4 as HTMLElement).getByTestId("title").innerHTML.trim();
        const note4Content = within(note4 as HTMLElement).getByTestId("content").innerHTML.trim();
        const note4Label = within(note4 as HTMLElement).getByTestId("label").innerHTML.trim();
        expect(note4Title).toBe("test note 4 title");
        expect(note4Content).toBe("test note 4 content");
        expect(note4Label).toBe("study");

        //Test dummy note 5
        const note5 = document.getElementById("5");
        const note5Title = within(note5 as HTMLElement).getByTestId("title").innerHTML.trim();
        const note5Content = within(note5 as HTMLElement).getByTestId("content").innerHTML.trim();
        const note5Label = within(note5 as HTMLElement).getByTestId("label").innerHTML.trim();
        expect(note5Title).toBe("test note 5 title");
        expect(note5Content).toBe("test note 5 content");
        expect(note5Label).toBe("study");

        //Test dummy note 6
        const note6 = document.getElementById("6");
        const note6Title = within(note6 as HTMLElement).getByTestId("title").innerHTML.trim();
        const note6Content = within(note6 as HTMLElement).getByTestId("content").innerHTML.trim();
        const note6Label = within(note6 as HTMLElement).getByTestId("label").innerHTML.trim();
        expect(note6Title).toBe("test note 6 title");
        expect(note6Content).toBe("test note 6 content");
        expect(note6Label).toBe("personal");
    });
});

describe("Create StickyNote", () => {
    test("creates a new note", () => {
        render(<StickyNotes />);

        // Please make sure your sticky note has a title and content input field with the following placeholders.
        const createNoteTitleInput = screen.getByPlaceholderText("Note Title");
        const createNoteContentTextarea = screen.getByPlaceholderText("Note Content");
        const createNoteButton = screen.getByText("Create Note");

        fireEvent.change(createNoteTitleInput, {target: {value: "New Note"}});
        fireEvent.change(createNoteContentTextarea, {target: {value: "Note content"}});
        fireEvent.click(createNoteButton);

        const newNoteTitle = screen.getByText("New Note");
        const newNoteContent = screen.getByText("Note content");

        expect(newNoteTitle).toBeInTheDocument();
        expect(newNoteContent).toBeInTheDocument();
    });
});

describe("Update a StickyNote", () => {
    test("update sticky note 1", () => {
        render(<StickyNotes />);

        const note1 = document.getElementById("1");
        const note1Title = within(note1 as HTMLElement).getByText("test note 1 title");
        note1Title.innerHTML = "Edited Title 1";
        const note1Content = within(note1 as HTMLElement).getByText("test note 1 content");
        note1Content.innerHTML = "Edited Content 1";

        expect(screen.queryByText("test note 1 title")).toBeNull();
        expect(screen.queryByTitle("test note 1 content")).toBeNull();
        expect(screen.queryByText("Edited Title 1")).toBeInTheDocument();
        expect(screen.queryByText("Edited Content 1")).toBeInTheDocument();
    });
});

describe("Delete a StickyNote", () => {
    test("delete sticky note 1", () => {
        render(<StickyNotes />);

        const note1 = document.getElementById("1");
        const deleteNoteButton = within(note1 as HTMLElement).getByText("x");
        fireEvent.click(deleteNoteButton);

        const Note1Title = screen.queryByText("test note 1 title");
        const Note1Content = screen.queryByTitle("test note 1 content");
        expect(Note1Title).toBeNull();
        expect(Note1Content).toBeNull();

        expect(screen.queryByText("test note 2 title")).toBeInTheDocument();
        expect(screen.queryByText("test note 2 content")).toBeInTheDocument();
        expect(screen.queryByText("test note 3 title")).toBeInTheDocument();
        expect(screen.queryByText("test note 3 content")).toBeInTheDocument();
        expect(screen.queryByText("test note 4 title")).toBeInTheDocument();
        expect(screen.queryByText("test note 4 content")).toBeInTheDocument();
        expect(screen.queryByText("test note 5 title")).toBeInTheDocument();
        expect(screen.queryByText("test note 5 content")).toBeInTheDocument();
        expect(screen.queryByText("test note 6 title")).toBeInTheDocument();
        expect(screen.queryByText("test note 6 content")).toBeInTheDocument();
    });
});