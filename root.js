const express = require("express");
const bodyparser = require("body-parser");
const app = express();
const PORT = 3000;

app.use(bodyparser.json());
app.use(express.static("public"));
app.set('view engine', 'ejs');

calculations = [];

app.get("/:page", (req, res) => {
    res.render("index", {page: req.params.page});
});

app.post('/calculate', (req, res) => {
    try {
        let weight = req.body.weight;
        let height = req.body.height;
        let age = req.body.age;
        let gender = req.body.gender;
        
        let BMI = (weight / height / height * 10000).toFixed(1);
        let result = getResult(BMI, gender, age);
        calculations.push({BMI: BMI, result: result, gender: gender, age: age});
        res.status(200).json({ message: 'Success', BMI: BMI, result: result });
    } catch (error) {
        console.log(error);
    }
});

app.get('/http://localhost:3000/history', (req, res) => {
    res.send(calculations);
});

app.listen(PORT, () => {
    console.log(`server is started on port ${PORT}`);
});

function getResult(BMI, gender, age) {
    if (gender == "male") {
        if (age <= 24) {
            if (BMI < 20) return "underweight";
            if (BMI < 25) return "normal weight";
            if (BMI < 30) return "overweight";
            if (BMI < 40) return "obesity";
            if (BMI >= 40) return "obesity of the 3rd degree";
        }
        if (age <= 34) {
            if (BMI < 21) return "underweight";
            if (BMI < 26) return "normal weight";
            if (BMI < 31) return "overweight";
            if (BMI < 41) return "obesity";
            if (BMI >= 41) return "obesity of the 3rd degree";
        }
        if (age <= 44) {
            if (BMI < 22) return "underweight";
            if (BMI < 27) return "normal weight";
            if (BMI < 32) return "overweight";
            if (BMI < 42) return "obesity";
            if (BMI >= 42) return "obesity of the 3rd degree";
        }
        if (age <= 54) {
            if (BMI < 23) return "underweight";
            if (BMI < 28) return "normal weight";
            if (BMI < 33) return "overweight";
            if (BMI < 43) return "obesity";
            if (BMI >= 43) return "obesity of the 3rd degree";
        }
        if (age <= 64) {
            if (BMI < 24) return "underweight";
            if (BMI < 29) return "normal weight";
            if (BMI < 34) return "overweight";
            if (BMI < 44) return "obesity";
            if (BMI >= 44) return "obesity of the 3rd degree";
        }
        if (age >= 65) {
            if (BMI < 25) return "underweight";
            if (BMI < 30) return "normal weight";
            if (BMI < 35) return "overweight";
            if (BMI < 45) return "obesity";
            if (BMI >= 45) return "obesity of the 3rd degree";
        }
    } else {
        if (age <= 24) {
            if (BMI < 19) return "underweight";
            if (BMI < 24) return "normal weight";
            if (BMI < 29) return "overweight";
            if (BMI < 39) return "obesity";
            if (BMI >= 39) return "obesity of the 3rd degree";
        }
        if (age <= 34) {
            if (BMI < 20) return "underweight";
            if (BMI < 25) return "normal weight";
            if (BMI < 30) return "overweight";
            if (BMI < 40) return "obesity";
            if (BMI >= 40) return "obesity of the 3rd degree";
        }
        if (age <= 44) {
            if (BMI < 21) return "underweight";
            if (BMI < 26) return "normal weight";
            if (BMI < 31) return "overweight";
            if (BMI < 41) return "obesity";
            if (BMI >= 41) return "obesity of the 3rd degree";
        }
        if (age <= 54) {
            if (BMI < 22) return "underweight";
            if (BMI < 27) return "normal weight";
            if (BMI < 32) return "overweight";
            if (BMI < 42) return "obesity";
            if (BMI >= 42) return "obesity of the 3rd degree";
        }
        if (age <= 64) {
            if (BMI < 23) return "underweight";
            if (BMI < 28) return "normal weight";
            if (BMI < 33) return "overweight";
            if (BMI < 43) return "obesity";
            if (BMI >= 43) return "obesity of the 3rd degree";
        }
        if (age >= 65) {
            if (BMI < 24) return "underweight";
            if (BMI < 29) return "normal weight";
            if (BMI < 34) return "overweight";
            if (BMI < 44) return "obesity";
            if (BMI >= 44) return "obesity of the 3rd degree";
        }
    }
}