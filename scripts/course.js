const courses = [

{code:"CSE 110", subject:"CSE", credits:2, completed:true},
{code:"WDD 130", subject:"WDD", credits:2, completed:true},
{code:"WDD 131", subject:"WDD", credits:2, completed:false},
{code:"WDD 231", subject:"WDD", credits:2, completed:false}

];

const container = document.querySelector("#courseContainer");
const creditText = document.querySelector("#credits");

function displayCourses(courseList){

container.innerHTML = "";

let totalCredits = 0;

courseList.forEach(course => {

const div = document.createElement("div");

div.textContent = course.code;

div.classList.add("course");

if(course.completed){
div.classList.add("completed");
}

container.appendChild(div);

totalCredits += course.credits;

});

creditText.textContent =
"The total credits for courses listed above is " + totalCredits;

}

displayCourses(courses);

document.querySelector("#all").addEventListener("click", () => {
displayCourses(courses);
});

document.querySelector("#cse").addEventListener("click", () => {

const filtered = courses.filter(course => course.subject === "CSE");

displayCourses(filtered);

});

document.querySelector("#wdd").addEventListener("click", () => {

const filtered = courses.filter(course => course.subject === "WDD");

displayCourses(filtered);

});