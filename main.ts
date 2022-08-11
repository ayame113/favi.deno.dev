const p = new URLPattern({ pathname: "/:text.png" });
console.log(p.exec("http://a.com/aaa.png"));
