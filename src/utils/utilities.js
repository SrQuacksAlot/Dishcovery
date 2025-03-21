/* uncomment the export below to enable the 1.1.2 test suite! */
export function compareIngredientsCB(ingredientA, ingredientB) {
    return (
        // Compare aisles: Returns 1 if ingredientA.aisle is greater, -1 if less, or 0 if equal
        (ingredientA.aisle > ingredientB.aisle) - (ingredientA.aisle < ingredientB.aisle) || 
        // If aisles are the same, compare names: Returns 1 if ingredientA.name is greater, -1 if less, or 0 if equal
        (ingredientA.name > ingredientB.name) - (ingredientA.name < ingredientB.name)
    );
}

export function sortIngredients(ingredients) {
    // Use spread syntax to create a new array and sort it
    return [...ingredients].sort(compareIngredientsCB);
}

export function isKnownTypeCB(type){
    // don't forget the return keyword (goes for all functions below)
    // Check if the type is one of the known types
    return ["starter", "main course", "dessert"].includes(type);
}

export function dishType(dish){
    return  dish.dishTypes && Array.isArray(dish.dishTypes) ? 
            dish.dishTypes.find(isKnownTypeCB) || "" : "";
}

export function compareDishesCB(dishA, dishB){
    // Define the sort order as an array
    const order = ["no known type", "starter", "main course", "dessert"];

    // Get the dish type for each dish using the dishType function
    const typeA = dishType(dishA) || "no known type";
    const typeB = dishType(dishB) || "no known type";

    // Compare the index of each type in the order array
    return order.indexOf(typeA) - order.indexOf(typeB);
}


export function sortDishes(dishes){
    return [...dishes].sort(compareDishesCB);
}

export function menuPrice(dishesArray){
    // Use reduce to sum up the pricePerServing, starting with an accumulator of 0
    return dishesArray.reduce((total, dish) => total + (dish.pricePerServing || 0), 0);
} 

/* 
  This function is already implemented as it is more JavaScript + algorithms than interaction programming

   Given a menu of dishes, generate a list of ingredients. 
   If an ingredient repeats in several dishes, it will be returned only once, with the amount added up 
   
   As this is not an algorithm course, the function is mostly written but you have 2 callback passing TODOs.
*/
export function shoppingList(dishes){
    const result={}; // object used as mapping between ingredient ID and ingredient object

    // we define the callback inside the function, though this is not strictly needed in this case. But see below.
    function keepJustIngredientsCB(dish){
        return dish.extendedIngredients;
    }
    
    // ingredientCB must be defined inside shopingList() because it needs access to `result`
    // you will often need to define a callback inside the function where it is used, so it has access to arguments and other variables
    function ingredientCB(ingredient){
        if(result[ingredient.id] === undefined){  // more general: !result[ingredient.id]
            // since result[ingredient.id] is not defined, it means that the ingredient is not taken into account yet
            // so we associate the ingredient with the ID
            result[ingredient.id]={...ingredient};
            
            // JS Notes about the line above:
            // 1)    result[ingredient.id] 
            // In JS object.property is the same as object["property"] but the second notation is more powerful because you can write
            // object[x]  where x=="property"
            
            // 2)    {...ingredient } creates a *copy* of the ingredient (object spread syntax)
            // we duplicate it because we will change the object below
        } else {
            // since result[ingredient.id] is not defined, it means that the ingredient has been encountered before.
            // so we add up the amount:
            result[ingredient.id].amount +=  ingredient.amount;
        }
    }

    const arrayOfIngredientArrays= dishes.map(keepJustIngredientsCB) /*TODO pass the callback that transforms a dish to its ingredients;*/
    const allIngredients= arrayOfIngredientArrays.flat();    
    allIngredients.forEach(ingredientCB); /* TODO: pass the callback that treats an ingredient*/

    // Note: the 3 lines above can be written as a function chain:
    // dishes.map(callback1).flat().forEach(callback2);

    // now we transform the result object into an array: we drop the keys and only keep the values
    return Object.values(result);
}

