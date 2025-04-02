import { EventEmitter, Injectable } from "@angular/core";
import { Scripture } from "./scripture.model";
import { Subject } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})

export class ScriptureService {
    scriptureSelectedEvent = new EventEmitter<Scripture>();
    scriptureChangedEvent = new EventEmitter<Scripture[]>();
    scriptureListChangedEvent = new Subject<Scripture[]>();
    maxScriptureId: number;

    private url = "http://localhost:3000/scriptures/";

    scriptures: Scripture[] = []

    constructor(private http: HttpClient) {
        this.fetchScriptures();
    }

    private sortAndSend() {
        this.scriptures.sort((a, b) => a.verse.localeCompare(b.verse));
        this.scriptureListChangedEvent.next(this.scriptures.slice());
      }

    fetchScriptures() {
        this.http.get<{ message: string, scriptures: Scripture[] }>(this.url)
            .subscribe(
                (response) => {
                    this.scriptures = response.scriptures;
                    this.maxScriptureId = this.getMaxId();
                    this.scriptures.sort((a,b) => a.verse.localeCompare(b.verse));
                    this.scriptureListChangedEvent.next(this.scriptures.slice());
                },
                (error: any) => {
                    console.error(error);
                }
            );
    }

    storeScriptures() {
        const stringScriptures = JSON.stringify(this.scriptures);

        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });
        this.http.put("http://localhost:3000/scriptures/", stringScriptures, { headers: headers }).subscribe(() => {
            this.scriptureListChangedEvent.next(this.scriptures.slice());
        },
        (error: any) => {
            console.error(error);
        });
    }


    getScriptures(): Scripture[] {
        return this.scriptures.slice();
    }

    getScripture(id: string): Scripture {
        return this.scriptures.find(scripture => scripture.id == id) || null;
    }

    deleteScripture(scripture: Scripture) {

        if (!scripture) {
          return;
        }
    
        const pos = this.scriptures.findIndex(d => d.id === scripture.id);
    
        if (pos < 0) {
          return;
        }
    
        // delete from database
        this.http.delete('http://localhost:3000/scriptures/' + scripture.id)
          .subscribe(
            (response: Response) => {
              this.scriptures.splice(pos, 1);
              this.sortAndSend();
            }
          );
      }

    getMaxId(): number {
      if(!this.scriptures || this.scriptures.length === 0) {
        return 0;
      }
      let maxId = 0;

      for (let scripture of this.scriptures) {
          let currentId = parseInt(scripture.id);
          if (currentId > maxId) {
              maxId = currentId;
          }
      }

      return maxId;
    }

    addScripture(scripture: Scripture) {
        if (!scripture) {
          return;
        }
    
        // make sure id of the new Scripture is empty
        scripture.id = '';
    
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
    
        // add to database
        this.http.post<{ message: string, scripture: Scripture }>('http://localhost:3000/scriptures/',
          scripture,
          { headers: headers })
          .subscribe(
            (responseData) => {
              // add new scripture to scriptures
              this.scriptures.push(responseData.scripture);
              this.sortAndSend();
            }
          );
      }

      updateScripture(originalScripture: Scripture, newScripture: Scripture) {
        if (!originalScripture || !newScripture) {
          return;
        }
    
        const pos = this.scriptures.findIndex(d => d.id === originalScripture.id);
    
        if (pos < 0) {
          return;
        }
    
        // set the id of the new Scripture to the id of the old Scripture
        newScripture.id = originalScripture.id;
    
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
    
        // update database
        this.http.put('http://localhost:3000/scriptures/' + originalScripture.id,
          newScripture, { headers: headers })
          .subscribe(
            (response: Response) => {
              this.scriptures[pos] = newScripture;
              this.sortAndSend();
            }
          );
      }


}