import Embed from "@editorjs/embed";
import List from "@editorjs/list";
import Image from "@editorjs/image";
import Header from "@editorjs/header";
import Quote from "@editorjs/quote";
import Marker from "@editorjs/marker";
import InlineCode from "@editorjs/inline-code";

// Handle uploads by URL
const uploadByURL = (url) => {
  return Promise.resolve({
    success: 1,
    file: { url }
  });
};

// Handle uploads by file input
const uploadByFile = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve({
        success: 1,
        file: { url: reader.result }
      });
    };
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
};

export const tools = {
  embed: Embed,

  list: {
    class: List,
    inlineToolbar: true
  },

  image: {
    class: Image,
    config: {
      uploader: {
        uploadByUrl: uploadByURL,
        uploadByFile: uploadByFile
      }
    }
  },

  header: {
    class: Header,
    placeholder: "Type a heading...",
    levels: [2, 3, 4],
    defaultLevel: 2
  },

  quote: {
    class: Quote,
    inlineToolbar: true,
    config: {
      quotePlaceholder: "Enter a quote",
      captionPlaceholder: "Quote's author"
    }
  },

  marker: Marker,
  inlineCode: InlineCode
};




