export const getEditorFunctions = textEditor => {
    return {
        boldBtn: function() {
            textEditor.execCommand("Bold", false, null);
        },
        italicBtn: function() {
            textEditor.execCommand("Italic", false, null);
        },
        underlineBtn: function() {
            textEditor.execCommand("Underline", false, null);
        },
        subscriptBtn: function() {
            textEditor.execCommand("Subscript", false, null);
        },
        superScriptBtn: function() {
            textEditor.execCommand("Superscript", false, null);
        },
        strikeBtn: function() {
            textEditor.execCommand("Strikethrough", false, null);
        },
        rmvFormatBtn: function() {
            textEditor.execCommand("RemoveFormat", false, null);
        },
        ulBtn: function() {
            textEditor.execCommand(
                "InsertUnorderedList",
                false,
                `new${Math.round(Math.random() * 1000)}`
            );
        },
        oltBtn: function() {
            textEditor.execCommand(
                "InsertOrderedList",
                false,
                `new${Math.round(Math.random() * 1000)}`
            );
        },
        leftAlignBtn: function() {
            textEditor.execCommand("JustifyLeft", false, "");
        },
        centerAlignBtn: function() {
            textEditor.execCommand("JustifyCenter", false, null);
        },
        rightAlignBtn: function() {
            textEditor.execCommand("JustifyRight", false, null);
        },
        justifyAlignBtn: function() {
            textEditor.execCommand("JustifyFull", false, null);
        },
        undoBtn: function() {
            textEditor.execCommand("Undo", false, null);
        },
        redoBtn: function() {
            textEditor.execCommand("Redo", false, null);
        },
        linkBtn: function() {
            const url = prompt("Enter the link url", "http://");
            if (url !== null) {
                textEditor.execCommand("CreateLink", false, url);
            }
        },
        unlinkBtn: function() {
            textEditor.execCommand("Unlink", false, null);
        }
    };
};

export const classes = [
    "boldBtn",
    "italicBtn",
    "underlineBtn",
    "subscriptBtn",
    "superScriptBtn",
    "strikeBtn",
    "rmvFormatBtn",
    "ulBtn",
    "oltBtn",
    "leftAlignBtn",
    "centerAlignBtn",
    "rightAlignBtn",
    "justifyAlignBtn",
    "undoBtn",
    "redoBtn",
    "linkBtn",
    "unlinkBtn"
];

export const titles = [
    "Bold",
    "Italic",
    "Underlined",
    "Subscript",
    "Superscript",
    "Strike-through",
    "Remove Formatting",
    "Bullet Points",
    "Numbered List",
    "Align Left",
    "Align Center",
    "Align Right",
    "Align Justify",
    "Undo",
    "Redo",
    "Link",
    "Unlink"
];

export const icons = [
    "fa-bold",
    "fa-italic",
    "fa-underline",
    "fa-subscript",
    "fa-superscript",
    "fa-strikethrough",
    "fa-remove-format",
    "fa-list-ul",
    "fa-list-ol",
    "fa-align-left",
    "fa-align-center",
    "fa-align-right",
    "fa-align-justify",
    "fa-undo",
    "fa-redo",
    "fa-link",
    "fa-unlink"
];

export const fonts = [
    "Times New Roman",
    "Consolas",
    "Tahoma",
    "Calibri",
    "Arial",
    "Verdana",
    "Trebuchet MS",
    "Courier New",
    "Comic Sans MS",
    "Brush Script MT",
    "Impact"
];
