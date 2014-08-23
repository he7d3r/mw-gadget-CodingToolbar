/**
 * Add buttons to editor toolbar for some common snippets of JavaScript code
 * @author: Helder (https://github.com/he7d3r)
 * @license: CC BY-SA 3.0 <https://creativecommons.org/licenses/by-sa/3.0/>
 * @tracking: [[Special:GlobalUsage/User:Helder.wiki/Tools/CodingToolbar.js]] ([[File:User:Helder.wiki/Tools/CodingToolbar.js]])
 */
/*jshint browser: true, camelcase: true, curly: true, eqeqeq: true, immed: true, latedef: true, newcap: true, noarg: true, noempty: true, nonew: true, quotmark: true, undef: true, unused: true, strict: true, trailing: true, maxlen: 120, evil: true, onevar: true */
/*global jQuery, mediaWiki */
( function ( mw, $ ) {
'use strict';

var jsList, mwList;
jsList = {
	loopOverList : {
		label: 'Loop sobre uma lista',
		action: {
			type: 'encapsulate',
			options: {
				pre: 'for( i = 0; i < list.length; i++ ){\n\t',
				peri: 'list[i];',
				post: '\n}'
			}
		}
	},
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
mwList = {
	textFromAPI : {
		label: 'Obter texto via API',
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
	},
	addPortletLink : {
		label: 'Inserir link no portlet',
		action: {
			type: 'encapsulate',
			options: {
				pre: [
					'function addSomeLink(){',
					'\t$( mw.util.addPortletLink(',
					'\t\t\'p-cactions\',',
					'\t\t\'#\',',
					'\t\t\'SomeLink\',',
					'\t\t\'ca-SomeLink\',',
					'\t\t\'SomeDescriptionForSomeLink\'',
					'\t) ).click( function( e ) {',
					'\t\te.preventDefault();'
				].join( '\n' ) + '\n\t\t',
				peri: 'alert( \'Ok\' );',
				post: [
					'\n\t} );',
					'}',
					'',
					'if ( true ) {',
					'\t$( addSomeLink );',
					'}'
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
						'label': 'MediaWiki',
						'type': 'select',
						'list': mwList
					}
				}
			}
		}
	} );
}

/* Check if we are in edit mode and the required modules are available and then customize the toolbar */
if ( $.inArray( mw.config.get('wgAction'), [ 'edit', 'submit' ] ) !== -1 &&
	/\.js$/.test( mw.config.get( 'wgTitle' ) )
) {
	mw.loader.using( 'user.options', function () {
		// This can be the string "0" if the user disabled the preference ([[bugzilla:52542#c3]])
		/*jshint eqeqeq:false*/
		if ( mw.user.options.get( 'usebetatoolbar' ) == 1 && mw.user.options.get( 'showtoolbar' ) == 1 ) {
			$.when(
				mw.loader.using( 'ext.wikiEditor.toolbar' ),
				$.ready
			).then( customizeToolbar );
		}
	} );
}

}( mediaWiki, jQuery ) );