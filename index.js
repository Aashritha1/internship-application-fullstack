class ElementHandler {
  element(element) {
    if(element.tagName === 'title'){
      element.setInnerContent("Got_A_Title")
    }
    if(element.tagName==='p'){
      element.setInnerContent("About Aashritha")
    }
    if(element.tagName === 'a'){
      element.setAttribute('href', 'https://www.linkedin.com/in/aashritha-reddeddy/')
      element.setInnerContent("Aashritha Reddeddy LinkedIn Profile")
    }
    if(element.tagName === 'h1'){
      element.setInnerContent("Profile")
    }
  }
}

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})
/**
 * Respond with hello worker text
 * @param {Request} request
 */
async function handleRequest(request) {
  try {
    let response = await fetch('https://cfw-takehome.developers.workers.dev/api/variants');
    let rand = Math.floor(Math.random()* 2)
    let data = await response.json();
    let request = new Request(data['variants'][rand])
    let result = await fetch(request)
    result = new Response(result.body,result)
    result.headers.set('set-cookie', "id="+rand.toString()+"Expires=20 August 2020,Secure, HttpOnly")
    var htmlwriter = new HTMLRewriter()
        htmlwriter.on('p', new ElementHandler()).on('title', new ElementHandler()).on('a', new ElementHandler())
            .on('h1', new ElementHandler())
    return htmlwriter.transform(result)
    // return response
  }
  catch(e){
    console.log("exception"+e)
  }
}
