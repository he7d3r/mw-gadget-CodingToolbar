/**
 * Add buttons to editor toolbar for some common snippets of JavaScript code
 * @author: [[User:Helder.wiki]]
 * @tracking: [[Special:GlobalUsage/User:Helder.wiki/Tools/CodingToolbar.js]] ([[File:User:Helder.wiki/Tools/CodingToolbar.js]])
 */
/*jslint browser: true, white: true*/
/*global mediaWiki, jQuery */
( function ( mw , $ ) {
'use strict';
var jsList, apiList;
jsList = {
	closure : {
		label: 'Closure',
		action: {
			type: 'encapsulate',
			options: {
				pre: [
					'/**',
					' *',
					' * @author: [[User:' + mw.config.get( 'wgUserName' ) + ']]',
					' * @tracking: [[Special:GlobalUsage/User:{' +
						'{subst:PAGENAME}}]] ([[File:User:{' +
						'{subst:PAGENAME}}]])',
					' */',
					'/*jslint browser: true, white: true*/',
					'/*global jQuery, mediaWiki */',
					'( function ( mw, $ ) {',
					'\'use strict\';\n\n'
				].join( '\n' ),
				peri: '/* Code here */',
				post: '\n\n}( mediaWiki, jQuery ) );'
			}
		}
	}// ,
	// moreJSButtons: {
	// }
};
apiList = {
	textFromAPI : {
		label: 'Obter texto',
		action: {
			type: 'encapsulate',
			options: {
				pre: [
					'( new mw.Api() ).get( {',
					'\tprop: \'revisions\',',
					'\trvprop: \'content\',',
					'\trvlimit: 1,',
					'\tindexpageids: true,',
					'\ttitles: \'Project:Sandbox\'',
					'} )',
					'.done( function ( data ) {\n\t'
				].join( '\n' ),
				peri: 'console.log( data.query );',
				post: [
					'\n} )',
					'.fail( function ( data ) {',
					'\tconsole.log( data.query );',
					'} );'
				].join( '\n' )
			}
		}
	}// ,
	// moreApiButtons: {
	// }
};

function customizeToolbar() {
	$( '#wpTextbox1' )
	.wikiEditor( 'addToToolbar', {
		'section': 'advanced',
		'groups': {
			'subjects': {
				'label': 'Gadgets',
				'tools': {
					'js-samples': {
						'label': 'JavaScript',
						'type': 'select',
						'list': jsList
					},
					'mw-api-samples': {
						'label': 'API do MW',
						'type': 'select',
						'list': apiList
					}
				}
			}
		}
	} );
}

/* Check if we are in edit mode and the required modules are available and then customize the toolbar */
if ($.inArray(mw.config.get('wgAction'), ['edit', 'submit']) !== -1 && /\.js$/.test( mw.config.get( 'wgTitle' ) )) {
	mw.loader.using( 'user.options', function () {
		if ( mw.user.options.get('usebetatoolbar') ) {
                        mw.loader.using( 'ext.wikiEditor.toolbar', function () {
				$(customizeToolbar);
			} );
		}
	} );
}

}( mediaWiki, jQuery ) );