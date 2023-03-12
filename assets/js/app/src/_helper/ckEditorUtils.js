export const DefaultCKEditorToolbarConfig = [
    "heading",
    "|",
    "italic",
    "link",
    "bulletedList",
    "numberedList",
    "blockQuote",
];

export const ckTransform = (str) => {
    return (str + "")
        .trim()
        //.replace(/(?:(.+)((?:\r\n|[\r\n]).+?))+?/gm, "$1<br/>$2")
         //.replace(/^(.*(?:(\r\n|[\r\n]).+$)*)/gm, "<p>$1</p>")
        .replace(/^(.+)$/gm, "<p>$1</p>")
        .replace(/(\r\n|[\r\n])/gm, "")
    ;
};

// function space2nbsp (str, is_xhtml) {

//     const spaceTag = '&nbsp;';

//     return (str + '')
//     //.replace(/(\t)/g, spaceTag+spaceTag+spaceTag+spaceTag)
//     //.replace(/( )/g, spaceTag)
//     //.replace(/(\r\n|\n\r|\r|\n)/g, '' );
//     ;
//   }
