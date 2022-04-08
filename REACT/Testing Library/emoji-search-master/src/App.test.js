import { render, screen } from '@testing-library/react'
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom'
import React from 'react'
import App from './App';

describe('Emoji testleri.', () => {
  let input, emojiKiss;

  beforeEach(() => {
    render(<App />);
    emojiKiss = screen.getByText(/Kissing Heart/i)
    input = screen.getByPlaceholderText(/Emoji ara.../i)
  })

  test("Başlık kısmı.", () => {
    const header = screen.getByText(/Emoji Search/i)
    expect(header).toBeInTheDocument();
  })

  test("Emoji listesi.", () => {
    expect(emojiKiss).toBeInTheDocument()
  })

  test("Filtreleme işlemi.", () => {
    const emojiText = "100"
    userEvent.type(input, emojiText)
    expect(emojiKiss).not.toBeInTheDocument()
  })

  test("Copyalama işlemi.", () => {
    document.execCommand = jest.fn();
    userEvent.click(emojiKiss)
    expect(document.execCommand).toBeCalledWith('copy')
    const copyEmoji = window.ClipboardData;
    expect(copyEmoji).toEqual(emojiKiss.value)
  })
});