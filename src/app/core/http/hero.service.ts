import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Hero } from 'src/app/shared/models/hero';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  private heroesUrl = 'api/heroes';  // URL to web api

  constructor(private http: HttpClient) {
  }

  search(term: string): Observable<Hero[]> {
    return this.http
        .get(`api/heroes/?name=${term}`)
        .pipe(
          map((response: any) => response as Hero[])
          );
  }

  getHeroes(): Observable<Hero[]> {
    return this.http.get(this.heroesUrl)
        .pipe(map((response:any) => response as Hero[]));
  }


  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get(url)
        .pipe(map((response:any) => response as Hero));
  }

  delete(id: number) {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.delete(url, { headers: this.headers }).pipe(
      map((resp:any) => {
          resp
        })
      );
  }

  create(name: string) {
    return this.http
        .post(this.heroesUrl, JSON.stringify({ name: name }), { headers: this.headers })
        .pipe(map((res:any) => res as Hero));
  }

  update(hero: Hero) {
    const url = `${this.heroesUrl}/${hero.id}`;
    return this.http
        .put(url, JSON.stringify(hero), { headers: this.headers })
        .pipe(map(() => hero));
  }


}
