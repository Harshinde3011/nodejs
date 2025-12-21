import url from "url"

const myUrl = new URL('http://mywebsite.com:8000/hello.html?id=19061&status=active');

// serialized url
console.log("href: ", myUrl.href);
console.log("to string: ", myUrl.toString());

// host
console.log("host: ", myUrl.host);

// hostname (does not give port)
console.log("hostname: ", myUrl.hostname);

// path name
console.log("path name: ", myUrl.pathname);

// serialized query
console.log("query in url: ", myUrl.search);

// params in object
console.log("params in object: ", myUrl.searchParams);

// add params
myUrl.searchParams.append('abc', '123');
console.log("new params added: ", myUrl.searchParams);

// loop 
myUrl.searchParams.forEach((name, value) => console.log(`${name} : ${value}`));




