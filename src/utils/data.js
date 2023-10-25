export function compareContent(newCont, oldCont) {
    let res = {};
    for (let key of Object.keys(newCont)) {
      if (
        oldCont[key] &&
        JSON.stringify(newCont[key]) !== JSON.stringify(oldCont[key])
      ) {
        if (key === "coords") {
          res.coords = `(${oldCont[key].latitude} ${oldCont[key].longitude}) -> (${newCont[key].latitude} ${newCont[key].longitude})`;
        }
        if (
          typeof oldCont[key] === "string" ||
          typeof oldCont[key] === "number"
        ) {
          res[key] = `${oldCont[key]} -> ${newCont[key]}`;
        }
      }
    }
    return res;
  }
