const fetchData = async () => {
    const response = await fetch ("./data/data.json");
    const data = await response.json();

    //console.log(data);
    return data;
}

const displayProducts = async (foods) => {
    const foodContainer = document.getElementById("food");
    foodContainer.innerHTML = "";

    let htmls = "";
    htmls = foods.map(food => {
        return `
            <div class="food">
                <img src="${food.image}" alt="${food.title}">
                <h1>${food.title}</h1>
                <p>${food.price}</p>
                <button type="button" class="btn btn-danger">Mua ngay</button>
            </div>`

       }).join("");

    foodContainer.innerHTML = htmls;
    
}
fetchData().then(displayProducts);
// const fetchData = async () => {
//     const response = await fetch("./data/data.json");
//     const data = await response.json();

//     // console.log(data);
//     return data;

// }

// const displayCourses = async (courses) => {
//     const coursesContainer = document.getElementById("course-list");
//     coursesContainer.innerHTML = "";
    
//     let htmls = "";
//     htmls = courses.map(course => {
//         return `
//             <div class="course">
//                 <img src="${course.image}" alt="${course.title}">
//                 <h2>${course.title}</h2>
//                 <p>${course.description}</p>
//                 <a href="detail.html?id=${course.id}" class="btn-detail">Xem chi tiết</a>
//             </div>
//         `
//     }).join("");

//     coursesContainer.innerHTML = htmls;
// };

// fetchData().then(displayCourses);