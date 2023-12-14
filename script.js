// เมื่อ DOM โหลดเสร็จสิ้น
document.addEventListener('DOMContentLoaded', () => {
  // ตรวจสอบว่ามีข้อมูลหนังใน local storage หรือไม่
  const movies = JSON.parse(localStorage.getItem('movies')) || [];
  // แสดงรายการหนัง
  displayMovies(movies);
});

// ฟังก์ชันเพิ่มหนัง
function addMovie() {
  // ดึงค่าชื่อหนังและปีที่ออกฉายจาก input
  const movieName = document.getElementById('movieName').value;
  const releaseYear = document.getElementById('releaseYear').value;

  // ตรวจสอบว่ามีข้อมูลใน input หรือไม่
  if (movieName && releaseYear) {
    // สร้าง object ของหนัง
    const movie = { name: movieName, year: releaseYear };
    // ดึงรายการหนังที่เก็บไว้ใน local storage
    const movies = JSON.parse(localStorage.getItem('movies')) || [];
    // เพิ่มหนังลงในรายการ
    movies.push(movie);
    // บันทึกข้อมูลรายการหนังลงใน local storage
    localStorage.setItem('movies', JSON.stringify(movies));

    // แสดงรายการหนัง
    displayMovies(movies);

    // ล้างค่า input fields
    document.getElementById('movieName').value = '';
    document.getElementById('releaseYear').value = '';
  }
}

// ฟังก์ชันลบหนัง
function removeMovie(index) {
  // ดึงรายการหนังที่เก็บไว้ใน local storage
  const movies = JSON.parse(localStorage.getItem('movies')) || [];
  // ลบหนังที่ถูกเลือกจากรายการ
  movies.splice(index, 1);
  // บันทึกรายการหนังใหม่ลงใน local storage
  localStorage.setItem('movies', JSON.stringify(movies));
  // แสดงรายการหนัง
  displayMovies(movies);
}

// ฟังก์ชันแก้ไขหนัง
function editMovie(index) {
  // ดึงรายการหนังที่เก็บไว้ใน local storage
  const movies = JSON.parse(localStorage.getItem('movies')) || [];
  // แสดง prompt ให้ผู้ใช้กรอกชื่อหนังและปีที่ออกฉายใหม่
  const updatedName = prompt('Enter updated movie name:', movies[index].name);
  const updatedYear = prompt('Enter updated release year:', movies[index].year);

  // ตรวจสอบว่าผู้ใช้กด OK หรือ Cancel
  if (updatedName !== null && updatedYear !== null) {
    // ปรับปรุงข้อมูลหนังที่ถูกแก้ไข
    movies[index] = { name: updatedName, year: updatedYear };
    // บันทึกรายการหนังใหม่ลงใน local storage
    localStorage.setItem('movies', JSON.stringify(movies));
    // แสดงรายการหนัง
    displayMovies(movies);
  }
}

// ฟังก์ชันค้นหาหนัง
function searchMovie() {
  // ดึงค่าที่ผู้ใช้กรอกในช่องค้นหา
  const searchValue = document.getElementById('search').value.toLowerCase();
  // ดึงรายการหนังที่เก็บไว้ใน local storage
  const movies = JSON.parse(localStorage.getItem('movies')) || [];
  // กรองรายการหนังตามคำค้นหา
  const filteredMovies = movies.filter(movie => movie.name.toLowerCase().includes(searchValue));
  // แสดงรายการหนังที่ค้นหาได้
  displayMovies(filteredMovies);
}

// ฟังก์ชันแสดงรายการหนัง
function displayMovies(movies) {
  // ดึง DOM element ของรายการหนัง
  const movieList = document.getElementById('movieList');
  // ลบข้อมูลทั้งหมดในรายการหนัง
  movieList.innerHTML = '';

  // แสดงแต่ละรายการหนัง
  movies.forEach((movie, index) => {
    // สร้าง element li สำหรับแต่ละหนัง
    const li = document.createElement('li');
    // กำหนด HTML ของ li ด้วยข้อมูลของหนัง
    li.innerHTML = `${movie.name} (${movie.year}) 
      <button onclick="removeMovie(${index})">Remove</button>
      <button onclick="editMovie(${index})">Edit</button>`;
    // เพิ่ม li ลงในรายการหนัง
    movieList.appendChild(li);
  });
}
