// Search for bookmarks folder and append to document.
function listBookmarks () {

	// "2" is "Other Bookmarks" folder. Search for "newtab" folder
	chrome.bookmarks.getSubTree("2", function(tree) {

		// If we found stuff
		if (tree.length) {

			// Check every item if we got "newtab" folder
			for (var i = 0; i < tree[0].children.length; i++) {

				if (tree[0].children[i].title == "btab") {

					// Get bookmarks from "newtab" folder. Double quotes are important!
					chrome.bookmarks.getChildren("" + tree[0].children[i].id + "", function(result) {

						// If we got bookmark(s)
						if (result.length) {

							// Append each of them to our newtab.html
							// Check newtab.html:13 for clean html example
							for (var i = 0; i < result.length; i++) {
								$("#content").append('<li><a id="' + result[i].id + '" href="' + result[i].url + '" data-title="' + result[i].title + '"><img src="chrome://favicon/' + result[i].url + '" alt="' + result[i].title + '" />' + result[i].title + '</a></li>');
							}
						} else {
							// If "newtab" folder has no bookmarks
							$("#bookmarks").append('<h1>Nothing found in "newtab" folder.</h1>')
						}
					});
				}
			}
		}
	});
}

// Do the job :)
listBookmarks();
