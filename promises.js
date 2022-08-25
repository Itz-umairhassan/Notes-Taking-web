const { resolve } = require("path")

const my_prom = () => {
    return new Promise((resolve, reject) => {
        if (true) {
            resolve("Resolved problem")
        }
    })
}


my_prom().then((data)=>{console.log(data)})
console.log("Everything else is happening here")
