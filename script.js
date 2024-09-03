async function fetchTwoResources() {
  try {
    const response1 = await fetch(
      "https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a"
    );
    if (!response1.ok) {
      throw new Error("Problem z pobieraniem listy drinków.");
    }
    const data1 = await response1.json();

    const drinks = data1.drinks;
    if (!drinks || drinks.length === 0) {
      throw new Error('Brak drinków zaczynających się na literę "a".');
    }
    const firstDrinkId = drinks[0].idDrink;

    const response2 = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${firstDrinkId}`
    );
    if (!response2.ok) {
      throw new Error("Problem z pobieraniem szczegółów drinka.");
    }
    const data2 = await response2.json();

    return data2.drinks[0];
  } catch (error) {
    console.error("Wystąpił błąd:", error);
    throw error;
  }
}

fetchTwoResources()
  .then((drink) => {
    console.log("Szczegóły drinka:", drink);
  })
  .catch((error) => {
    console.error("Błąd w funkcji fetchTwoResources:", error);
  });
