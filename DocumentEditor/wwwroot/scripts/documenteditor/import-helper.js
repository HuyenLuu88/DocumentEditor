//Documentloader Implementation starts
function loadDefault(defaultDocument) {
    documenteditor.open(JSON.stringify(defaultDocument));
}

function loadFile(path) {
    var baseUrl = window.baseurl + 'api/documenteditor/import';
    var httpRequest = new XMLHttpRequest();
    httpRequest.open('POST', baseUrl, true);
    var waitingPopUp = document.getElementById('waiting-popup');
    var inActiveDiv = document.getElementById('popup-overlay');
    documenteditor.isReadOnly = true;
    waitingPopUp.style.display = 'block';
    inActiveDiv.style.display = 'block';
    httpRequest.onreadystatechange = function () {
        if (httpRequest.readyState === 4) {
            if (httpRequest.status === 200 || httpRequest.status === 304) {
                documenteditor.open(httpRequest.responseText);
                documenteditor.isReadOnly = false;
                waitingPopUp.style.display = 'none';
                inActiveDiv.style.display = 'none';
            }
            else {
                waitingPopUp.style.display = 'none';
                inActiveDiv.style.display = 'none';
                documenteditor.isReadOnly = false;
                console.error(httpRequest.response);
            }
        }
    };

    var formData = new FormData();
    formData.append('files', path);
    documenteditor.documentName = path.name.substr(0, path.name.lastIndexOf('.'));
    httpRequest.send(formData);
}

function initComponentAndWireEvent(isRtl) {

    initializeTitleBar(true, isRtl);
    wireEventsInTitleBar();

    openURL();
}
//Documentloader implementation ends


// Title Bar Sample starts 
var documentTitle;
var documentTitleContentEditor;
var titleBarDiv;
var print;
var openBtn;
var download;
var isPropertiesPaneEnabled;
function initializeTitleBar(isShareNeeded, isRtl) {
    if (!isRtl) {
        downloadText = 'Download';
        downloadToolTip = 'Download this document.';
        printText = 'Print';
        printToolTip = 'Print this document (Ctrl+P).';
        openText = 'Open';
        documentTileText = 'Document Name. Click or tap to rename this document.';
        saveURLText = 'Save';
        saveURLTitleText = 'Save document to URL';
        openURLText = 'Open';
        openURLTitleText = 'Open document from URL';
    }
    else {
        downloadText = 'تحميل';
        downloadToolTip = 'تحميل هذا المستند';
        printText = 'طباعه';
        printToolTip = 'طباعه هذا المستند (Ctrl + P)';
        openText = 'فتح';
        documentTileText = 'اسم المستند. انقر أو اضغط لأعاده تسميه هذا المستند';
    }
    documentTitle = ej.base.createElement('label', { id: 'documenteditor_title_name', styles: 'font-weight:400;text-overflow:ellipsis;white-space:pre;overflow:hidden;user-select:none;cursor:text' });
    var iconCss = 'e-de-padding-right';
    var btnFloatStyle = 'float:right;';
    var titleCss = '';
    if (isRtl) {
        iconCss = 'e-de-padding-right-rtl';
        btnFloatStyle = 'float:left;';
        titleCss = 'float:right;';
    }
    documentTitleContentEditor = ej.base.createElement('div', { id: 'documenteditor_title_contentEditor', className: 'single-line', styles: titleCss });
    documentTitleContentEditor.appendChild(documentTitle);
    titleBarDiv.appendChild(documentTitleContentEditor);
    documentTitleContentEditor.setAttribute('title', documentTileText);
    var btnStyles = btnFloatStyle + 'background: transparent;box-shadow:none; font-family: inherit;border-color: transparent;' +
        'border-radius: 2px;color:inherit;font-size:12px;text-transform:capitalize;margin-top:4px;height:28px;font-weight:400';
    print = addButton('e-de-icon-Print ' + iconCss, printText, btnStyles, 'de-print', printToolTip, false);
    openBtn = addButton('e-de-icon-Open ' + iconCss, openText, btnStyles, 'de-open', openText, false);
    var items = [
        { text: 'Microsoft Word (.docx)', id: 'word' },
        { text: 'Syncfusion Document Text (.sfdt)', id: 'sfdt' },
    ];
    //Open and Save button
    //saveURLBtn = addButton('e-de-icon-Download ' + iconCss, saveURLText, btnStyles, 'de-save-url', saveURLTitleText, false);
    //openURLBtn = addButton('e-de-icon-Print ' + iconCss, openURLText, btnStyles, 'de-open-url', openURLTitleText, false);
    download = addButton('e-de-icon-Download ' + iconCss, downloadText, btnStyles, 'documenteditor-share', downloadToolTip, true, items);
    if (!isShareNeeded) {
        download.element.style.display = 'none';
    }
    else {
        openBtn.element.style.display = 'none';
    }
    download.element.style.display = 'none';
    print.element.style.display = 'none';
}
function wireEventsInTitleBar() {
    print.element.addEventListener('click', onPrint);
    openBtn.element.addEventListener('click', function (e) {
        if (e.target.id === 'de-open') {
            var fileUpload = document.getElementById('uploadfileButton');
            fileUpload.value = '';
            fileUpload.click();
        }
    });
    //openURLBtn.element.addEventListener('click', openURL)
    //saveURLBtn.element.addEventListener('click', saveURL)
    documentTitleContentEditor.addEventListener('keydown', function (e) {
        if (e.keyCode === 13) {
            e.preventDefault();
            documentTitleContentEditor.contentEditable = 'false';
            if (documentTitleContentEditor.textContent === '') {
                documentTitleContentEditor.textContent = 'Document1';
            }
        }
    });
    documentTitleContentEditor.addEventListener('blur', function () {
        if (documentTitleContentEditor.textContent === '') {
            documentTitleContentEditor.textContent = 'Document1';
        }
        documentTitleContentEditor.contentEditable = 'false';
        documenteditor.documentName = documentTitle.textContent;
    });
    documentTitleContentEditor.addEventListener('click', function () {
        updateDocumentEditorTitle();
    });
}
function updateDocumentEditorTitle() {
    documentTitleContentEditor.contentEditable = 'true';
    documentTitleContentEditor.focus();
    window.getSelection().selectAllChildren(documentTitleContentEditor);
}
function updateDocumentTitle() {
    if (documenteditor.documentName === '') {
        documenteditor.documentName = 'Untitled';
    }
    documentTitle.textContent = documenteditor.documentName;
}
function onPrint() {
    var documentContainer = document.getElementById("container").ej2_instances[0];
    if (documentContainer.documentEditor !== undefined) {
        documentContainer.documentEditor.print();
    } else {
        documentContainer.print();
    }
}
function openURL() {
    var documentContainer = document.getElementById("container").ej2_instances[0];    
    let http = new XMLHttpRequest();
    //add your url in which you want to open document inside the ""
    let content = { fileUrl: url };
    let baseUrl = window.baseurl + "/api/documenteditor/ImportFileURL";
    http.open("POST", baseUrl, true);
    http.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    http.setRequestHeader("Access-Control-Allow-Headers", "*");
    http.setRequestHeader("Access-Control-Allow-Origin", "*");
    http.onreadystatechange = () => {
        if (http.readyState === 4) {
            if (http.status === 200 || http.status === 304) {
                //open the SFDT text in Document Editor
                console.log("Result", http.responseText);
                let result = http.responseText;
                if (result == '') {
                    let sfdt = { "sections": [{ "sectionFormat": { "pageWidth": 612, "pageHeight": 792, "leftMargin": 72, "rightMargin": 72, "topMargin": 72, "bottomMargin": 72, "differentFirstPage": false, "differentOddAndEvenPages": false, "headerDistance": 36, "footerDistance": 36, "bidi": false }, "blocks": [{ "paragraphFormat": { "styleName": "Normal", "listFormat": {} }, "characterFormat": { "fontSize": "18", "fontFamily": "Georgia", "bidi": false, "fontSizeBidi": "18", "fontFamilyBidi": "Georgia" }, "inlines": [{ "characterFormat": { "fontSize": "18", "fontFamily": "Georgia", "bidi": false, "fontSizeBidi": "18", "fontFamilyBidi": "Georgia" }, "text": "Return Value cannot null" }] }, { "paragraphFormat": { "styleName": "Normal", "listFormat": {} }, "characterFormat": { "fontSize": "18", "fontFamily": "Georgia", "bidi": false, "fontSizeBidi": "18", "fontFamilyBidi": "Georgia" }, "inlines": [] }, { "paragraphFormat": { "styleName": "Normal", "listFormat": {} }, "characterFormat": { "fontSize": "18", "fontFamily": "Georgia", "fontSizeBidi": "18", "fontFamilyBidi": "Georgia" }, "inlines": [{ "characterFormat": { "fontSize": "18", "fontFamily": "Georgia", "bidi": false, "fontSizeBidi": "18", "fontFamilyBidi": "Georgia" }, "text": "Please check remote server url" }] }], "headersFooters": { "header": { "blocks": [{ "paragraphFormat": { "listFormat": {} }, "characterFormat": {}, "inlines": [] }] }, "footer": { "blocks": [{ "paragraphFormat": { "listFormat": {} }, "characterFormat": {}, "inlines": [] }] }, "evenHeader": {}, "evenFooter": {}, "firstPageHeader": {}, "firstPageFooter": {} } }], "characterFormat": { "bold": false, "italic": false, "fontSize": 11, "fontFamily": "Calibri", "underline": "None", "strikethrough": "None", "baselineAlignment": "Normal", "highlightColor": "NoColor", "fontColor": "#00000000", "boldBidi": false, "italicBidi": false, "fontSizeBidi": 11, "fontFamilyBidi": "Calibri", "allCaps": false }, "paragraphFormat": { "leftIndent": 0, "rightIndent": 0, "firstLineIndent": 0, "textAlignment": "Left", "beforeSpacing": 0, "afterSpacing": 0, "lineSpacing": 1, "lineSpacingType": "Multiple", "listFormat": {}, "bidi": false, "keepLinesTogether": false, "keepWithNext": false, "widowControl": true }, "defaultTabWidth": 36, "trackChanges": false, "enforcement": false, "hashValue": "", "saltValue": "", "formatting": false, "protectionType": "NoProtection", "dontUseHTMLParagraphAutoSpacing": false, "formFieldShading": true, "compatibilityMode": "Word2013", "styles": [{ "name": "Normal", "type": "Paragraph", "paragraphFormat": { "listFormat": {} }, "characterFormat": {}, "next": "Normal" }, { "name": "Heading 1", "type": "Paragraph", "paragraphFormat": { "leftIndent": 0, "rightIndent": 0, "firstLineIndent": 0, "textAlignment": "Left", "beforeSpacing": 12, "afterSpacing": 0, "lineSpacing": 1.0791666507720947, "lineSpacingType": "Multiple", "outlineLevel": "Level1", "listFormat": {} }, "characterFormat": { "fontSize": 16, "fontFamily": "Calibri Light", "fontColor": "#2F5496", "fontSizeBidi": 16, "fontFamilyBidi": "Calibri Light" }, "basedOn": "Normal", "link": "Heading 1 Char", "next": "Normal" }, { "name": "Heading 1 Char", "type": "Character", "characterFormat": { "fontSize": 16, "fontFamily": "Calibri Light", "fontColor": "#2F5496", "fontSizeBidi": 16, "fontFamilyBidi": "Calibri Light" }, "basedOn": "Default Paragraph Font" }, { "name": "Default Paragraph Font", "type": "Character", "characterFormat": {} }, { "name": "Heading 2", "type": "Paragraph", "paragraphFormat": { "leftIndent": 0, "rightIndent": 0, "firstLineIndent": 0, "textAlignment": "Left", "beforeSpacing": 2, "afterSpacing": 0, "lineSpacing": 1.0791666507720947, "lineSpacingType": "Multiple", "outlineLevel": "Level2", "listFormat": {} }, "characterFormat": { "fontSize": 13, "fontFamily": "Calibri Light", "fontColor": "#2F5496", "fontSizeBidi": 13, "fontFamilyBidi": "Calibri Light" }, "basedOn": "Normal", "link": "Heading 2 Char", "next": "Normal" }, { "name": "Heading 2 Char", "type": "Character", "characterFormat": { "fontSize": 13, "fontFamily": "Calibri Light", "fontColor": "#2F5496", "fontSizeBidi": 13, "fontFamilyBidi": "Calibri Light" }, "basedOn": "Default Paragraph Font" }, { "name": "Heading 3", "type": "Paragraph", "paragraphFormat": { "leftIndent": 0, "rightIndent": 0, "firstLineIndent": 0, "textAlignment": "Left", "beforeSpacing": 2, "afterSpacing": 0, "lineSpacing": 1.0791666507720947, "lineSpacingType": "Multiple", "outlineLevel": "Level3", "listFormat": {} }, "characterFormat": { "fontSize": 12, "fontFamily": "Calibri Light", "fontColor": "#1F3763", "fontSizeBidi": 12, "fontFamilyBidi": "Calibri Light" }, "basedOn": "Normal", "link": "Heading 3 Char", "next": "Normal" }, { "name": "Heading 3 Char", "type": "Character", "characterFormat": { "fontSize": 12, "fontFamily": "Calibri Light", "fontColor": "#1F3763", "fontSizeBidi": 12, "fontFamilyBidi": "Calibri Light" }, "basedOn": "Default Paragraph Font" }, { "name": "Heading 4", "type": "Paragraph", "paragraphFormat": { "leftIndent": 0, "rightIndent": 0, "firstLineIndent": 0, "textAlignment": "Left", "beforeSpacing": 2, "afterSpacing": 0, "lineSpacing": 1.0791666507720947, "lineSpacingType": "Multiple", "outlineLevel": "Level4", "listFormat": {} }, "characterFormat": { "italic": true, "fontFamily": "Calibri Light", "fontColor": "#2F5496", "italicBidi": true, "fontFamilyBidi": "Calibri Light" }, "basedOn": "Normal", "link": "Heading 4 Char", "next": "Normal" }, { "name": "Heading 4 Char", "type": "Character", "characterFormat": { "italic": true, "fontFamily": "Calibri Light", "fontColor": "#2F5496", "italicBidi": true, "fontFamilyBidi": "Calibri Light" }, "basedOn": "Default Paragraph Font" }, { "name": "Heading 5", "type": "Paragraph", "paragraphFormat": { "leftIndent": 0, "rightIndent": 0, "firstLineIndent": 0, "textAlignment": "Left", "beforeSpacing": 2, "afterSpacing": 0, "lineSpacing": 1.0791666507720947, "lineSpacingType": "Multiple", "outlineLevel": "Level5", "listFormat": {} }, "characterFormat": { "fontFamily": "Calibri Light", "fontColor": "#2F5496", "fontFamilyBidi": "Calibri Light" }, "basedOn": "Normal", "link": "Heading 5 Char", "next": "Normal" }, { "name": "Heading 5 Char", "type": "Character", "characterFormat": { "fontFamily": "Calibri Light", "fontColor": "#2F5496", "fontFamilyBidi": "Calibri Light" }, "basedOn": "Default Paragraph Font" }, { "name": "Heading 6", "type": "Paragraph", "paragraphFormat": { "leftIndent": 0, "rightIndent": 0, "firstLineIndent": 0, "textAlignment": "Left", "beforeSpacing": 2, "afterSpacing": 0, "lineSpacing": 1.0791666507720947, "lineSpacingType": "Multiple", "outlineLevel": "Level6", "listFormat": {} }, "characterFormat": { "fontFamily": "Calibri Light", "fontColor": "#1F3763", "fontFamilyBidi": "Calibri Light" }, "basedOn": "Normal", "link": "Heading 6 Char", "next": "Normal" }, { "name": "Heading 6 Char", "type": "Character", "characterFormat": { "fontFamily": "Calibri Light", "fontColor": "#1F3763", "fontFamilyBidi": "Calibri Light" }, "basedOn": "Default Paragraph Font" }], "lists": [], "abstractLists": [], "comments": [], "revisions": [], "customXml": [] }
                    documentContainer.documentEditor.open(sfdt);
                    documentContainer.documentEditor.isReadOnly = false;
                }
                else {
                    documentContainer.documentEditor.open(result);
                    documentContainer.documentEditor.isReadOnly = false;
                }                
            }
        }
    };
    http.send(JSON.stringify(content));
}
function saveURL() {
    var documentContainer = document.getElementById("container").ej2_instances[0];
    let http = new XMLHttpRequest();
    // Replace your running web service Url here
    http.open('POST', '/api/documenteditor/saveURL');
    http.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    http.responseType = 'json';
    //Serialize document content as SFDT.
    let sfdt = { content: documentContainer.documentEditor.serialize() };
    //Send the sfdt content to server side.
    http.send(JSON.stringify(sfdt));
}
function onExportClick(args) {
    var value = args.item.id;
    switch (value) {
        case 'word':
            save('Docx');
            break;
        case 'sfdt':
            save('Sfdt');
            break;
    }
}
function save(format) {
    var editor = document.getElementById("container").ej2_instances[0].documentEditor;
    editor.save(editor.documentName === '' ? 'sample' : editor.documentName, format);
}
function setTooltipForPopup() {
    document.getElementById('documenteditor-share-popup').querySelectorAll('li')[0].setAttribute('title', 'Download a copy of this document to your computer as a DOCX file.');
    document.getElementById('documenteditor-share-popup').querySelectorAll('li')[1].setAttribute('title', 'Download a copy of this document to your computer as an SFDT file.');
}
function addButton(iconClass, btnText, styles, id, tooltipText, isDropDown, items) {
    var button = ej.base.createElement('button', { id: id, styles: styles });
    titleBarDiv.appendChild(button);
    button.setAttribute('title', tooltipText);
    if (isDropDown) {
        var dropButton = new ej.splitbuttons.DropDownButton({ select: onExportClick, items: items, iconCss: iconClass, cssClass: 'e-caret-hide', content: btnText, open: function () { setTooltipForPopup(); } }, button);
        return dropButton;
    }
    else {
        var ejButton = new ej.buttons.Button({ iconCss: iconClass, content: btnText }, button);
        return ejButton;
    }
}

// Title Bar Implementation Ends 

//StatusBar implemenatation starts
var startPage = 1;
var statusBarDiv;
var pageNumberLabel;
var editablePageNumber;
var pageCount;
var zoom;
var editorPageCount;
function initializeStatusBar() {
    var label = ej.base.createElement('label', { styles: 'margin-top: 6px;margin-right: 2px' });
    label.textContent = 'Page ';
    statusBarDiv.appendChild(label);
    pageNumberLabel = ej.base.createElement('label', { id: 'documenteditor_page_no', styles: 'text-transform:capitalize;white-space:pre;overflow:hidden;user-select:none;cursor:text;height:17px;max-width:150px' });
    editablePageNumber = ej.base.createElement('div', { id: 'editablePageNumber', styles: 'border: 1px solid #F1F1F1;display: inline-flex;height: 17px;padding: 0px 4px;', className: 'single-line e-de-pagenumber-text' });
    editablePageNumber.appendChild(pageNumberLabel);
    updatePageNumber();
    statusBarDiv.appendChild(editablePageNumber);
    editablePageNumber.setAttribute('title', 'The current page number in the document. Click or tap to navigate specific page.');
    var label1 = ej.base.createElement('label', { styles: 'margin-left:2px;letter-spacing: 1.05px;' });
    label1.textContent = 'of';
    statusBarDiv.appendChild(label1);
    pageCount = ej.base.createElement('label', { id: 'documenteditor_pagecount', styles: 'margin-left:6px;letter-spacing: 1.05px;' });
    statusBarDiv.appendChild(pageCount);
    updatePageCount();
    var zoomBtn = ej.base.createElement('button', {
        id: 'documenteditor-zoom',
        className: 'e-de-statusbar-zoom'
    });
    statusBarDiv.appendChild(zoomBtn);
    zoomBtn.setAttribute('title', 'Zoom level. Click or tap to open the Zoom options.');
    var items = [
        {
            text: '200%',
        },
        {
            text: '175%',
        },
        {
            text: '150%',
        },
        {
            text: '125%',
        },
        {
            text: '100%',
        },
        {
            text: '75%',
        },
        {
            text: '50%',
        },
        {
            text: '25%',
        },
        {
            separator: true
        },
        {
            text: 'Fit one page'
        },
        {
            text: 'Fit page width',
        },
    ];
    zoom = new ej.splitbuttons.DropDownButton({ content: '100%', items: items, select: onZoom }, zoomBtn);
}
function onZoom(args) {
    setZoomValue(args.item.text);
    updateZoomContent();
}
function updateZoomContent() {
    zoom.content = Math.round(documenteditor.zoomFactor * 100) + '%';
}
function setZoomValue(text) {
    if (text.match('Fit one page')) {
        documenteditor.fitPage('FitOnePage');
    }
    else if (text.match('Fit page width')) {
        documenteditor.fitPage('FitPageWidth');
    }
    else {
        documenteditor.zoomFactor = parseInt(text, 0) / 100;
    }
}
function updatePageCount() {
    editorPageCount = documenteditor.pageCount;
    pageCount.textContent = editorPageCount.toString();
}
function updatePageNumber() {
    startPage = startPage === undefined ? documenteditor.selection.startPage : startPage;
    pageNumberLabel.textContent = startPage.toString();
}
function updatePageNumberOnViewChange(args) {
    if (documenteditor.selection &&
        documenteditor.selection.startPage >= args.startPage && documenteditor.selection.startPage <= args.endPage) {
        startPage = documenteditor.selection.startPage;
    }
    else {
        startPage = args.startPage;
    }
    updatePageNumber();
}
function wireEventsInStatusbar() {
    editablePageNumber.addEventListener('keydown', function (e) {
        if (e.which === 13) {
            e.preventDefault();
            var pageNumber = parseInt(editablePageNumber.textContent, 0);
            if (pageNumber > editorPageCount) {
                updatePageNumber();
            }
            else {
                documenteditor.scrollToPage(parseInt(editablePageNumber.textContent, 0));
            }
            editablePageNumber.contentEditable = 'false';
            if (editablePageNumber.textContent === '') {
                updatePageNumber();
            }
        }
        if (e.which > 64) {
            e.preventDefault();
        }
    });
    editablePageNumber.addEventListener('blur', function () {
        if (editablePageNumber.textContent === '' || parseInt(editablePageNumber.textContent, 0) > editorPageCount) {
            updatePageNumber();
        }
        editablePageNumber.contentEditable = 'false';
    });
    editablePageNumber.addEventListener('click', function () {
        updateDocumentEditorPageNumber();
    });
}
function updateDocumentEditorPageNumber() {
    editablePageNumber.contentEditable = 'true';
    editablePageNumber.focus();
    window.getSelection().selectAllChildren(editablePageNumber);
}

//StatusBar implemenatation ends