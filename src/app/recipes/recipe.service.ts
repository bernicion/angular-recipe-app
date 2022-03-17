import {Injectable} from '@angular/core';
import {Recipe} from "./recipe.model";
import {Ingredient} from "../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list/shopping-list.service";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipesChanged = new Subject();

  private recipes: Recipe[] = [
    new Recipe(1,
      'Rost chicken',
      'This is a Roast Chicken',
      'https://static.onecms.io/wp-content/uploads/sites/9/2021/02/12/roast-chicken-with-chile-basil-vinaigrette-charred-broccoli-potatoes-FT-RECIPE0321.jpg',
      [new Ingredient("Meat", 1), new Ingredient("Brocolli", 4)]),
    new Recipe(2,
      'Salad',
      'This is another salad',
      'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8NHx8fGVufDB8fHx8&w=1000&q=80',
      [new Ingredient("Cheries", 8), new Ingredient("Lemon", 1)])
  ];

  getRecipes() {
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }

  getRecipeById(id: number) {
    return this.recipes.find(
      (s) => {
        return s.id === id;
      }
    );
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  private getIndexOfId(id: number){
    let index = 0;
    for (let recipe of this.recipes) {
      if (recipe.id === id) {
        return index;
      }
      index++;
    }
    return index;
  }

  updateRecipe(id: number, newRecipe: Recipe) {
    this.recipes[this.getIndexOfId(id)] = newRecipe;
    console.log(this.recipes);
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(id: number) {
    this.recipes.splice(this.getIndexOfId(id), 1);
    this.recipesChanged.next(this.recipes.slice());
  }


  constructor(private shoppingListService: ShoppingListService) {
  }
}
