export const DefaultCKEditorToolbarConfig = [
    'mode', 'document', 'doctools',
    "|",
    "heading",
    "italic",
    "link",
    "bulletedList",
    "numberedList",
    "blockQuote",
];

export const defaultConfig = {
	toolbar: {
		items: [
			'undo',
			'redo',
			'heading',
			'|',
			'fontSize',
			'fontFamily',
			'fontColor',
			'bold',
			'italic',
			'underline',
			'highlight',
			'link',
			'blockQuote',
			'removeFormat',
			'specialCharacters',
			'|',
			'outdent',
			'indent',
			'|',
			'bulletedList',
			'numberedList',
			'todoList',
			'|',
			'codeBlock',
			'code',
			'|',
			'imageUpload',
			'insertTable',
			'mediaEmbed',
			'imageInsert'
		]
	},
	language: 'fr',
	image: {
		toolbar: [
			'imageTextAlternative',
			'toggleImageCaption',
			'imageStyle:inline',
			'imageStyle:block',
			'imageStyle:side'
		]
	},
	table: {
		contentToolbar: [
			'tableColumn',
			'tableRow',
			'mergeTableCells',
			'tableCellProperties',
			'tableProperties'
		]
	}
};


// [
//     { name: 'document', groups: [ 'mode', 'document', 'doctools' ] },
//     { name: 'clipboard', groups: [ 'clipboard', 'undo' ] },
//     { name: 'editing', groups: [ 'find', 'selection', 'spellchecker', 'editing' ] },
//     { name: 'forms', groups: [ 'forms' ] },
//     '/',
//     { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
//     { name: 'paragraph', groups: [ 'list', 'indent', 'blocks', 'align', 'bidi', 'paragraph' ] },
//     { name: 'links', groups: [ 'links' ] },
//     { name: 'insert', groups: [ 'insert' ] },
//     '/',
//     { name: 'styles', groups: [ 'styles' ] },
//     { name: 'colors', groups: [ 'colors' ] },
//     { name: 'tools', groups: [ 'tools' ] },
//     { name: 'others', groups: [ 'others' ] },
//     { name: 'about', groups: [ 'about' ] }
// ]

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
