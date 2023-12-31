let system = "metric";

function calculatePage() {
    location.href = "/calculate";
}

function homePage() {
    location.href = "/home";
}

function historyPage() {
    location.href = "/history";
}

async function calculate() {
    let weight = document.getElementById("weight").value;
    let age = document.getElementById("age").value;
    let height;
    let gender = document.getElementById("gender").value;
    let error = document.getElementById("error");

    if (system == "imperial") {
        weight = parseFloat(+weight * 0.45359237);

        height = document.getElementById("height1").value * 30.48 + document.getElementById("height2").value * 2.54;
    } else {
        height = document.getElementById("height").value;
    }

    error.innerHTML = "";
    if (weight == "" || age == "" || height == "" || gender == "") {
        error.innerHTML = "Please fill in all required fields.";
        return;
    } else if (isNaN(weight) || isNaN(age) || isNaN(height)) {
        error.innerHTML = "Please enter valid numerical data.";
        return;
    }

    if (gender == "male" || gender == "female") {
        try {
            const response = await fetch('/calculate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({weight: weight, height: height, age: age, gender: gender}),
            });

            const responseData = await response.json();
            error.innerHTML = `BMI: ${responseData.BMI}, ${responseData.result}`;
            error.style.color = "#7CB9E8";
            console.log('Ответ от сервера:', responseData.message);
        } catch (error) {
            console.error('Error: ', error);
        }
    } else {
        error.innerHTML = 'Please enter "male" or "female" in the box gender.';
    }
}

function metricSystem() {
    document.getElementById("heightBlock").innerHTML = `
    <p class="w-100 text-center">Height</p>
    <input type="text" class="form_input text-center" id="height">`;
    system = "metric";
    document.getElementById("error").innerHTML = "";
}

function imperialSystem() {
    document.getElementById("heightBlock").innerHTML = `
    <div style="width: 208px;">
        <p class="text-center">Height</p>
        <input type="text" class="form_input text-center" id="height1" style="width: 48.6%;">
        <input type="text" class="form_input text-center" id="height2" style="width: 48.6%;">
    </div>`;
    system = "imperial";
    document.getElementById("error").innerHTML = "";
}

async function historyTable() {
    try {
        let htmlcode = "";
        fetch('/http://localhost:3000/history')
        .then(response => response.json())
        .then(data => {
          data.forEach(item => {
            htmlcode += `
            <tr>
                <td class="text-center">${item.BMI}</td>
                <td class="text-center">${item.age}</td>
                <td class="text-center">${item.gender}</td>
                <td class="text-center">${item.result}</td>
            </tr>`;
          });
          document.getElementById("historyTable").innerHTML = htmlcode;
        })
        .catch(error => console.error('Ошибка получения данных:', error));
    } catch (error) {
        console.log("Error: ", error);
    }
}

window.onload = () => {
    if (window.location.href == "http://localhost:3000/history") {
        historyTable();
    }
}