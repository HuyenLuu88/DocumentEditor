#pragma checksum "D:\Work\C#\Work\WordService\DocumentEditor\DocumentEditor\Views\Home\Index.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "a77f8678608399deb3c8be828632eed078170689"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Views_Home_Index), @"mvc.1.0.view", @"/Views/Home/Index.cshtml")]
namespace AspNetCore
{
    #line hidden
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Mvc.Rendering;
    using Microsoft.AspNetCore.Mvc.ViewFeatures;
#nullable restore
#line 1 "D:\Work\C#\Work\WordService\DocumentEditor\DocumentEditor\Views\_ViewImports.cshtml"
using DocumentEditor;

#line default
#line hidden
#nullable disable
#nullable restore
#line 2 "D:\Work\C#\Work\WordService\DocumentEditor\DocumentEditor\Views\_ViewImports.cshtml"
using DocumentEditor.Models;

#line default
#line hidden
#nullable disable
#nullable restore
#line 1 "D:\Work\C#\Work\WordService\DocumentEditor\DocumentEditor\Views\Home\Index.cshtml"
using Syncfusion.EJ2;

#line default
#line hidden
#nullable disable
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"a77f8678608399deb3c8be828632eed078170689", @"/Views/Home/Index.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"d0c138f7b47855c2fdaafa0ca8a69ed48edf1252", @"/Views/_ViewImports.cshtml")]
    public class Views_Home_Index : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_0 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("id", "container", global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_1 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("height", "890px", global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        #line hidden
        #pragma warning disable 0649
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperExecutionContext __tagHelperExecutionContext;
        #pragma warning restore 0649
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperRunner __tagHelperRunner = new global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperRunner();
        #pragma warning disable 0169
        private string __tagHelperStringValueBuffer;
        #pragma warning restore 0169
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager __backed__tagHelperScopeManager = null;
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager __tagHelperScopeManager
        {
            get
            {
                if (__backed__tagHelperScopeManager == null)
                {
                    __backed__tagHelperScopeManager = new global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager(StartTagHelperWritingScope, EndTagHelperWritingScope);
                }
                return __backed__tagHelperScopeManager;
            }
        }
        private global::Syncfusion.EJ2.DocumentEditor.DocumentEditorContainer __Syncfusion_EJ2_DocumentEditor_DocumentEditorContainer;
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            WriteLiteral("\r\n<div class=\"control-section\">\r\n    <div id=\'documenteditor_titlebar\' class=\"e-de-ctn-title\"></div>\r\n    ");
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("ejs-documenteditorcontainer", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "a77f8678608399deb3c8be828632eed0781706893976", async() => {
            }
            );
            __Syncfusion_EJ2_DocumentEditor_DocumentEditorContainer = CreateTagHelper<global::Syncfusion.EJ2.DocumentEditor.DocumentEditorContainer>();
            __tagHelperExecutionContext.Add(__Syncfusion_EJ2_DocumentEditor_DocumentEditorContainer);
            __Syncfusion_EJ2_DocumentEditor_DocumentEditorContainer.Id = (string)__tagHelperAttribute_0.Value;
            __tagHelperExecutionContext.AddTagHelperAttribute(__tagHelperAttribute_0);
#nullable restore
#line 5 "D:\Work\C#\Work\WordService\DocumentEditor\DocumentEditor\Views\Home\Index.cshtml"
__Syncfusion_EJ2_DocumentEditor_DocumentEditorContainer.EnableToolbar = true;

#line default
#line hidden
#nullable disable
            __tagHelperExecutionContext.AddTagHelperAttribute("enableToolbar", __Syncfusion_EJ2_DocumentEditor_DocumentEditorContainer.EnableToolbar, global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
            __Syncfusion_EJ2_DocumentEditor_DocumentEditorContainer.Height = (string)__tagHelperAttribute_1.Value;
            __tagHelperExecutionContext.AddTagHelperAttribute(__tagHelperAttribute_1);
            await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
            if (!__tagHelperExecutionContext.Output.IsContentModified)
            {
                await __tagHelperExecutionContext.SetOutputContentAsync();
            }
            Write(__tagHelperExecutionContext.Output);
            __tagHelperExecutionContext = __tagHelperScopeManager.End();
            WriteLiteral(@"
</div>
<style>
    #documenteditor_titlebar {
        height: 36px;
        line-height: 26px;
        width: 100%;
        font-size: 12px;
        padding-left: 15px;
        padding-right: 10px;
        font-family: inherit;
    }

    #documenteditor_title_contentEditor {
        height: 26px;
        max-width: 85%;
        width: auto;
        overflow: hidden;
        display: inline-block;
        padding-left: 4px;
        padding-right: 4px;
        margin: 5px;
    }

    .single-line {
        cursor: text !important;
        outline: none;
    }

        .single-line:hover {
            border-color: #e4e4e4 !important;
        }

    [contenteditable=""true""].single-line {
        white-space: nowrap;
        border-color: #e4e4e4 !important;
    }
    /** Document editor sample level font icons*/
    ");
            WriteLiteral(@"@font-face {
        font-family: 'Sample brower icons';
        font-weight: normal;
        font-style: normal;
    }

    [class^=""e-de-icon-""],
    [class*="" e-de-icon-""] {
        font-family: 'Sample brower icons' !important;
    }

    .e-de-icon-Print:before {
        content: ""\e723"";
    }

    .e-de-icon-Download:before {
        content: ""\e728"";
    }
    /** sample level font icons ends*/
</style>

<script>
    var documenteditor;
    window.baseurl = window.location.origin;
    var url = 'https://view.officeapps.live.com/op/view.aspx?src=https://storage.totalflow.uk/3bfdf1a4-46b8-43a2-8752-415f98be4d70/829c93e5-f7e2-43aa-87bf-57b0e4c3f43d/eb27f940-14ec-4710-ae3f-0d2322c73ee8.docx';
    document.addEventListener('DOMContentLoaded', function () {

        var documenteditorElement = document.getElementById(""container"");
        var container = documenteditorElement.ej2_instances[0];
        container.showPropertiesPane = true;
        documenteditor = container.docum");
            WriteLiteral(@"entEditor;
        documenteditorElement.ej2_instances[0].serviceUrl = window.baseurl + '/api/documenteditor/';
        documenteditor.serviceUrl = window.baseurl + '/api/documenteditor/';
        documenteditor.documentName = 'Default';
        container.documentChange = function (args) {
            updateDocumentTitle();
        };
        titleBarDiv = document.getElementById('documenteditor_titlebar');
        initComponentAndWireEvent();
    });
</script>");
        }
        #pragma warning restore 1998
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.ViewFeatures.IModelExpressionProvider ModelExpressionProvider { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IUrlHelper Url { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IViewComponentHelper Component { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IJsonHelper Json { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IHtmlHelper<dynamic> Html { get; private set; }
    }
}
#pragma warning restore 1591
