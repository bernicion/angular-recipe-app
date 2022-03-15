import {EventEmitter, Injectable} from '@angular/core';
import {Ingredient} from "../shared/ingredient.model";

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  ingredientsChanged = new EventEmitter<Ingredient[]>();

  private ingredients: Ingredient[] = [
    new Ingredient("Apples", 5), new Ingredient("Tomatoes", 10)
  ];

  getIngredients() {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.emit(this.getIngredients());
  }

  addIngredients(ingredients: Ingredient[]) {
    // for (let ingredient of ingredients) { //too many event emitters
    //   this.addIngredient(ingredient);
    // }
    this.ingredients.push(...ingredients);//...pushes as array, not as single object
    this.ingredientsChanged.emit(this.getIngredients());
  }

  constructor() {
  }
}
