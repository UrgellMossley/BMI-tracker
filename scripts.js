const weightInput = document.querySelector(`#weight`)
const heightInput = document.querySelector(`#height`)
const submitBtn = document.querySelector(`.submit`)
const bmi = document.querySelector(`.bmi`)
const modalCloseBtn = document.querySelector(`.close-modal-btn`)
const modalElement = document.querySelector(`.modal`)
const mediaQuery = window.matchMedia("(max-width: 560px)")

//select table elements that allow for table generation
const rowNodes = document.querySelectorAll(`.row`)
const weightAxis = document.querySelector(`.weightAxis`)
const weightItem = weightAxis.querySelectorAll(`.weightAxisItem`)
const heightItems = document.querySelectorAll(`.heightAxisItem`)

//function to calculate BMI using height and weight values
const calculateBmi = (weight, height) => {
    const modal = document.querySelector(`.modal-content`)
    const bmi =(weight / (height / 100) ** 2)
    const rounded = Math.round(bmi * 10) / 10
    const bmiValue = +rounded.toFixed(1) 
    //conditional that changes the background of modal when mediaquery is active
    if (mediaQuery.matches) {
        bmiValue <= 18.5 ? modal.style.background = `#FCA800` : bmiValue <= 24.9 ? modal.style.background = `#4CDB00` : bmiValue <= 29.9 ? modal.style.background = `#FCEA00` : bmiValue >= 30 ? modal.style.background = `#FC0000` : null
    }

    return bmiValue
}

const calculateBmiMetric = (height,weight) =>{
    if ((height && weight) !== ``) {
        bmi.textContent = `Your BMI: ${calculateBmi(weight, height)} `
        return toggleCloseClass();
    } else{
        return alert(`Please fill in all the data`);

    }
};

submitBtn.addEventListener(`click`,(e)=>{
    e.preventDefault()
    calculateBmiMetric(heightInput.value, weightInput.value)
});

const toggleCloseClass = ()=>    modalElement.classList.toggle("modal-close");



modalCloseBtn.addEventListener(`click`, toggleCloseClass)


//Code to create a table based on HTML values inputed in index file (unneccessary? Maybe.)
//loop through each row
rowNodes.forEach(row => {
    //stores height element in a value for a row
    const height = +row.firstElementChild.innerHTML

 
   //set a counter 
   let i = 0
    //while loop set to length of row (node list of x axis)
   while (i < weightItem.length) { 
       //select all empty cells in the row and loop through
       row.querySelectorAll(`.tableInfo`).forEach(tableCell => {
            //stores weight value in a variable per the count 
            const weightNumeric = +weightItem[i].innerHTML
            //stores bmi in a variable for each tableCell, using function
            const bmi = calculateBmi(weightNumeric,height)
            //set the tableCell's value to bmi, then itterate the counter
            tableCell.innerHTML = bmi
            i++
            //conditional statment that changes color of cells according to bmi value
            bmi <= 18.5 ? tableCell.style.background = `#FCA800` : bmi <= 24.9 ? tableCell.style.background = `#4CDB00` : bmi <= 29.9 ? tableCell.style.background = `#FCEA00` : bmi >= 30 ? tableCell.style.background = `#FC0000` : null
        })
       }
      return
     });
