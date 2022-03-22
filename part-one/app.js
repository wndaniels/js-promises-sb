let favNum = 13;
let baseURL = "http://numbersapi.com";

// 1. Make a request to the Numbers API to get a fact about your favorite number.
// (Make sure you get back JSON by including the json query key, specific to this API.
$.getJSON(`${baseURL}/${favNum}?json`).then((data) => {
  console.log(data);
});

// 2. Figure out how to get data on multiple numbers in a single request.
// Make that request and when you get the data back, put all of the number facts on the page.
let favNums = [1, 13, 40, 15, 20];
$.getJSON(`${baseURL}/${favNums}?json`).then((data) => {
  console.log(data);
});

// 3. Use the API to get 4 facts on your favorite number.
// Once you have them all, put them on the page.It’s okay if some of the facts are repeats.
Promise.all(
  Array.from({ length: 4 }, () => {
    return $.getJSON(`${baseURL}/${favNum}?json`);
  })
).then((facts) => {
  facts.forEach((data) => $("body").append(`<p>${data.text}</p>`));
});
