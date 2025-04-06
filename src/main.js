import axios from "axios";

// KATEGORİ LİSTESİ BÖLÜMÜ
const categoryList = document.querySelector(".category-list");

const fetchCategories = async () => {
    try {
        const catData = await axios.get('https://tasty-treats-backend.p.goit.global/api/categories');
        console.log(catData);
        categoryList.innerHTML = catData.data.map(category => `
            <li class="category-item">
              <button class="category-btn">${category.name}</button>
            </li>
            `).join("");
    } catch (error) {
        console.error("Kategori isimleri alınırken hata oluştu.", error);
    }
}

fetchCategories();

// POPULER TARİFLER BÖLÜMÜ

const popularRecipeList = document.querySelector(".popular-recipe-list");

const fetchPopulars = async () => {
    try {
        const popData = await axios.get('https://tasty-treats-backend.p.goit.global/api/recipes/popular');
        console.log(popData);
        popularRecipeList.innerHTML = popData.data.map(popular => `
            <li class="popular-recipe-item">
              <img clas="popular-recipe-img" src="${popular.preview}" alt="" width="64px" height="64px" />
              <div>
                <p class="popular-recipe-item-title">${popular.title}</p>
                <p class="popular-recipe-item-info">${popular.description}</p>
              </div>
            </li>
            `).join("");
    } catch (error) {
        console.error("Popüler tarifler listesi alınırken hata oluştu.", error);
    }
}
fetchPopulars();

// FİLTRELEME BÖLÜMÜ

document.addEventListener("DOMContentLoaded", function () {
    // Area verisini almak için API çağrısı  
    axios.get('https://tasty-treats-backend.p.goit.global/api/areas')
        .then(response => {
            const areaSelect = document.getElementById('areaSelect');
            const areas = response.data; // API'den gelen veriyi al  
            areas.forEach(area => {
                const option = document.createElement('option');
                option.value = area.id; // API'den gelen kaydın ID'si  
                option.textContent = area.name; // API'den gelen kaydın ismi  
                areaSelect.appendChild(option);
            });
        })
        .catch(error => console.error('Area verisi alınırken hata oluştu:', error));

    // Ingredients verisini almak için API çağrısı  
    axios.get('https://tasty-treats-backend.p.goit.global/api/ingredients')
        .then(response => {
            const ingredientSelect = document.getElementById('ingredientSelect');
            const ingredients = response.data; // API'den gelen veriyi al  
            ingredients.forEach(ingredient => {
                const option = document.createElement('option');
                option.value = ingredient.id; // API'den gelen kaydın ID'si  
                option.textContent = ingredient.name; // API'den gelen kaydın ismi  
                ingredientSelect.appendChild(option);
            });
        })
        .catch(error => console.error('Ingredients verisi alınırken hata oluştu:', error));
});

