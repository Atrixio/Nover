import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertPlainTextToHTML(plainText: string) {
  // Function to escape HTML special characters
  const escapeHTML = (text: string) => {
    const map: { [key: string]: string } = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    };
    return text.replace(/[&<>"']/g, (m) => map[m]);
  };

  const htmlContent = plainText
    .split("\n") // Split text into lines
    .map((line) => `<div>${line ? escapeHTML(line) : "<br>"}</div>`) // Escape HTML and handle empty lines
    .join(""); // Join the lines back into a single string

  return htmlContent;
}

export function getInnerText(div: HTMLDivElement) {
  let innerText = "";
  const recursive = (childNodes: NodeListOf<ChildNode>) => {
    for (let i = 0; i < childNodes.length; i++) {
      const childNode = childNodes[i];
      if (childNode.nodeName === "BR") {
        continue;
      } else if (childNode.nodeType === 3) {
        innerText += childNode.textContent;
      } else if (childNode.nodeName === "DIV" && i != 0) {
        innerText += "\n";
      }
      recursive(childNode.childNodes);
    }
  };
  recursive(div.childNodes);
  return innerText;
}
