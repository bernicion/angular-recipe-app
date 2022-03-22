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

  private recipes: Recipe[] = [];

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

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

  private getIndexOfId(id: number) {
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
