const btnSubmit = document.getElementById("submit");
const baseIDs = ["emiii","dsa","dbms","pcom","pcpf"];
const passArray = [false,false,false,false,false];
const resultRows = document.querySelectorAll(".result");
const inputs = {};
baseIDs.forEach(id => {
    let obj = {};
    obj.ut1 = document.getElementById(id+"UT1");
    obj.ut2 = document.getElementById(id+"UT2");
    obj.utAvg = document.getElementById(id+"UTAvg");
    obj.ese = document.getElementById(id);
    obj.total = document.getElementById(id+"Total");
    obj.grade = document.getElementById(id+"Grade");
    inputs[id] = obj;
})

baseIDs.forEach((id,index) => {
    let sub = inputs[id];
    sub.ese.addEventListener("change",eseChange);
    sub.ut1.addEventListener("change", utChnage);
    sub.ut2.addEventListener("change", utChnage);
    function eseChange(e){
        let utAvg = parseInt(sub.utAvg.value);
        let ese = parseInt(sub.ese.value);
        let total = utAvg + ese
        sub.total.value = total;
        sub.grade.innerText = getSubjectGrade(sub)
        passArray[index] = sub.grade.innerText != "F";
        console.log(passArray,sub.grade.innerText);
    }
    function utChnage(e){
        let utAvg = (parseInt(sub.ut1.value) + parseInt(sub.ut2.value)) / 2;
        sub.utAvg.value = utAvg;
        let ese = parseInt(sub.ese.value);
        let total = utAvg + ese
        sub.total.value = total;
        sub.grade.innerText = getSubjectGrade(sub);
        passArray[index] = sub.grade.innerText != "F";
        console.log(passArray,sub.grade.innerText);
    }
});

function getSubjectGrade(sub){
    let marks = parseInt(sub.total.value);
    if(parseInt(sub.ese.value) < 32 || parseInt(sub.utAvg.value) < 7){
        return "F";
    }
    return getGrade(marks);

}

function getGrade(marks){
    if(marks >= 80){
        return "O"
    }else if(marks >= 75){
        return "A"
    }else if(marks >= 70){
        return "B";
    }else if(marks >= 60){
        return "C";
    }else if(marks >=  50){
        return "D";
    }else if(marks >= 45){
        return "E";
    }else if(marks >= 40){
        return "P";
    }else{
        return "F";
    }
}

btnSubmit.addEventListener("click",e => {
    e.preventDefault();
    const spanObtainedMarks = document.querySelector("#obtainedMarks");
    const spanPercentage = document.querySelector("#percentage");
    const spanGrade = document.querySelector("#grade");

    const obainedMarks = getTotalObtainedMarks();
    const percentage = (obainedMarks / 500)*100;
    const grade = getGrade(percentage);

    spanObtainedMarks.innerText = obainedMarks;
    spanPercentage.innerText = percentage.toFixed(2);
    spanGrade.innerText = grade;


    resultRows.forEach(row => {
        row.classList.remove("hide");
    })
})

function getTotalObtainedMarks(){
    let totalObtainedMarks = 0;
    baseIDs.forEach(id => {
        const sub = inputs[id];
        totalObtainedMarks += parseInt(sub.total.value);
    });
    return totalObtainedMarks;
}



