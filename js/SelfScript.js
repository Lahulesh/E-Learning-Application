var anchordiv = ["CSSIntroductionanchor", "Implementationanchor", "CSSSyntaxanchor","CSSCommentsanchor","CSSColouranchor","CSSBackgroundanchor","CSSBorderanchor","Marginanchor","CSSPaddinganchor","CSSBoxModelanchor","CSSHeightanchor",
"CSSWidthanchor","CSSPositionanchor","CSSFontsanchor","CSSIconsanchor","CSSOutlineanchor",
"CSSDisplayanchor","CSSZindexanchor","CSSOverflowanchor","CSSFloatanchor","CSSOpacityanchor"];

var divs = ["CSSIntroduction", "Implementation", "CSSSyntax","CSSComments","CSSColour","CSSBackground","CSSBorder","CSSMargin","CSSPadding","CSSBoxModel","CSSHeight",
"CSSWidth","CSSPosition","CSSFonts","CSSIcons","CSSOutline","CSSDisplay","CSSZindex",
"CSSOverflow","CSSFloat","CSSOpacity"];

var visibleDivId = null;

function divVisibility(divId) {
  if (visibleDivId === divId) {
    visibleDivId = null;
  } else {
    visibleDivId = divId;
  }        
  topFunction();
  hideNonVisibleDivs();        
}

function hideNonVisibleDivs() {
  var i, divId, div;
  for (i = 0; i < divs.length; i++) {
    divId = divs[i];
    //div = document.getElementById(divId);
    document.getElementById(visibleDivId).scroll({top:0,behavior:'smooth'});
    if (visibleDivId === divId) {
      document.getElementById(divId).style.display = "block";
    } else {
      document.getElementById(divId).style.display = "none";
    }
  }
}
function topFunction() {
  document.body.scrollTop = 160;
  document.documentElement.scrollTop = 160;
}
function toggleItem(elem) {
  for (var i = 0; i < elem.length; i++) {
    elem[i].addEventListener("click", function(e) {
      var current = this;
      for (var i = 0; i < elem.length; i++) {
        if (current != elem[i]) {
          elem[i].classList.remove("active");
        } else if (current.classList.contains("active") === true) {
          current.classList.remove("active");
        } else {
          current.classList.add("active");
        }
      }
      e.preventDefault();
    });
  }
}
toggleItem(document.querySelectorAll(".link"));