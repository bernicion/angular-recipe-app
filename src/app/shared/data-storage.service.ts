import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {RecipeService} from "../recipes/recipe.service";
import {Recipe} from "../recipes/recipe.model";
import {map, tap} from "rxjs/operators";

@Injectable({providedIn: 'root'})
export class DataStorageService {
  firebaseServer: string = 'https://ng-receipe-app-default-rtdb.europe-west1.firebasedatabase.app/recipes.json';

  constructor(private httpClient: HttpClient, private recipeService: RecipeService) {
  }

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.httpClient
      .put(this.firebaseServer, recipes)
      .subscribe(response => {
        console.log(response);
      })
  }

  fetchRecipes() {
    return this.httpClient
      .get<Recipe[]>(this.firebaseServer)
      .pipe(
        map(
          recipes => {
            return recipes.map(
              recipe => {
                return {
                  ...recipe,
                  ingredients: recipe.ingredients ? recipe.ingredients : []
                };
              });
          }),
        tap(recipes => {
          this.recipeService.setRecipes(recipes);
        })
      );
  }
}
