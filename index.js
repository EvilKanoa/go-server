const app = require("./app");

app()
  .then((port) =>
    console.log(`
    🚀🚀🚀
    go-server started on port ${port}!
    🚀🚀🚀
    `)
  )
  .catch((err) => console.error(err));
