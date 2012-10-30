/* This Source Code Form is subject to the terms of the MIT license
 * If a copy of the MIT license was not distributed with this file, you can
 * obtain one at https://raw.github.com/mozilla/butter/master/LICENSE */

define([ "ui/widget/tooltip" ], function( Tooltip ) {

  return function( editorAreaDOMRoot, editorModule ) {
    var _mediaButton = editorAreaDOMRoot.querySelector( ".butter-editor-header-media" ),
        _popcornButton = editorAreaDOMRoot.querySelector( ".butter-editor-header-popcorn" ),
        _shareButton = editorAreaDOMRoot.querySelector( ".butter-editor-header-share" ),
        _loginToShareTooltip;

    var _focusMap = {
      "media-properties": _mediaButton,
      "plugin-list": _popcornButton,
      "share-properties": _shareButton
    };

    var _currentFocus;

    // Create a message for the disabled share editor.
    _loginToShareTooltip = Tooltip.create({
      title: "login-to-share",
      message: "Login and Save your project to share",
      element: _shareButton,
      top: "60px"
    });

    _mediaButton.addEventListener( "click", function( e ) {
      editorModule.openEditor( "media-editor" );
    }, false );

    _popcornButton.addEventListener( "click", function( e ) {
      editorModule.openEditor( "plugin-list" );
    }, false );

    function openShareEditor() {
      editorModule.openEditor( "share-properties" );
    }

    this.setFocus = function( editorName ) {
      var focusCandidate = _focusMap[ editorName ];
      if ( _currentFocus ) {
        _currentFocus.classList.remove( "butter-active" );
      }
      if ( focusCandidate ) {
        focusCandidate.classList.add( "butter-active" );
        _currentFocus = focusCandidate;
      }
    };

    this.views = {
      unSaved: function() {
        _loginToShareTooltip.classList.remove( "tooltip-off" );
        _shareButton.classList.add( "butter-editor-btn-disabled" );
        _shareButton.removeEventListener( "click", openShareEditor, false );
        // If the share editor is open, open the media editor instead.
        if ( _currentFocus === _shareButton ) {
          editorModule.openEditor( "media-editor" );
        }
      },
      saved: function() {
        _loginToShareTooltip.classList.add( "tooltip-off" );
        _shareButton.classList.remove( "butter-editor-btn-disabled" );
        _shareButton.addEventListener( "click", openShareEditor, false );
      }
    };

  };

});
