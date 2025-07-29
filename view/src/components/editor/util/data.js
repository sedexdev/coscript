export const getEditorFunctions = (textEditor) => {
    return {
        boldBtn: function () {
            textEditor.execCommand("Bold", false, null);
        },
        italicBtn: function () {
            textEditor.execCommand("Italic", false, null);
        },
        underlineBtn: function () {
            textEditor.execCommand("Underline", false, null);
        },
        subscriptBtn: function () {
            textEditor.execCommand("Subscript", false, null);
        },
        superScriptBtn: function () {
            textEditor.execCommand("Superscript", false, null);
        },
        strikeBtn: function () {
            textEditor.execCommand("Strikethrough", false, null);
        },
        rmvFormatBtn: function () {
            textEditor.execCommand("RemoveFormat", false, null);
        },
        ulBtn: function () {
            textEditor.execCommand(
                "InsertUnorderedList",
                false,
                `new${Math.round(Math.random() * 1000)}`
            );
        },
        oltBtn: function () {
            textEditor.execCommand(
                "InsertOrderedList",
                false,
                `new${Math.round(Math.random() * 1000)}`
            );
        },
        leftAlignBtn: function () {
            textEditor.execCommand("JustifyLeft", false, "");
        },
        centerAlignBtn: function () {
            textEditor.execCommand("JustifyCenter", false, null);
        },
        rightAlignBtn: function () {
            textEditor.execCommand("JustifyRight", false, null);
        },
        justifyAlignBtn: function () {
            textEditor.execCommand("JustifyFull", false, null);
        },
        undoBtn: function () {
            textEditor.execCommand("Undo", false, null);
        },
        redoBtn: function () {
            textEditor.execCommand("Redo", false, null);
        },
        linkBtn: function () {
            const url = prompt("Enter the link url", "http://");
            if (url !== null) {
                textEditor.execCommand("CreateLink", false, url);
            }
        },
        unlinkBtn: function () {
            textEditor.execCommand("Unlink", false, null);
        },
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
    "unlinkBtn",
];

export const icons = [
    {
        title: "Bold",
        icon: require("../../../../src/img/icons/bold.svg"),
    },
    {
        title: "Italic",
        icon: require("../../../../src/img/icons/italic.svg"),
    },
    {
        title: "Underline",
        icon: require("../../../../src/img/icons/underline.svg"),
    },
    {
        title: "Subscript",
        icon: require("../../../../src/img/icons/subscript.svg"),
    },
    {
        title: "Superscript",
        icon: require("../../../../src/img/icons/superscript.svg"),
    },
    {
        title: "Strikethrough",
        icon: require("../../../../src/img/icons/strikethrough.svg"),
    },
    {
        title: "Remove Format",
        icon: require("../../../../src/img/icons/remove-format.svg"),
    },
    {
        title: "Unordered List",
        icon: require("../../../../src/img/icons/list-ul.svg"),
    },
    {
        title: "Ordered List",
        icon: require("../../../../src/img/icons/list-ol.svg"),
    },
    {
        title: "Align Left",
        icon: require("../../../../src/img/icons/align-left.svg"),
    },
    {
        title: "Align Center",
        icon: require("../../../../src/img/icons/align-center.svg"),
    },
    {
        title: "Align Right",
        icon: require("../../../../src/img/icons/align-right.svg"),
    },
    {
        title: "Align Justify",
        icon: require("../../../../src/img/icons/align-justify.svg"),
    },
    {
        title: "Undo",
        icon: require("../../../../src/img/icons/undo.svg"),
    },
    {
        title: "Redo",
        icon: require("../../../../src/img/icons/redo.svg"),
    },
    {
        title: "Link",
        icon: require("../../../../src/img/icons/link.svg"),
    },
    {
        title: "Unlink",
        icon: require("../../../../src/img/icons/unlink.svg"),
    },
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
    "Impact",
];
