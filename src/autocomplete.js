const countriesGetUrl = "https://gist.githubusercontent.com/keeguon/2310008/raw/bdc2ce1c1e3f28f9cab5b4393c7549f38361be4e/countries.json"
function getAutoCompleteItemListContainer(text) {
  const itemContainer = document.createElement("DIV");
  itemContainer.setAttribute("id", "autocomplete-list");
  itemContainer.setAttribute("class", "autocomplete-items");
  return itemContainer;
}

function getAutoCompleteItems(text, autoCompleteItemListContainer) {
  const item = document.createElement("DIV");
  item.innerHTML = "<strong>" + text.substr(0, text.length) + "</strong>";
  item.innerHTML += text.substr(text.length);
  item.addEventListener("click", (e) => {
    document.getElementById("search-input").value = text ;
    this.closeAllLists();
  });
  return item;
}

function closeAllLists(elmnt) {
  const autoCompleteItem = document.getElementsByClassName("autocomplete-items");
  for (let i = 0; i < autoCompleteItem.length; i++) {
    if (elmnt != autoCompleteItem[i] && elmnt != document.getElementById("search-input")) {
      autoCompleteItem[i].parentNode.removeChild(autoCompleteItem[i]);
    }
  }
}

function autocomplete(inputSearchElem, searchJson) {
  inputSearchElem.addEventListener("input", function (e) {
    const itemContainer = getAutoCompleteItemListContainer();
    let val = this.value;
    closeAllLists();
    if (!val) { return false; }
    this.parentNode.appendChild(itemContainer);
    const searcher = new FuzzySearch(searchJson, ['name'], {
      caseSensitive: false,
    });
    const result = searcher.search(val);
    result.forEach(search => {
      itemContainer.appendChild(getAutoCompleteItems(search.name, itemContainer));
    });
  });
} 

/*An array containing all the country names in the world:*/
// var countries = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Anguilla", "Antigua & Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia & Herzegovina", "Botswana", "Brazil", "British Virgin Islands", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central Arfrican Republic", "Chad", "Chile", "China", "Colombia", "Congo", "Cook Islands", "Costa Rica", "Cote D Ivoire", "Croatia", "Cuba", "Curacao", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands", "Faroe Islands", "Fiji", "Finland", "France", "French Polynesia", "French West Indies", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea Bissau", "Guyana", "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauro", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russia", "Rwanda", "Saint Pierre & Miquelon", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "St Kitts & Nevis", "St Lucia", "St Vincent", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor L'Este", "Togo", "Tonga", "Trinidad & Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks & Caicos", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States of America", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Virgin Islands (US)", "Yemen", "Zambia", "Zimbabwe"];
(function getAllCountryList() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      autocomplete(document.getElementById("search-input"), eval(this.responseText));
    }
  };  
  xhttp.open("GET", countriesGetUrl, true);
  xhttp.send();
})();

/*initiate the autocomplete function on the "search-input" element, and pass along the countries array as possible autocomplete values:*/
