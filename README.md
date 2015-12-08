Often I come across an odd cross-site scripting vulnerability that lies on a subdomain that contains nothing of use to me. Most of the time these subdomains don't contain critical applications that I would ideally like to get access to. Often, I think about the ways that I could leverage the trust boundary of being on their domain space - whether it be trying to use the same origin policy to my advantage or bypassing trivial CSRF checks.

However one thing that I've always had to manually create a proof-of-concept for is, phishing through XSS in an effective yet believable manner.

Because of this, I ended up authoring **PhishJS** to make phishing through javascript a trivial task. I see value in this tool when used for spearphishing campaigns in future engagements or to provide for an effective proof-of-concept when demonstrating simple flaws like cross-site scripting.

In simple terms, PhishJS converts a simple cross-site scripting vector into an effecting phishing payload.

In more technical terms, here's what it does in order:

1. Obtains the contents of the **actual** login page (in this case, panel.preyproject.com) using a CORs proxy.
2. Modifies the HTML source of the page to include a `<base>` tag to your "attacker" domain.
3. Modifies the HTML source to make sure that all CSS, JS and other links lead to the original victim domain (in order to preserve styles and javascript).
4. Replaces the current page which you have XSS on with the contents of our malicious phishing page.
5. Modifies the URL to /login to make it look even more legit.

Let's see it in action for the domain help.preyproject.com:

![gif](https://giant.gfycat.com/KnobbyIncompleteFanworms.gif)

Here's how you use the tool:

Modify the first two lines of phish.js:

```
page_src = "https://login.vulnwebsite.com/";
phishing_url="http://yourphishingdomain.com/";
```

The `page_src` variable should be the URL you want to mimic. The `phishing_url` variable should contain your domain/your script URL that captures the credentials and then does whatever with them (ie save them or relay them back to you)

There is a minified version available too if needed.

In the future, I plan to update this tool so that the hacky base tag method is no longer needed but rather that all creds are sent back to the pentester/attacker via a XHR and everything is asynchronous.


