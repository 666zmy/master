let baseUrl = "";
if (process.env.NODE_ENV == "development") {
  baseUrl = "...";
} else if(process.env.NODE_ENV==='production') {
    baseUrl= process.env.VUE_APP_BASEURL
} else {
    baseUrl=""
}
console.log(baseUrl,"baseUlr")