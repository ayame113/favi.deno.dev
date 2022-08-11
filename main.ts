const p = new URLPattern({ pathname: "/:text.png" });
console.log(p.exec("http://a.com/👪.png")?.pathname.groups.text);
console.log(p.exec("http://a.com/.png")?.pathname.groups.text);
console.log(p.exec("http://a.com/a/a.png")?.pathname.groups.text);
console.log(p.exec("http://a.com/a.png")?.pathname.groups.text);
