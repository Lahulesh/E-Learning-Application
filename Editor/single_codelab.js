$(document).ready(function() {

    // Calling Our Three Editors ( HTML, CSS, JS )
      var html = document.getElementById("editorHtml");
      var css = document.getElementById("editorCss");
      var js = document.getElementById("editorJs");
      var css_url = $('input[name=css_url]');
      var js_url = $('input[name="js_url"]');
  
      if(html){
          var editorHtml = ace.edit("editorHtml");
          editorHtml.setTheme("ace/theme/monokai");
          editorHtml.session.setMode("ace/mode/html");
          editorHtml.renderer.setScrollMargin(0, 12, 0, 0);
          editorHtml.getSession().setUseWorker(false);  
  
           var htmlCodes = '';
          // Get Value From each Editor
          var textarea = $('textarea[name="editor_html"]');
          editorHtml.getSession().setValue(textarea.val());
          htmlCodes = editorHtml.getValue();
          editorHtml.getSession().on("change", function(){
              change_view();
          });
      }
  
      if(css){
          var editorCss = ace.edit("editorCss");
          editorCss.setTheme("ace/theme/monokai");
          editorCss.session.setMode("ace/mode/css");
          editorCss.renderer.setScrollMargin(0, 12, 0, 0);
          editorCss.getSession().setUseWorker(false);
  
          var cssCodes = '';
          var textarea1 = $('textarea[name="editor_css"]');
          editorCss.getSession().setValue(textarea1.val());
  
          cssCodes = editorCss.getValue();
          editorCss.getSession().on("change", function(){
              change_view();
          });
      }
  
      if(js){
          var editorJs = ace.edit("editorJs");
          editorJs.setTheme("ace/theme/monokai");
          editorJs.getSession().setMode("ace/mode/javascript");
  
          editorJs.setOption("showInvisibles", false);
          var jsCodes = '';
          var textarea2 = $('textarea[name="editor_js"]');
          editorJs.getSession().setValue(textarea2.val());
          jsCodes = editorJs.getValue();
  
          editorJs.getSession().on("change", function(){
              change_view();
          });
      }
  
      function change_view(){
          var iframe  =  document.getElementById("iframe").contentWindow.document,
              iframeDoc = document.getElementById("iframe").contentDocument;
  
          cssCodes = editorCss.getValue();
          if(js){
              jsCodes = editorJs.getValue();
          }
          htmlCodes = editorHtml.getValue();
  
          iframe.open();
          iframe.write(htmlCodes);
          iframe.close();
          
          
          if(css_url){
              if(css_url.length > 1){
                  $('input[name="css_url"]').each(function(){
                      var link = iframeDoc.createElement("link");
                      link.setAttribute("type", "text/css");
                      link.setAttribute("rel", "stylesheet");
                      link.setAttribute("href", $(this).val());
  
                      iframeDoc.head.appendChild(link);
                  });
  
              }else if(css_url.length > 0){
                  var link = iframeDoc.createElement("link");
                  link.setAttribute("type", "text/css");
                  link.setAttribute("rel", "stylesheet");
                  link.setAttribute("href", css_url.val());
  
                  iframeDoc.head.appendChild(link);
              }
          }
          if(css){
              var style = iframeDoc.createElement("style");
              iframeDoc.head.appendChild(style);
              style.textContent = cssCodes;
          }
          if(js_url){
              if(js_url.length > 1){
                  $('input[name="js_url"]').each(function(){
                      var script2 = iframeDoc.createElement("script");
                      script2.setAttribute("type", "text/javascript");
                      script2.setAttribute("src", $(this).val());
  
                      iframeDoc.head.appendChild(script2);
                  });
  
              }else if(js_url.length > 0){
                  var script1 = iframeDoc.createElement("script");
                  script1.setAttribute("type", "text/javascript");
                  script1.setAttribute("src", js_url.val());
  
                  iframeDoc.head.appendChild(script1);
              }
          }
  
          if(js){
              var script = iframeDoc.createElement("script");
              iframeDoc.body.appendChild(script);
              script.textContent = jsCodes;
          }
      }
     // $(window).on('load', function(){
          change_view();
      //});
  
      //expand code view on click
  
      $('.expand').click(function(){
          $(this).siblings(".editor").toggleClass("code_full_view");
          $(this).toggleClass("contract").toggleClass("expand");
          $(this).children('i').toggleClass("icon-resize-full").toggleClass("icon-resize-small");
          editorHtml.resize();
          editorCss.resize();
          editorJs.resize();
      });
  
  
      //change view functions
  
      layout_view();
      $('.left-view').on('click',function(){
          localStorage.setItem("layout_view", "left");
          location.reload();
      });
  
      $('.top-view').on('click',function(){
          localStorage.setItem("layout_view", "top");
          location.reload();
      });
  
      $('.right-view').on('click',function(){
          localStorage.setItem("layout_view", "right");
          location.reload();
      });
  
  
      function layout_view(){
  
          if(localStorage.getItem("layout_view") === null || localStorage.getItem("layout_view") === 'left'){
              $('#view-content, #code-content').addClass('split-horizontal');
              $('#show_htmlCode, #show_cssCode, #show_jsCode').removeClass('split-horizontal');
  
              Split(['#code-content','#view-content'],{
                  sizes: [25, 75],
                  gutterSize: 8,
                  cursor: 'col-resize'
              });
  
              Split(['#show_htmlCode', '#show_cssCode','#show_jsCode'],{
                  direction: 'vertical',
                  gutterSize: 8,
                  cursor: 'row-resize',
                  onDragEnd : function(){
                      editorHtml.resize();
                      editorCss.resize();
                      editorJs.resize();
                  }
              });
  
          }else if(localStorage.getItem("layout_view") === 'top'){
              $('#view-content, #code-content').removeClass('split-horizontal');
              $('#show_htmlCode, #show_cssCode, #show_jsCode').addClass('split-horizontal');
              Split(['#code-content', '#view-content'],{
                  direction: 'vertical',
                  sizes: [50, 50],
                  gutterSize: 8,
                  cursor: 'row-resize'
              });
              Split(['#show_htmlCode', '#show_cssCode','#show_jsCode'],{
                  gutterSize: 8,
                  cursor: 'row-resize',
                  onDragEnd : function(){
                      editorHtml.resize();
                      editorCss.resize();
                      editorJs.resize();
                  }
              });
          }else if(localStorage.getItem("layout_view") === 'right'){
              $('#view-content, #code-content').addClass('split-horizontal');
              $('#show_htmlCode, #show_cssCode, #show_jsCode').removeClass('split-horizontal');
  
              $("#code-content").insertAfter('#view-content');
  
              Split(['#view-content','#code-content'],{
                  sizes: [60, 40],
                  gutterSize: 8,
                  cursor: 'col-resize'
              });
  
              Split(['#show_htmlCode', '#show_cssCode','#show_jsCode'],{
                  direction: 'vertical',
                  gutterSize: 8,
                  cursor: 'row-resize',
                  onDragEnd : function(){
                      editorHtml.resize();
                      editorCss.resize();
                      editorJs.resize();
                  }
              });
  
          }
      }
  
      //get base path
      var origin = window.location.origin;
      var path = window.location.pathname.split( '/' );
      var URL = origin+'/'+path[1]+'/';
  
      //add to favourite on click
  
      $('.fav-codelab').on('click',function (e) {
          e.preventDefault();
          if (!this.hasAttribute("data-user")) {
              window.location.href = URL+'user/login';
          }else{
              var user = $(this).attr('data-user');
              var clicked = $(this);
              if (clicked.hasClass('active')) {
                  var status = '0';
              } else {
                  var status = '1';
              }
              var id = $(this).attr('data-id');
              $.ajax({
                  url: URL+"lab/add-favorites",
                  type: "POST",
                  data: {id: id, user: user, status: status},
                  success: function (data) {
                      if (data == 'true') {
                          window.setTimeout('location.reload()', 100);
                      }
                  }
              });
          }
      });
  });
  